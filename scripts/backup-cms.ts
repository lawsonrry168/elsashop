/**
 * Export all kz_cms_* tables to scripts/backups/cms-YYYYMMDD.json
 *
 * Usage:
 *   npm run backup:cms
 */
import { config } from "dotenv";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });
config();

const CMS_TABLES = [
  "kz_cms_site_settings",
  "kz_cms_treatments",
  "kz_cms_journal_posts",
  "kz_cms_faqs",
  "kz_cms_media",
  "kz_cms_shop_videos",
  "kz_cms_admins",
] as const;

async function backupCms() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const exportedAt = new Date().toISOString();
  const payload: Record<string, unknown> = {
    exportedAt,
    tables: {} as Record<string, unknown[]>,
  };

  for (const table of CMS_TABLES) {
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
      throw new Error(`${table}: ${error.message}`);
    }
    (payload.tables as Record<string, unknown[]>)[table] = data ?? [];
    console.log(`Exported ${table}: ${data?.length ?? 0} rows`);
  }

  const date = exportedAt.slice(0, 10).replace(/-/g, "");
  const dir = join(process.cwd(), "scripts", "backups");
  mkdirSync(dir, { recursive: true });
  const filePath = join(dir, `cms-${date}.json`);
  writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Wrote ${filePath}`);
}

backupCms().catch((err) => {
  console.error(err);
  process.exit(1);
});
