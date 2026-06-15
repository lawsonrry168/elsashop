import type { Metadata } from "next";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { SkinPeelGrid } from "@/components/conversion/SkinPeelGrid";
import { WhatsAppCta } from "@/components/conversion/CtaLinks";
import { MoanaPageHero } from "@/components/MoanaPageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { whatsappMessages } from "@/lib/whatsapp-messages";

export const metadata: Metadata = {
  title: "量膚定制",
  description:
    "康姿健量膚定制 — 先分析膚況，再建議 TEGODER 果酸等專屬療程。",
};

export default function SkinAnalysisPage() {
  return (
    <>
      <section className="moana-page">
        <div className="container-kz">
          <MoanaPageHero
            watermark="Skin"
            eyebrow="Skin Analysis"
            title="量膚定制"
            lead={
              <p>
                西班牙 TEGODER 醫學級果酸 —{" "}
                <strong>4 款專屬配方</strong>，量膚分析後
                <strong className="text-kz-brand-pink">對症下藥</strong>。
              </p>
            }
          >
            <WhatsAppCta
              ctaId="cta_whatsapp_skin_hero"
              message={whatsappMessages.skinAnalysis}
              className="moana-pill-btn moana-pill-btn--dark"
            >
              預約量膚分析
              <span aria-hidden>→</span>
            </WhatsAppCta>
          </MoanaPageHero>

          <div className="moana-about">
            <div className="moana-panel">
              <h2 className="moana-panel__title">什麼是量膚定制？</h2>
              <p>
                每位客人的膚質、生活習慣、肌膚問題都不同。康姿健堅持先進行專業量膚分析，
                再根據結果建議最適合的療程與果酸配方 — 不推銷套裝，你決定做不做。
              </p>
            </div>

            <div>
              <p className="moana-section-label">
                <span className="moana-section-label__rule" aria-hidden />
                TEGODER
              </p>
              <h2 className="moana-catalog__title">四款果酸方向</h2>
              <p className="conversion-peel-grid__hint">
                點選你的肌膚方向，直接以 WhatsApp 諮詢
              </p>
              <SkinPeelGrid />
            </div>

            <p className="moana-home__link-row">
              果酸療程價格需量膚後報價。
              <Link
                href="/journal"
                className="moana-pill-btn moana-pill-btn--ghost"
                data-cta-id="cta_skin_journal"
              >
                閱讀果酸知識
                <span aria-hidden>→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <ProcessSteps showCta />
      <BookingCTA
        title="預約量膚分析"
        whatsappMessage={whatsappMessages.skinAnalysis}
        ctaIdPrefix="cta_skin_footer"
      />
    </>
  );
}
