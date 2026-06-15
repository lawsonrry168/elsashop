"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { InstagramCta, WhatsAppCta } from "@/components/conversion/CtaLinks";
import { images, verticalTaglines } from "@/data/images";
import { whatsappMessages } from "@/lib/whatsapp-messages";
import { site } from "@/data/site";

export function PremiumHero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".premium-hero__copy > *", {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      }).from(
        ".premium-hero__visual",
        { scale: 0.92, opacity: 0, duration: 1.2 },
        "-=0.6",
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="premium-hero relative overflow-hidden py-24 md:py-32 lg:py-40"
      aria-labelledby="hero-title"
    >
      <div className="premium-hero__mesh" aria-hidden="true" />
      <div className="premium-hero__grain" aria-hidden="true" />

      <div className="container-kz relative z-10">
        <div className="premium-hero__layout">
          <div className="premium-hero__copy">
            <p className="premium-hero__eyebrow font-ui">{site.subtitle}</p>

            <h1
              id="hero-title"
              className="premium-hero__title max-w-6xl w-full"
            >
              量膚定制，
              <span
                className="premium-hero__inline-img"
                style={{
                  backgroundImage: `url(${images.studio.interior.src})`,
                }}
                role="img"
                aria-label={images.studio.interior.alt}
              />
              更安心
            </h1>

            <p className="premium-hero__lead max-w-2xl">
              屯門韓系皮膚管理 · 醫美級儀器 ·{" "}
              <strong className="text-kz-brand-pink">單次收費</strong> ·{" "}
              <strong className="text-kz-sage">絕無硬銷</strong>。
              先分析膚況，再建議適合療程。
            </p>

            <div className="premium-hero__actions conversion-hero-actions">
              <WhatsAppCta
                ctaId="cta_whatsapp_hero"
                message={whatsappMessages.skinAnalysis}
                className="moana-pill-btn moana-pill-btn--dark conversion-hero-actions__primary"
              >
                WhatsApp 預約量膚
                <span aria-hidden>→</span>
              </WhatsAppCta>
              <div className="conversion-hero-actions__secondary">
                <InstagramCta
                  ctaId="cta_instagram_hero"
                  className="moana-pill-btn moana-pill-btn--ghost"
                >
                  Instagram DM
                </InstagramCta>
                <Link
                  href="/skin-analysis"
                  className="moana-pill-btn moana-pill-btn--ghost"
                  data-cta-id="cta_hero_skin_flow"
                >
                  了解量膚流程
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <ul className="premium-hero__promises font-ui" aria-label="服務承諾">
              {verticalTaglines.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>

          <div className="premium-hero__visual">
            <div className="premium-hero__visual-frame group overflow-hidden">
              <Image
                src={images.hero.main.src}
                alt={images.hero.main.alt}
                width={720}
                height={900}
                priority
                className="premium-hero__photo transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="premium-hero__caption font-accent">{site.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
