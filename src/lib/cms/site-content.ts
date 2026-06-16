import type { PetalStat } from "@/components/EditorialPetalStats";
import {
  DEFAULT_ABOUT_CONTACT,
  DEFAULT_NARRATIVE_CHAPTERS,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_TRUST_CONTENT,
  DEFAULT_WELLNESS_SERVICES,
  DEFAULT_WELLNESS_TRADITIONAL,
  type NarrativeChapter,
  type ProcessStepItem,
  type TestimonialItem,
  type WellnessServiceContent,
} from "@/data/site-content";
import { getSiteSettingsData, type SiteContentSettings } from "@/lib/cms/site";

function pickString(value: string | undefined, fallback: string) {
  const v = value?.trim();
  return v || fallback;
}

function pickLines(raw: string | undefined, fallback: string[]) {
  if (!raw?.trim()) return fallback;
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines.length > 0 ? lines : fallback;
}

export async function getTrustContent() {
  const settings = await getSiteSettingsData();
  const t = settings?.content?.trust;
  const defaults = DEFAULT_TRUST_CONTENT;

  const petalStats: PetalStat[] = defaults.petalStats.map((stat, i) => {
    const o = t?.petalStats?.[i];
    if (!o) return stat;
    return {
      corner: stat.corner,
      caption: pickString(o.caption, stat.caption ?? ""),
      value: pickString(o.value, stat.value),
      label: pickString(o.label, stat.label),
      detail: pickString(o.detail, stat.detail ?? ""),
      href: pickString(o.href, stat.href ?? "/"),
      ctaId: pickString(o.ctaId, stat.ctaId ?? `cta_petal_${stat.corner}`),
    };
  });

  return {
    petalStats,
    petalIntro: [
      pickString(t?.petalIntro1, defaults.petalIntro[0] ?? ""),
      pickString(t?.petalIntro2, defaults.petalIntro[1] ?? ""),
    ],
    petalHighlights: t?.petalHighlights?.length
      ? t.petalHighlights.filter(Boolean)
      : [...defaults.petalHighlights],
  };
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const settings = await getSiteSettingsData();
  const cfg = settings?.content?.testimonials;
  const order = cfg?.order?.length ? cfg.order : DEFAULT_TESTIMONIALS.map((t) => t.id);
  const items = cfg?.items ?? {};
  const defaultById = Object.fromEntries(DEFAULT_TESTIMONIALS.map((t) => [t.id, t]));

  const result: TestimonialItem[] = [];
  for (const id of order) {
    const saved = items[id];
    if (saved?.enabled === false) continue;
    const base = defaultById[id];
    const quote = saved?.quote?.trim() || base?.quote;
    const author = saved?.author?.trim() || base?.author;
    if (!quote || !author) continue;
    result.push({
      id,
      quote,
      author,
      meta: saved?.meta?.trim() || base?.meta || "",
    });
  }
  return result;
}

export async function getProcessStepsContent() {
  const settings = await getSiteSettingsData();
  const p = settings?.content?.processSteps;
  const d = DEFAULT_PROCESS_STEPS;

  const steps: ProcessStepItem[] = d.steps.map((step, i) => {
    const o = p?.steps?.[i];
    if (!o) return step;
    return {
      num: pickString(o.num, step.num),
      title: pickString(o.title, step.title),
      desc: pickString(o.desc, step.desc),
    };
  });

  return {
    sectionLabel: pickString(p?.sectionLabel, d.sectionLabel),
    title: pickString(p?.title, d.title),
    steps,
  };
}

export async function getNarrativeChapters(): Promise<NarrativeChapter[]> {
  const settings = await getSiteSettingsData();
  const cfg = settings?.content?.narrativeChapters;
  const order = cfg?.order?.length ? cfg.order : DEFAULT_NARRATIVE_CHAPTERS.map((c) => c.id);
  const items = cfg?.items ?? {};
  const defaultById = Object.fromEntries(DEFAULT_NARRATIVE_CHAPTERS.map((c) => [c.id, c]));

  return order
    .map((id) => {
      const base = defaultById[id];
      const saved = items[id];
      if (saved?.enabled === false || !base) return null;
      return {
        id,
        label: pickString(saved?.label, base.label),
        title: pickString(saved?.title, base.title),
        body: saved?.body ? pickLines(saved.body, base.body) : base.body,
        image: pickString(saved?.image, base.image),
        imageAlt: pickString(saved?.imageAlt, base.imageAlt),
      };
    })
    .filter((c): c is NarrativeChapter => Boolean(c));
}

export async function getWellnessPageExtras() {
  const settings = await getSiteSettingsData();
  const w = settings?.content?.wellnessPage;
  const services: WellnessServiceContent[] = DEFAULT_WELLNESS_SERVICES.map((s) => {
    const o = w?.services?.[s.id];
    if (!o) return s;
    return {
      id: s.id,
      title: pickString(o.title, s.title),
      body: o.body ? pickLines(o.body, s.body) : s.body,
      image: pickString(o.image, s.image),
      imageAlt: pickString(o.imageAlt, s.imageAlt),
    };
  });

  const trad = DEFAULT_WELLNESS_TRADITIONAL;
  return {
    services,
    traditional: {
      sectionLabel: pickString(w?.traditionalSectionLabel, trad.sectionLabel),
      title: pickString(w?.traditionalTitle, trad.title),
      items: w?.traditionalItems?.length ? w.traditionalItems : [...trad.items],
      footerNote: pickString(w?.traditionalFooter, trad.footerNote),
    },
  };
}

export async function getAboutContactContent() {
  const settings = await getSiteSettingsData();
  const c = settings?.content?.aboutContact;
  return {
    title: pickString(c?.title, DEFAULT_ABOUT_CONTACT.title),
  };
}

export function hasContentOverrides(content?: SiteContentSettings | null): boolean {
  if (!content) return false;
  return Boolean(
    content.trust ||
      content.testimonials ||
      content.processSteps ||
      content.narrativeChapters ||
      content.wellnessPage ||
      content.aboutContact,
  );
}
