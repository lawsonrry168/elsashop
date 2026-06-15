import Link from "next/link";
import { EditorialImage } from "@/components/EditorialImage";
import { IconArrowRight } from "@/components/icons/KzIconsServer";
import { InstagramCta, WhatsAppCta } from "@/components/conversion/CtaLinks";
import { heroRailTaglines, images } from "@/data/images";
import { whatsappMessages } from "@/lib/whatsapp-messages";
import { site } from "@/data/site";

const heroIndex = [
  { num: "01", label: "療程目錄", href: "/treatments", ctaId: "cta_hero_index_treatments" },
  { num: "02", label: "量膚定制", href: "/skin-analysis", ctaId: "cta_hero_index_skin" },
  { num: "03", label: "男賓護理", href: "/men", ctaId: "cta_hero_index_men" },
  { num: "04", label: "醫美知識", href: "/journal", ctaId: "cta_hero_index_journal" },
] as const;

const heroSells = [
  { id: "pricing", label: "單次收費", variant: "pink" as const },
  { id: "trust", label: "絕無硬銷", variant: "sage" as const },
  { id: "device", label: "醫美級儀器", variant: "neutral" as const },
];

const heroCredentialHighlights: Record<string, "award" | "device"> = {
  "IBDR 2025 金獎": "award",
  "ITEC LV4 激光": "device",
  "姊妹美容優秀": "award",
};

const heroMarqueeItems = [
  ...heroIndex.map((item) => ({
    kind: "link" as const,
    key: item.href,
    num: item.num,
    label: item.label,
    href: item.href,
    ctaId: item.ctaId,
  })),
  ...[...site.credentials]
    .filter((label) => label !== "屯門地舖")
    .sort((a, b) => {
      const rank = (label: string) => (heroCredentialHighlights[label] ? 0 : 1);
      return rank(a) - rank(b);
    })
    .map((label) => ({
      kind: "cred" as const,
      key: label,
      label,
      highlight: heroCredentialHighlights[label],
    })),
];

const heroMarqueeLoop = [...heroMarqueeItems, ...heroMarqueeItems];

export function Hero() {
  return (
    <section className="editorial-hero editorial-hero--mirror" aria-labelledby="hero-title">
      <div className="editorial-hero__bg" aria-hidden="true">
        <span className="editorial-hero__watermark editorial-hero__piece editorial-hero__piece--d0">
          SKIN
        </span>
      </div>

      <div className="editorial-hero__stage editorial-hero__piece editorial-hero__piece--d3">
        <div className="editorial-hero__media editorial-hero__media--welcome">
          <EditorialImage
            {...images.hero.main}
            priority
            unoptimized
            aspect="auto"
            fit="cover"
            bleed
            className="editorial-hero__cover editorial-hero__cover--welcome"
            sizes="(max-width: 1023px) 92vw, 100vw"
          />
        </div>

        <div className="editorial-hero__main">
          <div className="editorial-hero__copy">
            <div className="editorial-hero__head">
              <p
                className="editorial-hero__kicker editorial-hero__piece editorial-hero__piece--d2"
                lang="en"
              >
                Kang Zi Jian · Bespoke Skincare
              </p>

              <div className="editorial-hero__title-wrap editorial-hero__piece editorial-hero__piece--d3">
                <h1 id="hero-title" className="editorial-hero__title">
                  <span className="editorial-hero__title-line">量膚</span>
                  <span className="editorial-hero__title-line editorial-hero__title-line--offset">
                    定制
                  </span>
                  <span className="editorial-hero__title-line editorial-hero__title-line--muted">
                    更安心
                  </span>
                </h1>
                <p className="editorial-hero__title-rail" aria-hidden="true">
                  {heroRailTaglines.join(" · ")}
                </p>
              </div>
            </div>

            <div className="editorial-hero__tagline-band editorial-hero__piece editorial-hero__piece--d4">
              <div className="editorial-hero__sellpoints" aria-label="核心賣點">
                {heroSells.map((sell) => (
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
                aria-label={site.tagline}
              >
                <span className="editorial-hero__tagline-line editorial-hero__tagline-line--1">
                  <span className="editorial-hero__tagline-whisper">Your</span>
                  <span className="editorial-hero__tagline-dot" aria-hidden="true">
                    ·
                  </span>
                  <span className="editorial-hero__tagline-em editorial-hero__tagline-em--skin">
                    Skin
                  </span>
                  <span className="editorial-hero__tagline-script editorial-hero__tagline-script--inline">
                    is Your
                  </span>
                </span>
                <span className="editorial-hero__tagline-line editorial-hero__tagline-line--2">
                  <span className="editorial-hero__tagline-display">Best</span>
                  <span className="editorial-hero__tagline-display editorial-hero__tagline-display--accent">
                    Accessory
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
                <span className="kzj-glass-btn__label">WhatsApp 預約量膚</span>
                <span className="kzj-glass-btn__icon" aria-hidden="true">
                  <IconArrowRight size={12} />
                </span>
              </WhatsAppCta>
              <p className="editorial-hero__action-links">
                <Link
                  href="/skin-analysis"
                  className="editorial-hero__text-link"
                  data-cta-id="cta_hero_skin_flow"
                >
                  了解量膚流程
                  <IconArrowRight size={13} />
                </Link>
                <span className="editorial-hero__action-sep" aria-hidden="true">
                  /
                </span>
                <InstagramCta
                  ctaId="cta_instagram_hero"
                  className="editorial-hero__text-link editorial-hero__text-link--plain"
                >
                  Instagram DM
                </InstagramCta>
              </p>
            </div>
          </div>
        </div>

        <div className="editorial-hero__marquee editorial-hero__piece editorial-hero__piece--d7">
          <nav className="editorial-hero__marquee-viewport" aria-label="快速導覽與專業認證">
            <div className="editorial-hero__marquee-track">
              {heroMarqueeLoop.map((item, index) =>
                item.kind === "link" ? (
                  <Link
                    key={`${item.key}-${index}`}
                    href={item.href}
                    data-cta-id={item.ctaId}
                    className="editorial-hero__marquee-item editorial-hero__marquee-item--link"
                  >
                    <span className="editorial-hero__marquee-num">{item.num}</span>
                    {item.label}
                  </Link>
                ) : (
                  <span
                    key={`${item.key}-${index}`}
                    className={`editorial-hero__marquee-item editorial-hero__marquee-item--cred${
                      item.highlight
                        ? ` editorial-hero__marquee-item--cred-${item.highlight}`
                        : ""
                    }`}
                  >
                    {item.highlight && (
                      <span className="editorial-hero__marquee-badge">
                        {item.highlight === "award" ? "得獎" : "儀器"}
                      </span>
                    )}
                    {item.label}
                  </span>
                ),
              )}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
