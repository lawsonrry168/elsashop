import Link from "next/link";
import { createTreatment } from "@/app/admin/actions";
import { AdminImageFields } from "@/app/admin/components/AdminImageFields";
import { AdminPresetSelect } from "@/app/admin/components/AdminPresetSelect";
import { CMS_TREATMENT_CATEGORIES } from "@/lib/cms/admin-field-options";

export default function AdminTreatmentNewPage() {
  return (
    <>
      <div className="kz-admin__header">
        <h1 className="kz-admin__title">新增療程</h1>
        <Link href="/admin/treatments" className="text-sm text-kz-rose no-underline">
          ← 返回列表
        </Link>
      </div>
      <form action={createTreatment} className="kz-admin__card kz-admin__form">
        <div className="kz-admin__field">
          <label htmlFor="name">名稱</label>
          <input id="name" name="name" required />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="slug">Slug（留空自動產生）</label>
          <input id="slug" name="slug" placeholder="my-treatment" />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="tagline">簡介</label>
          <textarea id="tagline" name="tagline" />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="category">分類</label>
          <AdminPresetSelect
            id="category"
            name="category"
            options={CMS_TREATMENT_CATEGORIES}
            defaultValue={CMS_TREATMENT_CATEGORIES[0]?.value ?? ""}
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="problems">針對問題（逗號分隔）</label>
          <input id="problems" name="problems" />
        </div>
        <AdminImageFields folder="treatments" />
        <div className="kz-admin__field kz-admin__field--row">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="featured" />
            首頁精選
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="for_men" />
            男賓療程
          </label>
        </div>
        <div className="kz-admin__field">
          <label htmlFor="price_type">價錢類型</label>
          <select id="price_type" name="price_type" defaultValue="consult">
            <option value="consult">諮詢報價</option>
            <option value="fixed">固定價格</option>
          </select>
        </div>
        <div className="kz-admin__field">
          <label htmlFor="price">價錢</label>
          <input id="price" name="price" />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="price_note">價錢備註</label>
          <input id="price_note" name="price_note" />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="suitable_for">適合對象</label>
          <textarea id="suitable_for" name="suitable_for" />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="features">療程特色（每行一項）</label>
          <textarea id="features" name="features" />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="status">狀態</label>
          <select id="status" name="status" defaultValue="draft">
            <option value="draft">草稿</option>
            <option value="published">已發布</option>
          </select>
        </div>
        <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
          建立
        </button>
      </form>
    </>
  );
}
