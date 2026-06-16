-- Reliable CMS admin check (bypasses RLS chicken-and-egg on kz_cms_admins)

create or replace function public.kz_cms_user_is_admin(target_user_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.kz_cms_admins a
    where a.user_id = target_user_id
  );
$$;

revoke all on function public.kz_cms_user_is_admin(uuid) from public;
grant execute on function public.kz_cms_user_is_admin(uuid) to authenticated;
grant execute on function public.kz_cms_user_is_admin(uuid) to service_role;
