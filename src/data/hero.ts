import { heroRailTaglines, images } from "@/data/images";
import { site } from "@/data/site";

export type HeroSellVariant = "pink" | "sage" | "neutral";

export type HeroSellBadge = {
  id: string;
  label: string;
  variant: HeroSellVariant;
};

export type HeroTaglineArt = {
  ariaLabel: string;
  line1Whisper: string;
  line1Em: string;
  line1Script: string;
  line2Primary: string;
  line2Accent: string;
};

export type HeroMarqueeLink = {
  num: string;
  label: string;
  href: string;
  ctaId: string;
};

export type HeroMarqueeCred = {
  label: string;
  highlight: "award" | "device" | null;
};

export type HeroSlide = {
  src: string;
  alt: string;
};

export const HERO_MAX_SLIDES = 5;

export type HeroContent = {
  /** 輪播主圖（至少一張） */
  slides: HeroSlide[];
  /** 第一張主圖（相容舊欄位） */
  image: string;
  imageAlt: string;
  watermark: string;
  kicker: string;
  titleLines: [string, string, string];
  railTaglines: [string, string, string];
  sellBadges: [HeroSellBadge, HeroSellBadge, HeroSellBadge];
  tagline: HeroTaglineArt;
  whatsappLabel: string;
  secondaryLinkLabel: string;
  secondaryLinkHref: string;
  instagramLabel: string;
  marqueeLinks: [HeroMarqueeLink, HeroMarqueeLink, HeroMarqueeLink, HeroMarqueeLink];
  marqueeCreds: [HeroMarqueeCred, HeroMarqueeCred, HeroMarqueeCred];
};

export type HeroMarqueeItem =
  | {
      kind: "link";
      key: string;
      num: string;
      label: string;
      href: string;
      ctaId: string;
    }
  | {
      kind: "cred";
      key: string;
      label: string;
      highlight: "award" | "device" | null;
    };

const defaultMarqueeLinks: HeroContent["marqueeLinks"] = [
  { num: "01", label: "療程目錄", href: "/treatments", ctaId: "cta_hero_index_treatments" },
  { num: "02", label: "量膚定制", href: "/skin-analysis", ctaId: "cta_hero_index_skin" },
  { num: "03", label: "痛症理療", href: "/wellness", ctaId: "cta_hero_index_wellness" },
  { num: "04", label: "醫美知識", href: "/journal", ctaId: "cta_hero_index_journal" },
];

const defaultMarqueeCreds: HeroContent["marqueeCreds"] = [
  { label: "IBDR 2025 金獎", highlight: "award" },
  { label: "ITEC LV4 激光", highlight: "device" },
  { label: "姊妹美容優秀", highlight: "award" },
];

const defaultTagline: HeroTaglineArt = {
  ariaLabel: site.tagline,
  line1Whisper: "Your",
  line1Em: "Skin",
  line1Script: "is Your",
  line2Primary: "Best",
  line2Accent: "Accessory",
};

const heroStorefrontSlide: HeroSlide = {
  src: "/videos/reels/posters/22.jpg",
  alt: "康姿健屯門地舖門面 — 女賓護理為主，痛症推拿只限女賓",
};

export const defaultHeroContent: HeroContent = {
  slides: [heroStorefrontSlide, { src: images.hero.main.src, alt: images.hero.main.alt }],
  image: heroStorefrontSlide.src,
  imageAlt: heroStorefrontSlide.alt,
  watermark: "SKIN",
  kicker: `${site.nameEn} · Bespoke Skincare`,
  titleLines: ["量膚", "定制", "更安心"],
  railTaglines: [...heroRailTaglines],
  sellBadges: [
    { id: "pricing", label: "單次收費", variant: "pink" },
    { id: "trust", label: "絕無硬銷", variant: "sage" },
    { id: "device", label: "醫美級儀器", variant: "neutral" },
  ],
  tagline: defaultTagline,
  whatsappLabel: "WhatsApp 預約量膚",
  secondaryLinkLabel: "了解量膚流程",
  secondaryLinkHref: "/skin-analysis",
  instagramLabel: "Instagram DM",
  marqueeLinks: defaultMarqueeLinks,
  marqueeCreds: defaultMarqueeCreds,
};

export function buildHeroMarqueeItems(content: HeroContent): HeroMarqueeItem[] {
  const links: HeroMarqueeItem[] = content.marqueeLinks.map((item) => ({
    kind: "link",
    key: item.href,
    num: item.num,
    label: item.label,
    href: item.href,
    ctaId: item.ctaId,
  }));

  const creds: HeroMarqueeItem[] = content.marqueeCreds
    .filter((item) => item.label.trim())
    .sort((a, b) => {
      const rank = (highlight: HeroMarqueeCred["highlight"]) => (highlight ? 0 : 1);
      return rank(a.highlight) - rank(b.highlight);
    })
    .map((item) => ({
      kind: "cred",
      key: item.label,
      label: item.label,
      highlight: item.highlight,
    }));

  return [...links, ...creds];
}
