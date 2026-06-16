"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AdminSaveNotice() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);

  const saved = searchParams.get("saved") === "1";
  const preview = searchParams.get("preview");

  if (!saved || dismissed) return null;

  const previewPath = preview?.startsWith("/") ? preview : "/";

  function dismiss() {
    setDismissed(true);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("saved");
    params.delete("preview");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="kz-admin__save-notice" role="status">
      <span>
        <strong>已儲存。</strong>前台約 1 分鐘內更新；若未看到變更，可重新整理或稍候再試。
      </span>
      <Link href={previewPath} target="_blank" rel="noopener noreferrer">
        預覽前台 ↗
      </Link>
      <button type="button" className="kz-admin__save-notice-dismiss" onClick={dismiss}>
        關閉
      </button>
    </div>
  );
}
