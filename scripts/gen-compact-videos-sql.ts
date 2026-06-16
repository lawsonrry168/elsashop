import { writeFileSync } from "node:fs";
import { shopVideos } from "../src/data/shop-videos";

function esc(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

const values = shopVideos
  .map(
    (v, i) =>
      `(${v.id}, ${esc(v.title)}, ${esc(v.excerpt)}, ${esc(v.category)}, ${v.durationSec}, ${esc(v.poster)}, ${esc(v.src)}, ${v.relatedHref ? esc(v.relatedHref) : "null"}, ${i}, 'published')`,
  )
  .join(",\n");

const sql = `insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status)
values
${values}
on conflict (id) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  category = excluded.category,
  duration_sec = excluded.duration_sec,
  poster = excluded.poster,
  src = excluded.src,
  related_href = excluded.related_href,
  sort_order = excluded.sort_order,
  updated_at = now();`;

writeFileSync("scripts/compact-videos.sql", sql, "utf8");
console.log(`Wrote ${sql.length} bytes`);
