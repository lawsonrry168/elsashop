"use client";

import Link from "next/link";
import { IconArrowRight } from "@/components/icons/KzIcons";
import { InstagramCta, TelCta, WhatsAppCta } from "@/components/conversion/CtaLinks";
import { whatsappMessages } from "@/lib/whatsapp-messages";
import { site } from "@/data/site";

export function MobileBookingBar() {
  return (
    <div className="conversion-mobile-bar md:hidden">
      <div className="conversion-mobile-bar__inner">
        <WhatsAppCta
          ctaId="cta_whatsapp_mobile_bar"
          message={whatsappMessages.default}
          className="moana-pill-btn moana-pill-btn--dark conversion-mobile-bar__wa"
        >
          WhatsApp 預約
        </WhatsAppCta>
        <InstagramCta
          ctaId="cta_instagram_mobile_bar"
          className="moana-pill-btn conversion-mobile-bar__ig"
        >
          IG
        </InstagramCta>
        <TelCta
          ctaId="cta_phone_mobile_bar"
          className="moana-pill-btn conversion-mobile-bar__tel"
        >
          致電
        </TelCta>
      </div>
    </div>
  );
}

export function BookingCTA({
  title = "準備好了解你的膚質了嗎？",
  subtitle = "透過 WhatsApp 或 Instagram DM 預約，單次收費、絕無硬銷。",
  className = "",
  whatsappMessage,
  ctaIdPrefix = "cta_booking_section",
}: {
  title?: string;
  subtitle?: string;
  className?: string;
  whatsappMessage?: string;
  ctaIdPrefix?: string;
}) {
  return (
    <section className={`moana-cta ${className}`}>
      <div className="container-kz moana-cta__inner">
        <div className="moana-cta__copy">
          <p className="moana-section-label">
            <span className="moana-section-label__rule" aria-hidden />
            Booking
          </p>
          <h2 className="moana-cta__title">{title}</h2>
          <p className="moana-cta__subtitle">{subtitle}</p>
        </div>
        <div className="moana-cta__actions">
          <WhatsAppCta
            ctaId={`${ctaIdPrefix}_whatsapp`}
            message={whatsappMessage ?? whatsappMessages.default}
            className="moana-pill-btn moana-pill-btn--dark"
          >
            WhatsApp 預約
            <IconArrowRight size={14} />
          </WhatsAppCta>
          <InstagramCta
            ctaId={`${ctaIdPrefix}_instagram`}
            className="moana-pill-btn"
          >
            Instagram DM
            <IconArrowRight size={14} />
          </InstagramCta>
          <Link
            href="/book"
            className="moana-pill-btn moana-pill-btn--ghost"
            data-cta-id={`${ctaIdPrefix}_book_page`}
          >
            引導式預約
            <IconArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
