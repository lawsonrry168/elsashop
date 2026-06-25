# 康姿健 CMS 設定指南

## 1. 環境變數

複製 `.env.example` 為 `.env.local`，填入 Supabase 專案 URL 與 anon key。

## 2. 匯入現有內容

```bash
npm run seed:cms
```

需要 `SUPABASE_SERVICE_ROLE_KEY`（僅本機／CI 使用，勿提交）。

## 3. 建立第一個管理員

**方式 A — 指令（需 `SUPABASE_SERVICE_ROLE_KEY`）**

```bash
npm run create:admin -- --email your@email.com --password 'YourPass123' --role owner
```

**方式 B — Supabase Dashboard 手動**

1. 在 [Supabase Dashboard](https://supabase.com/dashboard) → Authentication → Users 建立用戶
2. 在 SQL Editor 執行：

```sql
insert into public.kz_cms_admins (user_id, email, role)
values ('<auth.users.id>', 'your@email.com', 'owner');
```

## 4. 登入後台

開發環境：`http://localhost:3006/admin`

## 架構

| 表 | 用途 |
|----|------|
| `kz_cms_journal_posts` | 醫美知識 |
| `kz_cms_treatments` | 療程 + 詳情 JSON |
| `kz_cms_faqs` | 常見問題 |
| `kz_cms_site_settings` | 站點設定（Phase 2） |
| `kz_cms_admins` | 後台權限 |

未設定 Supabase 時，前台自動 fallback 至 `src/data/*` 靜態檔。
