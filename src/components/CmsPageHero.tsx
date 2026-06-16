import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { MoanaPageHero } from "@/components/MoanaPageHero";
import { HeroLeadText } from "@/components/HeroLeadText";
import { WhatsAppCta } from "@/components/conversion/CtaLinks";
import type { ResolvedPageHero } from "@/lib/cms/inner-pages";
import { whatsappMessages } from "@/lib/whatsapp-messages";

type Props = {
  hero: ResolvedPageHero;
};

function resolveWhatsappMessage(key?: ResolvedPageHero["whatsappMessageKey"]) {
  if (key === "skinAnalysis") return whatsappMessages.skinAnalysis;
  if (key === "wellness") return whatsappMessages.wellness;
  return whatsappMessages.default;
}

export function CmsPageHero({ hero }: Props) {
  return (
    <MoanaPageHero
      watermark={hero.watermark}
      eyebrow={hero.eyebrow}
      title={hero.title}
      lead={<HeroLeadText lead={hero.lead} leadHighlight={hero.leadHighlight} />}
    >
      {hero.ctaKind === "logo" ? (
        <BrandLogo className="brand-logo--about moana-page-hero__logo" />
      ) : hero.ctaKind === "whatsapp" && hero.ctaLabel ? (
        <WhatsAppCta
          ctaId={hero.ctaId ?? "cta_whatsapp_page_hero"}
          message={resolveWhatsappMessage(hero.whatsappMessageKey)}
          className="moana-pill-btn moana-pill-btn--dark"
        >
          {hero.ctaLabel}
          <span aria-hidden>→</span>
        </WhatsAppCta>
      ) : hero.ctaKind === "link" && hero.ctaLabel && hero.ctaHref ? (
        <Link
          href={hero.ctaHref}
          className="moana-pill-btn moana-pill-btn--dark"
          data-cta-id={hero.ctaId}
        >
          {hero.ctaLabel}
          <span aria-hidden>→</span>
        </Link>
      ) : null}
    </MoanaPageHero>
  );
}
