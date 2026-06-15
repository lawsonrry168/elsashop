import type { Metadata } from "next";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { EditorialImage } from "@/components/EditorialImage";
import { MoanaPageHero } from "@/components/MoanaPageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { WhatsAppCta } from "@/components/conversion/CtaLinks";
import { site } from "@/data/site";
import { traditionalTherapies, wellnessServices } from "@/data/wellness";
import { whatsappMessages } from "@/lib/whatsapp-messages";

export const metadata: Metadata = {
  title: "痛症理療",
  description:
    "康姿健痛症理療 — Dr. Rainbow 遠紅外線焗倉、Dr. Face 童顏機、退背拔罐刮痧。屯門單次收費。",
};

export default function WellnessPage() {
  return (
    <>
      <section className="moana-page">
        <div className="container-kz">
          <MoanaPageHero
            watermark="Wellness"
            eyebrow="Pain & Wellness"
            title="痛症理療 · 遠紅外線養生"
            variant="dark"
            lead={
              <p>
                皮膚管理之外，康姿健亦提供
                <strong> Dr. Rainbow 醫療級遠紅外線</strong>與
                <strong className="text-kz-brand-pink"> 傳統痛症理療</strong>。
                單次收費、無硬銷，做完 Facial 再焗一焗，效果 Double Up。
              </p>
            }
          >
            <WhatsAppCta
              ctaId="cta_whatsapp_wellness"
              message={whatsappMessages.wellness}
              className="moana-pill-btn"
            >
              WhatsApp 查詢
              <span aria-hidden>→</span>
            </WhatsAppCta>
          </MoanaPageHero>

          <div className="moana-wellness-list">
            {wellnessServices.map((service, i) => (
              <article
                key={service.id}
                className={`moana-home__chapter moana-home__chapter--split moana-wellness-list__item ${i % 2 === 1 ? "moana-wellness-list__item--reverse" : ""}`}
              >
                <EditorialImage
                  {...service.image}
                  caption={service.image.alt}
                  aspect="promo"
                  fit="contain"
                />
                <div className="moana-home__chapter-body">
                  <p className="moana-section-label">
                    <span className="moana-section-label__rule" aria-hidden />
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="moana-home__chapter-title">{service.title}</h2>
                  <div className="moana-home__chapter-text">
                    {service.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="moana-wellness-traditional">
            <p className="moana-section-label">
              <span className="moana-section-label__rule" aria-hidden />
              Traditional
            </p>
            <h2 className="moana-home__section-title">傳統痛症護理</h2>
            <ul className="moana-wellness-traditional__list">
              {traditionalTherapies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="moana-home__section-desc mt-6">
              詳情及收費請透過 WhatsApp 或 IG 查詢 — {site.hours}，{site.location}地舖。
            </p>
            <p className="mt-6">
              <Link href="/journal" className="moana-pill-btn moana-pill-btn--ghost">
                閱讀遠紅外線相關文章
                <span aria-hidden>→</span>
              </Link>
            </p>
          </section>
        </div>
      </section>

      <ProcessSteps />
      <BookingCTA
        title="預約痛症理療"
        subtitle="WhatsApp 或 IG DM，說明「痛症理療 / 遠紅外線」即可。"
      />
    </>
  );
}
