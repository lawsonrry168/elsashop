import type { PetalStat } from "@/components/EditorialPetalStats";
import {
  moanaPetalHighlights,
  moanaPetalIntro,
  moanaPetalStats,
} from "@/data/moana-stats";
import { narrativeChapters } from "@/data/images";
import { wellnessServices, traditionalTherapies } from "@/data/wellness";

export type TestimonialItem = {
  id: string;
  quote: string;
  author: string;
  meta: string;
};

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    quote: "量膚分析完才建議療程，自己決定做唔做。單次收費，心裡踏實好多。",
    author: "陳小姐",
    meta: "屯門 · 回訪客人",
  },
  {
    id: "t2",
    quote: "等離子抗痘做完毛孔細緻咗，環境安靜舒服，預約流程亦好清晰。",
    author: "李小姐",
    meta: "新界西 · Instagram 預約",
  },
  {
    id: "t3",
    quote: "TEGODER 果酸係量膚後先配，敏感肌都做得，專業又溫柔。",
    author: "Grace W.",
    meta: "屯門 · 果酸療程",
  },
];

export type ProcessStepItem = {
  num: string;
  title: string;
  desc: string;
};

export const DEFAULT_PROCESS_STEPS: {
  sectionLabel: string;
  title: string;
  steps: ProcessStepItem[];
} = {
  sectionLabel: "Skin Analysis",
  title: "量膚定制流程",
  steps: [
    { num: "01", title: "膚質分析", desc: "先幫你量膚，了解膚質同煩惱。" },
    { num: "02", title: "對症配方", desc: "跟住分析結果，建議啱嘅療程同配方。" },
    { num: "03", title: "單次療程", desc: "明碼或者諮詢報價，做唔做由你決定。" },
    { num: "04", title: "家居建議", desc: "有需要會俾家居護理貼士，延續效果。" },
  ],
};

export type NarrativeChapter = {
  id: string;
  label: string;
  title: string;
  body: string[];
  image: string;
  imageAlt: string;
};

export const DEFAULT_NARRATIVE_CHAPTERS: NarrativeChapter[] = narrativeChapters.map((ch) => ({
  id: ch.id,
  label: ch.label,
  title: ch.title,
  body: [...ch.body],
  image: ch.image.src,
  imageAlt: ch.image.alt,
}));

export type WellnessServiceContent = {
  id: string;
  title: string;
  body: string[];
  image: string;
  imageAlt: string;
};

export const DEFAULT_WELLNESS_SERVICES: WellnessServiceContent[] = wellnessServices.map((s) => ({
  id: s.id,
  title: s.title,
  body: [...s.body],
  image: s.image.src,
  imageAlt: s.image.alt,
}));

export const DEFAULT_WELLNESS_TRADITIONAL = {
  sectionLabel: "Traditional",
  title: "傳統痛症護理",
  items: [...traditionalTherapies] as string[],
  footerNote: "詳情及收費請透過 WhatsApp 或 IG 查詢",
};

export const DEFAULT_TRUST_CONTENT = {
  petalStats: moanaPetalStats as PetalStat[],
  petalIntro: [...moanaPetalIntro],
  petalHighlights: [...moanaPetalHighlights],
};

export const DEFAULT_ABOUT_CONTACT = {
  title: "聯絡我們",
};
