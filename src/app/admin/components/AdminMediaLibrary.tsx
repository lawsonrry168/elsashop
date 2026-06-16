"use client";

import { useMemo, useState } from "react";
import { AdminDeleteForm } from "@/app/admin/components/AdminDeleteForm";
import { CopyUrlButton } from "@/app/admin/components/CopyUrlButton";
import { CMS_MEDIA_FOLDERS, mediaFolderLabel } from "@/data/cms-media-folders";
import type { CmsMediaRow } from "@/lib/cms/types";

const PAGE_SIZES = [12, 24, 48] as const;
type SortKey = "newest" | "oldest" | "name" | "size";

function formatBytes(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type Props = {
  items: CmsMediaRow[];
  deleteAction: (formData: FormData) => Promise<void>;
};

export function AdminMediaLibrary({ items, deleteAction }: Props) {
  const [query, setQuery] = useState("");
  const [folder, setFolder] = useState("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(12);

  const folderCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      counts.set(item.folder, (counts.get(item.folder) ?? 0) + 1);
    }
    return counts;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items;
    if (folder !== "all") {
      list = list.filter((item) => item.folder === folder);
    }
    if (q) {
      list = list.filter((item) =>
        [item.filename, item.alt, item.public_url, item.folder]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    return [...list].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return a.created_at.localeCompare(b.created_at);
        case "name":
          return a.filename.localeCompare(b.filename, "zh-Hant");
        case "size":
          return (b.size_bytes ?? 0) - (a.size_bytes ?? 0);
        case "newest":
        default:
          return b.created_at.localeCompare(a.created_at);
      }
    });
  }, [items, folder, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  return (
    <div className="kz-admin__list">
      <div className="kz-admin__list-toolbar">
        <div className="kz-admin__list-toolbar__primary">
          <label className="kz-admin__list-search">
            <span className="sr-only">搜尋媒體</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="搜尋檔名、alt、URL…"
            />
          </label>
          <select
            className="kz-admin__list-select"
            value={folder}
            onChange={(e) => {
              setFolder(e.target.value);
              setPage(1);
            }}
            aria-label="篩選資料夾"
          >
            <option value="all">全部資料夾（{items.length}）</option>
            {CMS_MEDIA_FOLDERS.map((f) => {
              const count = folderCounts.get(f.value) ?? 0;
              if (count === 0 && folder !== f.value) return null;
              return (
                <option key={f.value} value={f.value}>
                  {f.label}（{count}）
                </option>
              );
            })}
          </select>
          <select
            className="kz-admin__list-select"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortKey);
              setPage(1);
            }}
            aria-label="排序"
          >
            <option value="newest">最新上傳</option>
            <option value="oldest">最早上傳</option>
            <option value="name">檔名 A→Z</option>
            <option value="size">檔案大小</option>
          </select>
        </div>
        <p className="kz-admin__list-count" aria-live="polite">
          {filtered.length === items.length
            ? `共 ${items.length} 個檔案`
            : `顯示 ${filtered.length} / ${items.length} 個`}
        </p>
      </div>

      {pageItems.length === 0 ? (
        <p className="kz-admin__list-empty kz-admin__list-empty--block">
          {items.length === 0 ? "尚未上傳任何圖片。" : "沒有符合條件的媒體。"}
        </p>
      ) : (
        <div className="kz-admin__media-grid kz-admin__media-grid--padded">
          {pageItems.map((item) => (
            <article key={item.id} className="kz-admin__media-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.public_url} alt={item.alt || item.filename} />
              <div className="kz-admin__media-card__body">
                <p className="truncate text-sm font-medium" title={item.filename}>
                  {item.filename}
                </p>
                <p className="text-xs text-kz-plum-muted">
                  {mediaFolderLabel(item.folder)} · {formatBytes(item.size_bytes)}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <CopyUrlButton url={item.public_url} />
                  <AdminDeleteForm
                    action={deleteAction}
                    hidden={{ id: item.id }}
                    confirmMessage={`確定刪除「${item.filename}」？`}
                  >
                    <button type="submit" className="text-xs text-red-600 hover:underline">
                      刪除
                    </button>
                  </AdminDeleteForm>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="kz-admin__list-footer">
          <div className="kz-admin__list-pagesize">
            <label htmlFor="admin-media-pagesize">每頁</label>
            <select
              id="admin-media-pagesize"
              className="kz-admin__list-select kz-admin__list-select--sm"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="kz-admin__pagination">
            <button
              type="button"
              className="kz-admin__page-btn"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              上一頁
            </button>
            <span className="kz-admin__page-info">
              第 {safePage} / {totalPages} 頁
            </span>
            <button
              type="button"
              className="kz-admin__page-btn"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              下一頁
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
