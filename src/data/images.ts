import { promo } from "./promo-images";
import { social } from "./social-images";
import { site } from "./site";

export type SiteImage = {
  src: string;
  alt: string;
  caption?: string;
};

/** Promo graphic + caption aligned to on-image copy (not generic site slogans). */
function promoImage(
  item: { src: string; alt: string },
  caption: string,
): SiteImage {
  return { ...item, caption };
}

export const images = {
  hero: {
    main: {
      ...promo.heroWelcome,
      alt: `${site.name}歡迎您的蒞臨 — ${site.subtitle}`,
    },
    treatment: promo.plaser,
    facial: promo.tegoder,
  },
  studio: {
    interior: promoImage(promo.meTimeSpa, "專注享受 60 分鐘寧靜 Me Time"),
    brandPoster: {
      ...promo.heroShop,
      alt: `${site.nameEn} ${site.name} — ${site.subtitle}`,
    },
    care: promoImage(promo.sensitiveRepair, "脆弱肌修護方案"),
  },
  treatments: {
    device: promo.plaser,
    peel: promo.tegoder,
  },
  brand: {
    logo: "/brand/kzj-icon.png",
    icon: "/brand/kzj-icon.png",
    logoBanner: "/brand/hck-logo-banner.svg",
    logoWhite: "/brand/hck-logo-banner-white.svg",
  },
} as const;

export const verticalTaglines = [
  "量膚定制",
  "單次收費",
  "絕無硬銷",
] as const;

/** Hero 標題 rail / 手機 masthead — 與浮動 pill 錯開，突出專業背書 */
export const heroRailTaglines = [
  "西班牙果酸",
  "IBDR 金獎",
  "屯門地舖",
] as const;

export const narrativeChapters = [
  {
    id: "intro",
    label: "01 — About",
    title: "你的皮膚，是你最好的配飾",
    body: [
      "康姿健是屯門一間韓系皮膚管理工作室。我們相信，護膚不應該從推銷套裝開始，而應該從了解你的膚質開始。",
      "醫美級儀器、西班牙醫學級果酸、等離子與微針射頻 — 全部以單次收費方式提供，你決定做或不做。",
    ],
    image: promoImage(promo.bioskinCert, "BIOSKIN 2026 原廠供應證明"),
  },
  {
    id: "promise",
    label: "02 — Promise",
    title: "先量膚，再建議",
    body: [
      "每位客人的膚質、生活習慣與困擾都不同。我們堅持先進行專業量膚分析，再建議最適合的療程 — 不硬銷、不綁套票。",
      "部分療程明碼單次價，部分需量膚後報價。價格透明，讓你在安心之下做決定。",
    ],
    image: promoImage(promo.sensitiveRepair, "脆弱肌修護方案"),
  },
  {
    id: "space",
    label: "03 — Space",
    title: "一人小店的私密節奏",
    body: [
      "沒有連鎖店的喧囂，只有專注於你的護理節奏。環境舒服、資訊清晰，像翻開一本關於自己肌膚的雜誌。",
    ],
    image: promoImage(promo.meTime, "享受 Me Time 無壓力美容"),
  },
] as const;

export { social };
