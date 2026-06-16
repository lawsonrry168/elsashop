import Link from "next/link";
import { deleteShopVideoAction, reorderShopVideosAction } from "@/app/admin/actions";
import { AdminListTable } from "@/app/admin/components/AdminListTable";
import { videosToListRows } from "@/lib/cms/admin-list-mappers";
import { getAdminShopVideos } from "@/lib/cms/queries";

const COLUMNS = [
  { key: "id", label: "#", width: "sm" as const, sortable: true, sortType: "number" as const },
  { key: "title", label: "標題", width: "lg" as const, truncate: true, sortable: true, sortType: "string" as const },
  { key: "category", label: "分類", width: "md" as const, sortable: true, sortType: "string" as const },
  { key: "status", label: "狀態", width: "md" as const },
];

export default async function AdminVideosListPage() {
  const videos = await getAdminShopVideos();
  const rows = videosToListRows(videos);

  return (
    <>
      <div className="kz-admin__header">
        <h1 className="kz-admin__title">店內 Reels</h1>
        <Link href="/admin/videos/new" className="moana-pill-btn moana-pill-btn--dark">
          新增影片
        </Link>
      </div>
      <div className="kz-admin__card kz-admin__card--list">
        <AdminListTable
          rows={rows}
          columns={COLUMNS}
          hint="MP4 檔案請放在 public/videos/reels/，此處只管理標題、封面路徑與排序。"
          searchPlaceholder="搜尋標題、分類、編號…"
          emptyMessage="沒有符合條件的影片"
          deleteAction={deleteShopVideoAction}
          reorderAction={reorderShopVideosAction}
          reorderHint="拖曳 ⠿ 調整首頁 Reels 順序，放開後自動儲存。"
        />
      </div>
    </>
  );
}
