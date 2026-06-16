import Link from "next/link";
import { saveFaq } from "@/app/admin/actions";

export default function AdminFaqNewPage() {
  return (
    <>
      <div className="kz-admin__header">
        <h1 className="kz-admin__title">新增 FAQ</h1>
        <Link href="/admin/faq" className="text-sm text-kz-rose no-underline">
          ← 返回列表
        </Link>
      </div>
      <form action={saveFaq} className="kz-admin__card kz-admin__form">
        <div className="kz-admin__field">
          <label htmlFor="question">問題</label>
          <input id="question" name="question" required />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="answer">答案</label>
          <textarea id="answer" name="answer" required />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="sort_order">排序</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={99} />
        </div>
        <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
          儲存
        </button>
      </form>
    </>
  );
}
