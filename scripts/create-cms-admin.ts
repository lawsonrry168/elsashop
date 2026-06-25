/**
 * Create a Supabase Auth user and grant CMS admin access.
 *
 * Usage:
 *   npm run create:admin -- --email you@example.com --password 'YourPass123' --role editor
 *   npm run create:admin -- --email you@example.com --password 'YourPass123' --role owner
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });
config();

function readArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx + 1 >= process.argv.length) return undefined;
  return process.argv[idx + 1]?.trim();
}

async function main() {
  const email = readArg("--email")?.toLowerCase();
  const password = readArg("--password");
  const role = (readArg("--role") ?? "editor") as "owner" | "editor";

  if (!email || !password) {
    console.error("Usage: npm run create:admin -- --email EMAIL --password PASSWORD [--role owner|editor]");
    process.exit(1);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error("Invalid email address.");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  if (role !== "owner" && role !== "editor") {
    console.error("Role must be owner or editor.");
    process.exit(1);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: existingAdmins, error: listError } = await supabase
    .from("kz_cms_admins")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (listError) {
    console.error("Failed to check existing admin:", listError.message);
    process.exit(1);
  }

  if (existingAdmins) {
    console.error(`Admin already exists for ${email}`);
    process.exit(1);
  }

  let userId: string | undefined;

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError) {
    const msg = createError.message.toLowerCase();
    if (msg.includes("already") || msg.includes("registered")) {
      const { data: listed, error: listUsersError } = await supabase.auth.admin.listUsers();
      if (listUsersError) {
        console.error("User exists but could not list users:", listUsersError.message);
        process.exit(1);
      }
      const existing = listed.users.find((u) => u.email?.toLowerCase() === email);
      if (!existing) {
        console.error("User exists but could not resolve user id.");
        process.exit(1);
      }
      userId = existing.id;
      console.log(`Auth user already exists for ${email}, granting CMS access…`);
    } else {
      console.error("Failed to create auth user:", createError.message);
      process.exit(1);
    }
  } else {
    userId = created.user?.id;
  }

  if (!userId) {
    console.error("Missing user id after create.");
    process.exit(1);
  }

  const { error: adminError } = await supabase.from("kz_cms_admins").upsert(
    {
      user_id: userId,
      email,
      role,
    },
    { onConflict: "user_id" },
  );

  if (adminError) {
    console.error("Failed to insert kz_cms_admins:", adminError.message);
    process.exit(1);
  }

  console.log("CMS admin created successfully.");
  console.log(`  Email : ${email}`);
  console.log(`  Role  : ${role}`);
  console.log(`  Login : /admin/login`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
