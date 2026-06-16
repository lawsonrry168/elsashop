import type { SupabaseClient } from "@supabase/supabase-js";

export async function isCmsAdminUser(
  supabase: SupabaseClient,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("kz_cms_user_is_admin", {
    target_user_id: userId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}
