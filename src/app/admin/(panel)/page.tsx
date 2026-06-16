import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isCmsConfigured } from "@/lib/supabase/env";
import {
  GA4_METRIC_HINTS,
  TRACKING_EVENT_GROUPS,
  getAnalyticsStatus,
} from "@/data/tracking-spec";

function formatDateTime(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("zh-Hant", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export default async function AdminDashboardPage() {
  if (!isCmsConfigured()) {
    return (
      <div className="kz-admin__card kz-admin__card--muted">
        <h2 className="kz-admin__card-title">尚未連接 CMS</h2>
        <p className="kz-admin__card-lead">
          請在 <code>.env.local</code> 設定 Supabase 環境變數後重新啟動 dev server。
        </p>
      </div>
    );
  }

  const supabase = await createSupabaseServerClient();
  const analytics = getAnalyticsStatus();

  const [
    journalPub,
    journalDraft,
    treatmentsPub,
    treatmentsDraft,
    faqsPub,
    faqsDraft,
    videosPub,
    videosDraft,
    media,
    recentJournal,
    recentTreatments,
    siteSettings,
  ] = await Promise.all([
    supabase
      .from("kz_cms_journal_posts")
      .select("slug", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("kz_cms_journal_posts")
      .select("slug", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase
      .from("kz_cms_treatments")
      .select("slug", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("kz_cms_treatments")
      .select("slug", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase.from("kz_cms_faqs").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("kz_cms_faqs").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase
      .from("kz_cms_shop_videos")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("kz_cms_shop_videos")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase.from("kz_cms_media").select("id", { count: "exact", head: true }),
    supabase
      .from("kz_cms_journal_posts")
      .select("slug, title, status, updated_at, published_at")
      .order("updated_at", { ascending: false })
      .limit(5),
    supabase
      .from("kz_cms_treatments")
      .select("slug, name, status, updated_at")
      .order("updated_at", { ascending: false })
      .limit(5),
    supabase
      .from("kz_cms_site_settings")
      .select("updated_at")
      .eq("id", "default")
      .maybeSingle(),
  ]);

  const draftTotal =
    (journalDraft.count ?? 0) +
    (treatmentsDraft.count ?? 0) +
    (faqsDraft.count ?? 0) +
    (videosDraft.count ?? 0);

  const stats = [
    {
      label: "醫美知識",
      count: journalPub.count ?? 0,
      draft: journalDraft.count ?? 0,
      href: "/admin/journal",
      tone: "rose",
    },
    {
      label: "療程",
      count: treatmentsPub.count ?? 0,
      draft: treatmentsDraft.count ?? 0,
      href: "/admin/treatments",
      tone: "plum",
    },
    {
      label: "店內 Reels",
      count: videosPub.count ?? 0,
      draft: videosDraft.count ?? 0,
      href: "/admin/videos",
      tone: "sage",
    },
    {
      label: "媒體庫",
      count: media.count ?? 0,
      draft: 0,
      href: "/admin/media",
      tone: "lilac",
    },
    {
      label: "常見問題",
      count: faqsPub.count ?? 0,
      draft: faqsDraft.count ?? 0,
      href: "/admin/faq",
      tone: "gold",
    },
  ];

  const quickActions = [
    { label: "編輯首頁 Hero", href: "/admin/hero" },
    { label: "首頁區塊", href: "/admin/home-sections" },
    { label: "站點內容", href: "/admin/content" },
    { label: "內頁內容", href: "/admin/pages" },
    { label: "新增文章", href: "/admin/journal/new" },
    { label: "新增療程", href: "/admin/treatments/new" },
    { label: "上傳圖片", href: "/admin/media" },
    { label: "使用說明", href: "/admin/guide" },
  ];

  return (
    <>
      <header className="kz-admin__header kz-admin__header--dashboard">
        <div>
          <p className="kz-admin__eyebrow">Dashboard</p>
          <h1 className="kz-admin__title">儀表板</h1>
          <p className="kz-admin__subtitle">
            內容總覽、最近更新與轉換追蹤參考。站點設定最後更新：
            {formatDateTime(siteSettings.data?.updated_at)}
          </p>
        </div>
        {draftTotal > 0 ? (
          <div className="kz-admin__alert kz-admin__alert--draft">
            <strong>{draftTotal}</strong> 則草稿未發布
          </div>
        ) : (
          <div className="kz-admin__alert kz-admin__alert--ok">全部內容已發布</div>
        )}
      </header>

      <section className="kz-admin__section">
        <h2 className="kz-admin__section-title">內容數量</h2>
        <div className="kz-admin__stat-grid">
          {stats.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`kz-admin__stat-card kz-admin__stat-card--${item.tone}`}
            >
              <p className="kz-admin__stat-label">{item.label}</p>
              <p className="kz-admin__stat-value">{item.count}</p>
              {item.draft > 0 ? (
                <p className="kz-admin__stat-meta">
                  <span className="kz-admin__badge kz-admin__badge--draft">
                    {item.draft} 草稿
                  </span>
                </p>
              ) : (
                <p className="kz-admin__stat-meta">已發布</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      <div className="kz-admin__dashboard-grid">
        <section className="kz-admin__card">
          <div className="kz-admin__card-head">
            <h2 className="kz-admin__card-title">最近更新</h2>
            <Link href="/admin/journal" className="kz-admin__text-link">
              全部文章
            </Link>
          </div>
          <ul className="kz-admin__activity-list">
            {(recentJournal.data ?? []).map((row) => (
              <li key={row.slug}>
                <Link href={`/admin/journal/${row.slug}`} className="kz-admin__activity-item">
                  <span className="kz-admin__activity-title">{row.title}</span>
                  <span className="kz-admin__activity-meta">
                    {row.status === "draft" ? (
                      <span className="kz-admin__badge kz-admin__badge--draft">草稿</span>
                    ) : null}
                    {formatDateTime(row.updated_at)}
                  </span>
                </Link>
              </li>
            ))}
            {(recentJournal.data ?? []).length === 0 ? (
              <li className="kz-admin__empty">尚無文章</li>
            ) : null}
          </ul>
          <div className="kz-admin__card-head kz-admin__card-head--spaced">
            <h3 className="kz-admin__card-subtitle">療程</h3>
            <Link href="/admin/treatments" className="kz-admin__text-link">
              全部療程
            </Link>
          </div>
          <ul className="kz-admin__activity-list">
            {(recentTreatments.data ?? []).map((row) => (
              <li key={row.slug}>
                <Link
                  href={`/admin/treatments/${row.slug}`}
                  className="kz-admin__activity-item"
                >
                  <span className="kz-admin__activity-title">{row.name}</span>
                  <span className="kz-admin__activity-meta">
                    {row.status === "draft" ? (
                      <span className="kz-admin__badge kz-admin__badge--draft">草稿</span>
                    ) : null}
                    {formatDateTime(row.updated_at)}
                  </span>
                </Link>
              </li>
            ))}
            {(recentTreatments.data ?? []).length === 0 ? (
              <li className="kz-admin__empty">尚無療程</li>
            ) : null}
          </ul>
        </section>

        <section className="kz-admin__card">
          <h2 className="kz-admin__card-title">快速操作</h2>
          <div className="kz-admin__quick-actions">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href} className="kz-admin__quick-btn">
                {action.label}
              </Link>
            ))}
          </div>
          <div className="kz-admin__tip-box">
            <p className="kz-admin__tip-title">快取提示</p>
            <p>
              儲存後前台約 <strong>1 分鐘</strong>內自動更新。圖片規格請見{" "}
              <Link href="/admin/guide" className="kz-admin__text-link">
                使用說明
              </Link>
              。
            </p>
          </div>
        </section>
      </div>

      <section className="kz-admin__section" id="analytics">
        <div className="kz-admin__card-head">
          <div>
            <h2 className="kz-admin__section-title">轉換與停留追蹤</h2>
            <p className="kz-admin__section-lead">
              CMS 內無法顯示 GA4 即時圖表（需 Google 帳號登入）。以下為站內已埋點事件目錄與 GA4
              查看方式。
            </p>
          </div>
          <span
            className={`kz-admin__status-pill ${
              analytics.active ? "kz-admin__status-pill--on" : "kz-admin__status-pill--off"
            }`}
          >
            {analytics.active
              ? analytics.mode === "gtm"
                ? `GTM ${analytics.gtmId}`
                : `GA4 ${analytics.gaId}`
              : "未設定追蹤 ID"}
          </span>
        </div>

        <div className="kz-admin__dashboard-grid kz-admin__dashboard-grid--analytics">
          <div className="kz-admin__card">
            <h3 className="kz-admin__card-title">GA4 指標在哪看</h3>
            <ul className="kz-admin__metric-list">
              {GA4_METRIC_HINTS.map((hint) => (
                <li key={hint.metric}>
                  <strong>{hint.metric}</strong>
                  <span>{hint.ga4Path}</span>
                  <p>{hint.note}</p>
                </li>
              ))}
            </ul>
            <div className="kz-admin__external-links">
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="kz-admin__quick-btn"
              >
                開啟 Google Analytics
              </a>
              {analytics.gtmId ? (
                <a
                  href="https://tagmanager.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kz-admin__quick-btn kz-admin__quick-btn--ghost"
                >
                  開啟 Tag Manager
                </a>
              ) : null}
            </div>
          </div>

          <div className="kz-admin__card">
            <h3 className="kz-admin__card-title">站內 CTA 事件目錄</h3>
            <p className="kz-admin__card-lead">
              點擊會推送 <code>dataLayer</code>，事件名主要為{" "}
              <code>generate_lead</code>、<code>funnel_step</code>、
              <code>page_engagement</code>（停留 ≥3 秒）。
            </p>
            <div className="kz-admin__tracking-groups">
              {TRACKING_EVENT_GROUPS.map((group) => (
                <details key={group.title} className="kz-admin__tracking-group">
                  <summary>
                    {group.title}
                    <span>{group.events.length} 項</span>
                  </summary>
                  <p className="kz-admin__tracking-desc">{group.description}</p>
                  <table className="kz-admin__table kz-admin__table--compact">
                    <thead>
                      <tr>
                        <th>cta_id</th>
                        <th>說明</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.events.map((event) => (
                        <tr key={event.id}>
                          <td>
                            <code>{event.id}</code>
                          </td>
                          <td>
                            {event.label}
                            {event.page ? (
                              <span className="kz-admin__muted"> · {event.page}</span>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
