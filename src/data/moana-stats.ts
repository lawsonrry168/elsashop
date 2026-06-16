import type { PetalStat } from "@/components/EditorialPetalStats";

export const moanaPetalStats: PetalStat[] = [
  {
    corner: "tl",
    caption: "量膚定制",
    value: "1:1",
    label: "儀器分析 · 專人問診",
    detail: "先了解膚況，再建議療程",
    href: "/skin-analysis",
    ctaId: "cta_petal_skin",
  },
  {
    corner: "tr",
    caption: "單次收費",
    value: "0",
    label: "硬銷套票",
    detail: "明碼實價 · 唔綁票",
    href: "/book",
    ctaId: "cta_petal_booking",
  },
  {
    corner: "bl",
    caption: "專業認證",
    value: "金獎",
    label: "IBDR 2025 · ITEC LV4",
    detail: "姊妹美容優秀專業院",
    href: "/about",
    ctaId: "cta_petal_about",
  },
  {
    corner: "br",
    caption: "屯門地舖",
    value: "12h",
    label: "09:00 – 21:00",
    detail: "紅橋菁菱徑 · 全年無休",
    href: "/book",
    ctaId: "cta_petal_hours",
  },
];

export const moanaPetalIntro = [
  "屯門溫馨美容一人工作室。先做專屬膚況分析，再為你度身建議——皮膚管理、激光祛斑、膠原提升、痛症理療，療程資訊清晰易讀。",
  "明碼單次收費，唔會硬銷套裝；持 IBDR 面部護理金獎及 ITEC 國際資格。屯門地舖每日開放，WhatsApp 預約即可到訪。",
];

export const moanaPetalHighlights = [
  "量膚後才建議，唔 push 套裝",
  "單次收費或諮詢報價，透明安心",
  "IBDR 2025 金獎 · ITEC LV4 激光",
  "屯門紅橋地舖 · 全年 09:00–21:00",
] as const;
