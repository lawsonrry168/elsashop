import { Suspense } from "react";
import { AdminInnerPagesEditor } from "@/app/admin/components/AdminInnerPagesEditor";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { INNER_PAGE_IDS } from "@/data/inner-pages";
import { getAllInnerPagesForAdmin, innerPageHasOverrides } from "@/lib/cms/inner-pages";
import { getSiteSettingsData } from "@/lib/cms/site";
import { getCmsPathOptions } from "@/lib/cms/admin-path-options";

function EditorFallback() {
  return <p className="text-sm text-kz-plum-muted">載入編輯器…</p>;
}

export default async function AdminInnerPagesPage() {
  const [pages, pathOptions, settings] = await Promise.all([
    getAllInnerPagesForAdmin(),
    getCmsPathOptions(),
    getSiteSettingsData(),
  ]);

  const pageOverrides = Object.fromEntries(
    INNER_PAGE_IDS.map((id) => [id, innerPageHasOverrides(id, settings)]),
  ) as Record<(typeof INNER_PAGE_IDS)[number], boolean>;

  return (
    <>
      <AdminPageHeader
        title="內頁內容"
        lead="編輯量膚、男賓、痛症、關於等內頁的 Hero、說明面板與 SEO meta。"
        guideHref="/admin/guide#inner-pages"
      />
      <Suspense fallback={<EditorFallback />}>
        <AdminInnerPagesEditor
          pages={pages}
          pathOptions={pathOptions}
          pageOverrides={pageOverrides}
        />
      </Suspense>
    </>
  );
}
