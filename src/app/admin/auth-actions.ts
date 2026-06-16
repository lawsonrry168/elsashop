"use server";

import { redirect } from "next/navigation";
import { isCmsAdminUser } from "@/lib/cms/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isCmsConfigured } from "@/lib/supabase/env";

export async function signInAdmin(formData: FormData) {
  if (!isCmsConfigured()) {
    redirect("/admin/login?error=config");
  }
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    redirect("/admin/login?error=missing");
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?error=invalid");

  const userId = data.user?.id;
  if (!userId) redirect("/admin/login?error=invalid");

  const isAdmin = await isCmsAdminUser(supabase, userId);
  if (!isAdmin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  if (!isCmsConfigured()) {
    redirect("/admin/login");
  }
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
