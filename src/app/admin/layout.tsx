import type { ReactNode } from "react";
import { adminThemeInitScript } from "@/app/admin/lib/admin-theme";
import { AdminThemeProvider } from "@/app/admin/components/AdminThemeProvider";
import "./admin.css";
import "./admin-dark.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: adminThemeInitScript() }} />
      <AdminThemeProvider>{children}</AdminThemeProvider>
    </>
  );
}
