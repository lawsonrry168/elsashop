"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  hint?: string;
  exact?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    label: "總覽",
    items: [{ href: "/admin", label: "儀表板", hint: "數量、最近更新", exact: true }],
  },
  {
    label: "版面與文案",
    items: [
      { href: "/admin/hero", label: "首頁 Hero", hint: "主視覺輪播、CTA" },
      { href: "/admin/home-sections", label: "首頁區塊", hint: "排序、Teaser 文案" },
      { href: "/admin/content", label: "站點內容", hint: "信任、評價、痛症" },
      { href: "/admin/pages", label: "內頁內容", hint: "Hero、面板、SEO" },
    ],
  },
  {
    label: "列表內容",
    items: [
      { href: "/admin/journal", label: "醫美知識", hint: "文章列表" },
      { href: "/admin/treatments", label: "療程", hint: "療程資料" },
      { href: "/admin/videos", label: "店內 Reels", hint: "短片清單" },
      { href: "/admin/faq", label: "常見問題", hint: "FAQ 問答" },
    ],
  },
  {
    label: "資源",
    items: [{ href: "/admin/media", label: "媒體庫", hint: "上傳與管理圖片" }],
  },
  {
    label: "設定",
    items: [{ href: "/admin/site", label: "站點設定", hint: "電話、地址、社群" }],
  },
  {
    label: "說明",
    items: [{ href: "/admin/guide", label: "使用說明", hint: "完整操作手冊" }],
  },
];

function isActive(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="kz-admin__nav" aria-label="CMS 導覽">
      {navGroups.map((group) => (
        <div key={group.label} className="kz-admin__nav-group">
          <p className="kz-admin__nav-label">{group.label}</p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item) ? "page" : undefined}
              title={item.hint}
            >
              <span className="kz-admin__nav-link-label">{item.label}</span>
              {item.hint ? (
                <span className="kz-admin__nav-link-hint">{item.hint}</span>
              ) : null}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
