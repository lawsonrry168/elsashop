import type { ReactNode } from "react";

type Props = {
  title?: string;
  items: ReactNode[];
};

/** 編輯頁頂部常用提示（留空＝預設、儲存後預覽等） */
export function AdminTips({ title = "編輯提示", items }: Props) {
  return (
    <aside className="kz-admin__tips" aria-label={title}>
      <p className="kz-admin__tips-title">{title}</p>
      <ul className="kz-admin__tips-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
