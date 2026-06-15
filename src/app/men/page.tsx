import type { Metadata } from "next";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { MoanaPageHero } from "@/components/MoanaPageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TreatmentMagazineGrid } from "@/components/TreatmentMagazineGrid";
import { site } from "@/data/site";
import { menTreatments } from "@/data/treatments";

export const metadata: Metadata = {
  title: "男賓護理",
  description:
    "康姿健男賓護理專區 — 針清、激光護理、深層清潔。獨立入口，私密舒適。",
};

export default function MenPage() {
  return (
    <>
      <section className="moana-page">
        <div className="container-kz">
          <MoanaPageHero
            watermark="Men"
            eyebrow="Men's Care"
            title="男賓護理專區"
            variant="dark"
            lead={
              <p>
                屯門男賓皮膚管理 — 針清、激光脫墨脫疣、深層清潔等。
                獨立入口，<strong>私密舒適</strong>空間，
                <strong className="text-kz-brand-pink">單次收費</strong>、
                <strong className="text-kz-sage">無硬銷</strong>。
              </p>
            }
          >
            <Link href="/book" className="moana-pill-btn">
              預約男賓護理
              <span aria-hidden>→</span>
            </Link>
          </MoanaPageHero>

          <div className="moana-catalog">
            <div className="moana-catalog__head">
              <div>
                <p className="moana-section-label">
                  <span className="moana-section-label__rule" aria-hidden />
                  Treatments
                </p>
                <h2 className="moana-catalog__title">男賓療程</h2>
                <p className="moana-catalog__desc">
                  以下療程價格需諮詢報價，請透過 WhatsApp 或 IG 查詢。
                </p>
              </div>
            </div>
            <TreatmentMagazineGrid treatments={menTreatments} />
          </div>
        </div>
      </section>

      <ProcessSteps />
      <BookingCTA
        title="預約男賓護理"
        subtitle="WhatsApp 或 IG DM 預約，說明「男賓療程」即可。"
      />
    </>
  );
}
