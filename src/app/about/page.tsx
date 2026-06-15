import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { BookingCTA } from "@/components/BookingCTA";
import { TelCta, WhatsAppCta } from "@/components/conversion/CtaLinks";
import { BusinessHours } from "@/components/BusinessHours";
import { EditorialImage } from "@/components/EditorialImage";
import { EditorialPetalStats } from "@/components/EditorialPetalStats";
import { LocationMap } from "@/components/LocationMap";
import { MoanaPageHero } from "@/components/MoanaPageHero";
import { images } from "@/data/images";
import { moanaPetalIntro, moanaPetalStats } from "@/data/moana-stats";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "關於我們",
  description: site.description,
};

export default function AboutPage() {
  return (
    <>
      <section className="moana-page">
        <div className="container-kz">
          <MoanaPageHero
            watermark="About"
            eyebrow={site.nameEn}
            title="關於我們"
            lead={
              <p>
                {site.legalName}｜
                <strong className="text-kz-brand-pink">{site.studioTag}</strong>
                <br />
                {site.serviceKeywords}
              </p>
            }
          >
            <BrandLogo className="brand-logo--about moana-page-hero__logo" />
          </MoanaPageHero>

          <EditorialPetalStats
            items={moanaPetalStats}
            eyebrow="Trust"
            intro={moanaPetalIntro}
          />

          <div className="moana-about">
            <div className="moana-about__visuals">
              <EditorialImage
                {...images.studio.brandPoster}
                aspect="portrait"
                className="moana-about__brand"
              />
              <EditorialImage
                {...images.studio.interior}
                aspect="landscape"
                className="moana-about__image"
              />
            </div>

            <div className="moana-about__intro">
              <p className="moana-section-label">
                <span className="moana-section-label__rule" aria-hidden />
                Studio
              </p>
              <p className="moana-about__services">{site.subtitle}</p>
              <p className="moana-about__lead">{site.description}</p>
            </div>

            <div className="moana-panel">
              <h2 className="moana-panel__title">我們的理念</h2>
              <p>
                康姿健相信，你的皮膚是你最好的配飾。我們以
                <strong>量膚定制</strong>為核心，結合醫美級儀器、西班牙醫學級護膚與傳統理療手藝，
                為每位客人提供專屬的美容與痛症管理方案。
              </p>
              <p>
                作為屯門一人工作室，我們堅持
                <strong className="text-kz-brand-pink">單次收費</strong>、明碼實價、
                <strong className="text-kz-sage">絕無硬銷</strong>
                — 讓你在安靜舒適的空間裡，專心享受屬於自己的 Me Time。
              </p>
            </div>

            <div className="moana-panel">
              <h2 className="moana-panel__title">服務範圍</h2>
              <ul className="moana-panel__list">
                <li>皮膚管理 — 量膚定制、果酸煥膚、等離子淨痘</li>
                <li>醫美儀器 — 激光祛斑、膠原提升、微針射頻</li>
                <li>痛症理療 — 退背、拔罐、刮痧等傳統理療護理</li>
                <li>男賓護理 — 獨立專區，私密舒適</li>
              </ul>
            </div>

            <div className="moana-panel">
              <h2 className="moana-panel__title">專業資歷</h2>
              <ul className="moana-panel__list">
                {site.credentialsFull.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="moana-panel moana-panel--contact">
              <h2 className="moana-panel__title">聯絡我們</h2>
              <dl className="moana-contact">
                <div>
                  <dt>電話</dt>
                  <dd>
                    <TelCta
                      ctaId="cta_about_phone"
                      className="moana-pill-btn moana-pill-btn--ghost"
                    >
                      {site.phone}
                    </TelCta>
                  </dd>
                </div>
                <div>
                  <dt>地址</dt>
                  <dd>{site.address}</dd>
                </div>
                <div>
                  <dt>預約</dt>
                  <dd className="moana-contact__actions">
                    <WhatsAppCta
                      ctaId="cta_whatsapp_about"
                      className="moana-pill-btn moana-pill-btn--dark"
                    >
                      WhatsApp
                      <span aria-hidden>→</span>
                    </WhatsAppCta>
                    <Link
                      href="/book"
                      className="moana-pill-btn"
                      data-cta-id="cta_about_book_funnel"
                    >
                      引導式預約
                      <span aria-hidden>→</span>
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt>營業</dt>
                  <dd>{site.hours}</dd>
                </div>
              </dl>
            </div>

            <div className="moana-about__extras">
              <BusinessHours />
              <LocationMap />
            </div>
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
