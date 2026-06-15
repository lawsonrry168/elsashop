"use client";

import { WhatsAppCta } from "@/components/conversion/CtaLinks";
import { whatsappMessages } from "@/lib/whatsapp-messages";

const peelTypes = [
  { name: "油性 / 暗瘡", desc: "30% 水楊酸 + 杏仁酸，深層清潔溶解粉刺。" },
  { name: "敏感 / 泛紅", desc: "21% 極溫和杏仁酸，打破敏感肌宿命。" },
  { name: "暗沉 / 色素", desc: "針對色沉、膚色不均，提亮透亮。" },
  { name: "熟齡 / 乾燥", desc: "溫和更新角質，改善粗糙與乾紋。" },
];

export function SkinPeelGrid() {
  return (
    <div className="moana-peel-grid">
      {peelTypes.map((p, i) => (
        <WhatsAppCta
          key={p.name}
          ctaId={`cta_whatsapp_peel_${i + 1}`}
          message={whatsappMessages.peelType(p.name)}
          className="moana-panel moana-panel--card conversion-peel-card group"
        >
          <span className="moana-peel-grid__num">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="moana-panel__title">{p.name}</h3>
          <p className="moana-panel__desc">{p.desc}</p>
          <span className="conversion-peel-card__action">
            WhatsApp 諮詢此配方
            <span aria-hidden>→</span>
          </span>
        </WhatsAppCta>
      ))}
    </div>
  );
}
