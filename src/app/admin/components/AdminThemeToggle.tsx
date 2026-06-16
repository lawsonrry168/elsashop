"use client";

import { useAdminTheme } from "@/app/admin/components/AdminThemeProvider";

type Props = {
  className?: string;
  compact?: boolean;
};

export function AdminThemeToggle({ className = "", compact = false }: Props) {
  const { isDark, toggleTheme } = useAdminTheme();

  return (
    <button
      type="button"
      className={`kz-admin__theme-toggle ${compact ? "kz-admin__theme-toggle--compact" : ""} ${className}`.trim()}
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "切換至淺色模式" : "切換至夜視模式"}
      title={isDark ? "淺色模式" : "夜視模式"}
    >
      <span className="kz-admin__theme-toggle-icon" aria-hidden>
        {isDark ? "☀" : "☾"}
      </span>
      {!compact ? (
        <span className="kz-admin__theme-toggle-label">{isDark ? "淺色模式" : "夜視模式"}</span>
      ) : null}
    </button>
  );
}
