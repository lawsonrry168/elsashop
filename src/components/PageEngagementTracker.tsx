"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageEngagement } from "@/lib/analytics";

export function PageEngagementTracker() {
  const pathname = usePathname();
  const startedAt = useRef(Date.now());
  const sent = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
    sent.current = false;

    const flush = () => {
      if (sent.current) return;
      const seconds = Math.round((Date.now() - startedAt.current) / 1000);
      if (seconds < 3) return;
      sent.current = true;
      trackPageEngagement(pathname, seconds);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };

    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      flush();
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pathname]);

  return null;
}
