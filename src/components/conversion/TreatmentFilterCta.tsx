"use client";

import { WhatsAppCta } from "@/components/conversion/CtaLinks";
import { whatsappMessages } from "@/lib/whatsapp-messages";

type Props = {
  category: string;
  problem: string;
  count: number;
};

export function TreatmentFilterCta({ category, problem, count }: Props) {
  if (count === 0) return null;

  const hasFilter = category !== "全部" || problem !== "全部";

  return (
    <div className="conversion-filter-cta">
      <p className="conversion-filter-cta__text">
        {hasFilter
          ? `已篩選 ${count} 項療程 — 想直接問呢類問題？`
          : `共 ${count} 項療程 — 唔肯定揀邊個？可以先量膚分析`}
      </p>
      <WhatsAppCta
        ctaId="cta_whatsapp_treatments_filtered"
        message={whatsappMessages.filteredTreatments(category, problem)}
        className="moana-pill-btn moana-pill-btn--dark"
      >
        WhatsApp 預約諮詢
        <span aria-hidden>→</span>
      </WhatsAppCta>
    </div>
  );
}
