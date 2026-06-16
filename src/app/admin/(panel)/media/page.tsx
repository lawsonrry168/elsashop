import { deleteMediaAction } from "@/app/admin/actions";
import { AdminMediaLibrary } from "@/app/admin/components/AdminMediaLibrary";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { AdminTips } from "@/app/admin/components/AdminTips";
import { MediaUploadForm } from "@/app/admin/components/MediaUploadForm";
import { getAdminMediaList } from "@/lib/cms/queries";

export default async function AdminMediaPage() {
  const items = await getAdminMediaList();

  return (
    <>
      <AdminPageHeader
        title="媒體庫"
        lead="集中上傳與管理 CMS 圖片；編輯文章／療程時也可直接上傳，無需先來此頁。"
        guideHref="/admin/guide#media-lib"
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="kz-admin__card">
          <h2 className="font-semibold">上傳圖片</h2>
          <AdminTips
            title="上傳提示"
            items={[
              "選擇資料夾後會顯示對應版位的比例建議。",
              "JPEG／PNG 上傳後會自動轉為 WebP 以加快載入。",
              "Alt 文字會依檔名自動建議，可在編輯頁再調整。",
            ]}
          />
          <MediaUploadForm />
        </div>

        <div className="kz-admin__card kz-admin__card--list">
          <h2 className="kz-admin__list-panel-title">已上傳</h2>
          <AdminMediaLibrary items={items} deleteAction={deleteMediaAction} />
        </div>
      </div>
    </>
  );
}
