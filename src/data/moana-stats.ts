import type { PetalStat } from "@/components/EditorialPetalStats";

export const moanaPetalStats: PetalStat[] = [
  {
    corner: "tl",
    caption: "量膚定制",
    value: "1:1",
    label: "專人膚況分析",
    href: "/skin-analysis",
    ctaId: "cta_petal_skin",
  },
  {
    corner: "tr",
    caption: "單次收費",
    value: "0",
    label: "硬銷套票",
    href: "/book",
    ctaId: "cta_petal_booking",
  },
  {
    corner: "bl",
    caption: "專業認證",
    value: "金獎",
    label: "IBDR · ITEC",
    href: "/about",
    ctaId: "cta_petal_about",
  },
  {
    corner: "br",
    caption: "屯門地舖",
    value: "12h",
    label: "09:00 – 21:00",
    href: "/book",
    ctaId: "cta_petal_hours",
  },
];

export const moanaPetalIntro =
  "先量膚、再建議；明碼單次收費，絕無硬銷。國際認證背書，屯門地舖每日為您開放。";
