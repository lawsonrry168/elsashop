"use client";

import { useRef, useState } from "react";
import {
  fetchAdminMediaAction,
  uploadMediaInlineAction,
} from "@/app/admin/actions";
import type { CmsMediaRow } from "@/lib/cms/types";
import { MediaSpecBox } from "@/app/admin/components/MediaSpecBox";
import {
  specForMediaFolder,
  type MediaSpecKey,
} from "@/app/admin/components/media-specs";

type Props = {
  urlName: string;
  altName?: string;
  label?: string;
  defaultUrl?: string | null;
  defaultAlt?: string | null;
  folder?: string;
  required?: boolean;
  hint?: string;
  specKey?: MediaSpecKey;
};

export function MediaFieldPicker({
  urlName,
  altName,
  label = "圖片",
  defaultUrl,
  defaultAlt,
  folder = "general",
  required,
  hint,
  specKey,
}: Props) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [alt, setAlt] = useState(defaultAlt ?? "");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [media, setMedia] = useState<CmsMediaRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function openPicker() {
    setPickerOpen(true);
    setLoading(true);
    setError("");
    try {
      const items = await fetchAdminMediaAction();
      setMedia(items);
    } catch {
      setError("無法載入媒體庫");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.set("file", file);
    formData.set("folder", folder);
    if (alt) formData.set("alt", alt);
    try {
      const result = await uploadMediaInlineAction(formData);
      setUrl(result.publicUrl);
      if (altName && result.alt) setAlt(result.alt);
      setPickerOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "上傳失敗");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function selectItem(item: CmsMediaRow) {
    setUrl(item.public_url);
    if (altName && item.alt) setAlt(item.alt);
    setPickerOpen(false);
  }

  const spec = specKey ? specKey : specForMediaFolder(folder);

  return (
    <>
      <div className="kz-admin__field">
        <label htmlFor={urlName}>{label}</label>
        <MediaSpecBox spec={spec} compact />
        <div className="kz-admin__media-toolbar">
          <button
            type="button"
            className="moana-pill-btn moana-pill-btn--dark"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
          >
            {uploading ? "上傳中…" : "上傳圖片"}
          </button>
          <button
            type="button"
            className="moana-pill-btn moana-pill-btn--ghost"
            onClick={openPicker}
          >
            從媒體庫選擇
          </button>
          {url ? (
            <button
              type="button"
              className="text-xs text-kz-plum-muted hover:text-kz-rose"
              onClick={() => setUrl("")}
            >
              清除
            </button>
          ) : null}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleUpload(file);
          }}
        />
        <input
          id={urlName}
          name={urlName}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="/images/... 或上傳後自動填入"
          required={required}
          className="mt-3"
        />
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            className="mt-3 max-h-40 rounded-lg border border-kz-lilac/60 object-cover"
          />
        ) : null}
        {hint ? <p className="mt-2 text-xs text-kz-plum-muted">{hint}</p> : null}
        {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      </div>

      {altName ? (
        <div className="kz-admin__field">
          <label htmlFor={altName}>圖片 alt 文字</label>
          <input
            id={altName}
            name={altName}
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />
        </div>
      ) : null}

      {pickerOpen ? (
        <div
          className="kz-admin__modal-backdrop"
          role="presentation"
          onClick={() => setPickerOpen(false)}
        >
          <div
            className="kz-admin__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="media-picker-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="kz-admin__modal-head">
              <h2 id="media-picker-title" className="font-semibold">
                選擇圖片
              </h2>
              <button
                type="button"
                className="text-sm text-kz-plum-muted"
                onClick={() => setPickerOpen(false)}
              >
                關閉
              </button>
            </div>
            <div className="kz-admin__modal-toolbar">
              <button
                type="button"
                className="moana-pill-btn moana-pill-btn--dark"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
              >
                {uploading ? "上傳中…" : "上傳新圖片"}
              </button>
            </div>
            {loading ? (
              <p className="text-sm text-kz-plum-muted">載入中…</p>
            ) : media.length === 0 ? (
              <p className="text-sm text-kz-plum-muted">
                媒體庫尚無圖片，請先上傳。
              </p>
            ) : (
              <div className="kz-admin__media-grid kz-admin__media-grid--picker">
                {media.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`kz-admin__media-card kz-admin__media-card--pickable${url === item.public_url ? " kz-admin__media-card--selected" : ""}`}
                    onClick={() => selectItem(item)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.public_url} alt={item.alt || item.filename} />
                    <span className="kz-admin__media-card__caption">
                      {item.filename}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
