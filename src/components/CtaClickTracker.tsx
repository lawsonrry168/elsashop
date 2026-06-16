"use client";

import { useEffect } from "react";
import { trackCtaClick } from "@/lib/analytics";

export function CtaClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest<HTMLElement>("[data-cta-id]");
      if (!el) return;
      const ctaId = el.getAttribute("data-cta-id");
      if (!ctaId) return;
      if (el.closest("[data-cta-tracked]")) return;
      trackCtaClick(ctaId, { page: window.location.pathname });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
