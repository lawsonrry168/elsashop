-- Phase 2: media library + shop videos

create table if not exists public.kz_cms_media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  filename text not null,
  alt text not null default '',
  folder text not null default 'general',
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create table if not exists public.kz_cms_shop_videos (
  id integer primary key,
  title text not null,
  excerpt text not null default '',
  category text not null default '日常',
  duration_sec numeric not null default 0,
  poster text not null,
  src text not null,
  related_href text,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

create index if not exists kz_cms_media_folder_idx
  on public.kz_cms_media (folder, created_at desc);
create index if not exists kz_cms_shop_videos_status_idx
  on public.kz_cms_shop_videos (status, sort_order);

alter table public.kz_cms_media enable row level security;
alter table public.kz_cms_shop_videos enable row level security;

create policy "kz_cms_media_public_read" on public.kz_cms_media
  for select using (true);
create policy "kz_cms_media_admin_write" on public.kz_cms_media
  for all using (public.kz_cms_is_admin()) with check (public.kz_cms_is_admin());

create policy "kz_cms_shop_videos_public_read" on public.kz_cms_shop_videos
  for select using (status = 'published' or public.kz_cms_is_admin());
create policy "kz_cms_shop_videos_admin_write" on public.kz_cms_shop_videos
  for all using (public.kz_cms_is_admin()) with check (public.kz_cms_is_admin());
