import type { HeroContent, HeroMarqueeItem } from "@/data/hero";
import { buildHeroMarqueeItems } from "@/data/hero";
import Link from "next/link";
import { HeroImageCarousel } from "@/components/HeroImageCarousel";
import { IconArrowRight } from "@/components/icons/KzIconsServer";
import { InstagramCta, WhatsAppCta } from "@/components/conversion/CtaLinks";
import { whatsappMessages } from "@/lib/whatsapp-messages";

function HeroMarqueeItem({
  item,
  idSuffix = "",
}: {
  item: HeroMarqueeItem;
  idSuffix?: string;
}) {
  const key = `${item.key}${idSuffix}`;

  if (item.kind === "link") {
    return (
      <Link
        key={key}
        href={item.href}
        data-cta-id={item.ctaId}
        className="editorial-hero__marquee-item editorial-hero__marquee-item--link"
      >
        <span className="editorial-hero__marquee-num">{item.num}</span>
        {item.label}
      </Link>
    );
  }

  return (
    <span
      key={key}
      className={`editorial-hero__marquee-item editorial-hero__marquee-item--cred${
        item.highlight ? ` editorial-hero__marquee-item--cred-${item.highlight}` : ""
      }`}
    >
      {item.highlight && (
        <span className="editorial-hero__marquee-badge">
          {item.highlight === "award" ? "得獎" : "儀器"}
        </span>
      )}
      {item.label}
    </span>
  );
}

export function Hero({ content }: { content: HeroContent }) {
  const marqueeItems = buildHeroMarqueeItems(content);

  return (
    <section className="editorial-hero editorial-hero--mirror" aria-labelledby="hero-title">
      <div className="editorial-hero__bg" aria-hidden="true">
        <span className="editorial-hero__watermark editorial-hero__piece editorial-hero__piece--d0">
          {content.watermark}
        </span>
      </div>

      <div className="editorial-hero__stage editorial-hero__piece editorial-hero__piece--d3">
        <div className="editorial-hero__media editorial-hero__media--welcome">
          <HeroImageCarousel slides={content.slides} />
        </div>

        <div className="editorial-hero__main">
          <div className="editorial-hero__copy">
            <div className="editorial-hero__head">
              <p
                className="editorial-hero__kicker editorial-hero__piece editorial-hero__piece--d2"
                lang="en"
              >
                {content.kicker}
              </p>

              <div className="editorial-hero__title-wrap editorial-hero__piece editorial-hero__piece--d3">
                <h1 id="hero-title" className="editorial-hero__title">
                  <span className="editorial-hero__title-line">{content.titleLines[0]}</span>
                  <span className="editorial-hero__title-line editorial-hero__title-line--offset">
                    {content.titleLines[1]}
                  </span>
                  <span className="editorial-hero__title-line editorial-hero__title-line--muted">
                    {content.titleLines[2]}
                  </span>
                </h1>
                <p className="editorial-hero__title-rail" aria-hidden="true">
                  {content.railTaglines.join(" · ")}
                </p>
              </div>
            </div>

            <div className="editorial-hero__tagline-band editorial-hero__piece editorial-hero__piece--d4">
              <div className="editorial-hero__sellpoints" aria-label="核心賣點">
                {content.sellBadges.map((sell) => (
                  <span
                    key={sell.id}
                    className={`editorial-hero__sell editorial-hero__sell--${sell.variant} editorial-hero__sell--${sell.id}`}
                  >
                    {sell.label}
                  </span>
                ))}
              </div>

              <p
                className="editorial-hero__tagline editorial-hero__tagline--art editorial-hero__piece editorial-hero__piece--d5"
                lang="en"
                aria-label={content.tagline.ariaLabel}
              >
                <span className="editorial-hero__tagline-line editorial-hero__tagline-line--1">
                  <span className="editorial-hero__tagline-whisper">
                    {content.tagline.line1Whisper}
                  </span>
                  <span className="editorial-hero__tagline-dot" aria-hidden="true">
                    ·
                  </span>
                  <span className="editorial-hero__tagline-em editorial-hero__tagline-em--skin">
                    {content.tagline.line1Em}
                  </span>
                  <span className="editorial-hero__tagline-script editorial-hero__tagline-script--inline">
                    {content.tagline.line1Script}
                  </span>
                </span>
                <span className="editorial-hero__tagline-line editorial-hero__tagline-line--2">
                  <span className="editorial-hero__tagline-display">
                    {content.tagline.line2Primary}
                  </span>
                  <span className="editorial-hero__tagline-display editorial-hero__tagline-display--accent">
                    {content.tagline.line2Accent}
                  </span>
                </span>
              </p>
            </div>

            <div className="editorial-hero__actions editorial-hero__piece editorial-hero__piece--d6">
              <WhatsAppCta
                ctaId="cta_whatsapp_hero"
                message={whatsappMessages.skinAnalysis}
                className="kzj-glass-btn kzj-glass-btn--hero group conversion-hero-actions__primary"
              >
                <span className="kzj-glass-btn__label">{content.whatsappLabel}</span>
                <span className="kzj-glass-btn__icon" aria-hidden="true">
                  <IconArrowRight size={14} />
                </span>
              </WhatsAppCta>
              <p className="editorial-hero__action-links">
                <Link
                  href={content.secondaryLinkHref}
                  className="editorial-hero__text-link"
                  data-cta-id="cta_hero_skin_flow"
                >
                  {content.secondaryLinkLabel}
                  <IconArrowRight size={14} />
                </Link>
                <span className="editorial-hero__action-sep" aria-hidden="true">
                  /
                </span>
                <InstagramCta
                  ctaId="cta_instagram_hero"
                  className="editorial-hero__text-link editorial-hero__text-link--plain"
                >
                  {content.instagramLabel}
                </InstagramCta>
              </p>
            </div>
          </div>
        </div>

        <div className="editorial-hero__marquee editorial-hero__piece editorial-hero__piece--d7">
          <nav className="editorial-hero__marquee-viewport" aria-label="快速導覽與專業認證">
            <div className="editorial-hero__marquee-track">
              {marqueeItems.map((item) => (
                <HeroMarqueeItem key={item.key} item={item} />
              ))}
              <div className="editorial-hero__marquee-duplicate" aria-hidden="true">
                {marqueeItems.map((item) => (
                  <HeroMarqueeItem key={`${item.key}-dup`} item={item} idSuffix="-dup" />
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
