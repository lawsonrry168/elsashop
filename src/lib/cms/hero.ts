import { defaultHeroContent, type HeroContent, type HeroMarqueeCred } from "@/data/hero";
import { getSiteSettingsData, type HeroOverrides } from "@/lib/cms/site";

function pickLine(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed || fallback;
}

function pickCredHighlight(
  value: string | undefined,
  fallback: HeroMarqueeCred["highlight"],
): HeroMarqueeCred["highlight"] {
  if (value === "award" || value === "device") return value;
  if (value === "none") return null;
  return fallback;
}

function mergeHeroSlides(overrides?: HeroOverrides | null): HeroContent["slides"] {
  const fromSlides = overrides?.slides
    ?.map((slide) => ({
      src: slide.image?.trim() ?? "",
      alt: slide.imageAlt?.trim() ?? "",
    }))
    .filter((slide) => slide.src);

  if (fromSlides?.length) {
    return fromSlides.map((slide, index) => ({
      src: slide.src,
      alt: pickLine(slide.alt, defaultHeroContent.slides[index]?.alt ?? defaultHeroContent.imageAlt),
    }));
  }

  if (overrides?.image?.trim()) {
    return [
      {
        src: overrides.image.trim(),
        alt: pickLine(overrides.imageAlt, defaultHeroContent.imageAlt),
      },
    ];
  }

  return defaultHeroContent.slides.map((slide) => ({ ...slide }));
}

export function mergeHeroContent(overrides?: HeroOverrides | null): HeroContent {
  if (!overrides) return defaultHeroContent;

  const slides = mergeHeroSlides(overrides);

  return {
    slides,
    image: slides[0]?.src ?? defaultHeroContent.image,
    imageAlt: slides[0]?.alt ?? defaultHeroContent.imageAlt,
    watermark: pickLine(overrides.watermark, defaultHeroContent.watermark),
    kicker: pickLine(overrides.kicker, defaultHeroContent.kicker),
    titleLines: [
      pickLine(overrides.titleLine1, defaultHeroContent.titleLines[0]),
      pickLine(overrides.titleLine2, defaultHeroContent.titleLines[1]),
      pickLine(overrides.titleLine3, defaultHeroContent.titleLines[2]),
    ],
    railTaglines: [
      pickLine(overrides.railTagline1, defaultHeroContent.railTaglines[0]),
      pickLine(overrides.railTagline2, defaultHeroContent.railTaglines[1]),
      pickLine(overrides.railTagline3, defaultHeroContent.railTaglines[2]),
    ],
    sellBadges: [
      {
        ...defaultHeroContent.sellBadges[0],
        label: pickLine(overrides.sellLabel1, defaultHeroContent.sellBadges[0].label),
      },
      {
        ...defaultHeroContent.sellBadges[1],
        label: pickLine(overrides.sellLabel2, defaultHeroContent.sellBadges[1].label),
      },
      {
        ...defaultHeroContent.sellBadges[2],
        label: pickLine(overrides.sellLabel3, defaultHeroContent.sellBadges[2].label),
      },
    ],
    tagline: {
      ariaLabel: pickLine(overrides.taglineAria, defaultHeroContent.tagline.ariaLabel),
      line1Whisper: pickLine(
        overrides.taglineLine1Whisper,
        defaultHeroContent.tagline.line1Whisper,
      ),
      line1Em: pickLine(overrides.taglineLine1Em, defaultHeroContent.tagline.line1Em),
      line1Script: pickLine(
        overrides.taglineLine1Script,
        defaultHeroContent.tagline.line1Script,
      ),
      line2Primary: pickLine(
        overrides.taglineLine2Primary,
        defaultHeroContent.tagline.line2Primary,
      ),
      line2Accent: pickLine(
        overrides.taglineLine2Accent,
        defaultHeroContent.tagline.line2Accent,
      ),
    },
    whatsappLabel: pickLine(overrides.whatsappLabel, defaultHeroContent.whatsappLabel),
    secondaryLinkLabel: pickLine(
      overrides.secondaryLinkLabel,
      defaultHeroContent.secondaryLinkLabel,
    ),
    secondaryLinkHref: pickLine(
      overrides.secondaryLinkHref,
      defaultHeroContent.secondaryLinkHref,
    ),
    instagramLabel: pickLine(overrides.instagramLabel, defaultHeroContent.instagramLabel),
    marqueeLinks: [
      {
        ...defaultHeroContent.marqueeLinks[0],
        num: pickLine(overrides.navNum1, defaultHeroContent.marqueeLinks[0].num),
        label: pickLine(overrides.navLabel1, defaultHeroContent.marqueeLinks[0].label),
        href: pickLine(overrides.navHref1, defaultHeroContent.marqueeLinks[0].href),
      },
      {
        ...defaultHeroContent.marqueeLinks[1],
        num: pickLine(overrides.navNum2, defaultHeroContent.marqueeLinks[1].num),
        label: pickLine(overrides.navLabel2, defaultHeroContent.marqueeLinks[1].label),
        href: pickLine(overrides.navHref2, defaultHeroContent.marqueeLinks[1].href),
      },
      {
        ...defaultHeroContent.marqueeLinks[2],
        num: pickLine(overrides.navNum3, defaultHeroContent.marqueeLinks[2].num),
        label: pickLine(overrides.navLabel3, defaultHeroContent.marqueeLinks[2].label),
        href: pickLine(overrides.navHref3, defaultHeroContent.marqueeLinks[2].href),
      },
      {
        ...defaultHeroContent.marqueeLinks[3],
        num: pickLine(overrides.navNum4, defaultHeroContent.marqueeLinks[3].num),
        label: pickLine(overrides.navLabel4, defaultHeroContent.marqueeLinks[3].label),
        href: pickLine(overrides.navHref4, defaultHeroContent.marqueeLinks[3].href),
      },
    ],
    marqueeCreds: [
      {
        label: pickLine(overrides.credLabel1, defaultHeroContent.marqueeCreds[0].label),
        highlight: pickCredHighlight(
          overrides.credBadge1,
          defaultHeroContent.marqueeCreds[0].highlight,
        ),
      },
      {
        label: pickLine(overrides.credLabel2, defaultHeroContent.marqueeCreds[1].label),
        highlight: pickCredHighlight(
          overrides.credBadge2,
          defaultHeroContent.marqueeCreds[1].highlight,
        ),
      },
      {
        label: pickLine(overrides.credLabel3, defaultHeroContent.marqueeCreds[2].label),
        highlight: pickCredHighlight(
          overrides.credBadge3,
          defaultHeroContent.marqueeCreds[2].highlight,
        ),
      },
    ],
  };
}

export async function getHeroContent(): Promise<HeroContent> {
  const settings = await getSiteSettingsData();
  return mergeHeroContent(settings?.hero);
}
