import {
  INNER_PAGE_IDS,
  INNER_PAGE_REGISTRY,
  type InnerPageId,
  type PageHeroDefaults,
} from "@/data/inner-pages";
import type { ContentPanel } from "@/data/page-content";
import {
  getSiteSettingsData,
  type InnerPageOverride,
  type InnerPagesConfig,
  type PagePanelsConfig,
} from "@/lib/cms/site";

export type ResolvedPageHero = PageHeroDefaults;

export type ResolvedInnerPage = {
  id: InnerPageId;
  label: string;
  path: string;
  hero: ResolvedPageHero;
  panels: ContentPanel[];
};

export type AdminInnerPagePanel = ContentPanel & {
  enabled: boolean;
  isCustom: boolean;
};

export type AdminInnerPage = Omit<ResolvedInnerPage, "panels"> & {
  panels: AdminInnerPagePanel[];
};

function pickHero(
  defaults: PageHeroDefaults,
  override?: InnerPageOverride["hero"],
): ResolvedPageHero {
  const merged: ResolvedPageHero = { ...defaults };
  if (!override) return merged;

  for (const key of [
    "watermark",
    "eyebrow",
    "title",
    "lead",
    "leadHighlight",
    "metaTitle",
    "metaDescription",
    "ctaLabel",
    "ctaHref",
    "ctaId",
    "whatsappMessageKey",
    "imageSrc",
    "imageAlt",
  ] as const) {
    const value = override[key];
    if (typeof value === "string" && value.trim()) {
      merged[key] = value.trim() as never;
    }
  }

  if (override.ctaKind) {
    merged.ctaKind = override.ctaKind;
  }

  return merged;
}

function parseListInput(raw?: string): string[] | undefined {
  if (!raw) return undefined;
  const items = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return items.length > 0 ? items : undefined;
}

function normalizePanelOrder(order: string[] | undefined, defaults: ContentPanel[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const raw of order ?? defaults.map((p) => p.id)) {
    if (!raw || seen.has(raw)) continue;
    seen.add(raw);
    result.push(raw);
  }

  for (const panel of defaults) {
    if (!seen.has(panel.id)) {
      seen.add(panel.id);
      result.push(panel.id);
    }
  }

  return result;
}

function mergePanels(
  defaults: ContentPanel[],
  config?: PagePanelsConfig,
): ContentPanel[] {
  const items = config?.items ?? {};
  const defaultById = Object.fromEntries(defaults.map((p) => [p.id, p])) as Record<
    string,
    ContentPanel
  >;
  const order = normalizePanelOrder(config?.order, defaults);

  const panels: ContentPanel[] = [];

  for (const id of order) {
    const saved = items[id];
    if (saved?.enabled === false) continue;

    const base = defaultById[id];
    const isCustom = !base;

    if (isCustom && !saved?.title?.trim()) continue;

    const title = saved?.title?.trim() || base?.title || "";
    const body = saved?.body?.trim() || base?.body;
    const list =
      saved?.list && saved.list.length > 0
        ? saved.list
        : base?.list
          ? [...base.list]
          : undefined;

    if (!title) continue;

    panels.push({
      id,
      title,
      body,
      list,
    });
  }

  return panels;
}

function mergePanelsForAdmin(
  defaults: ContentPanel[],
  config?: PagePanelsConfig,
): AdminInnerPagePanel[] {
  const items = config?.items ?? {};
  const defaultById = Object.fromEntries(defaults.map((p) => [p.id, p])) as Record<
    string,
    ContentPanel
  >;
  const order = [...normalizePanelOrder(config?.order, defaults)];

  for (const id of Object.keys(items)) {
    if (!order.includes(id)) order.push(id);
  }

  const rows: AdminInnerPagePanel[] = [];

  for (const id of order) {
    const saved = items[id];
    const base = defaultById[id];
    const isCustom = !base;

    if (isCustom && !saved?.title?.trim() && !base) {
      if (!saved) continue;
    }

    const title = saved?.title?.trim() || base?.title || "";
    if (!title && isCustom) continue;

    const body = saved?.body?.trim() || base?.body;
    const list =
      saved?.list && saved.list.length > 0
        ? saved.list
        : base?.list
          ? [...base.list]
          : undefined;

    rows.push({
      id,
      title,
      body,
      list,
      enabled: saved?.enabled !== false,
      isCustom,
    });
  }

  return rows;
}

function mergeInnerPageAdmin(
  pageId: InnerPageId,
  override?: InnerPageOverride | null,
): AdminInnerPage {
  const def = INNER_PAGE_REGISTRY[pageId];
  return {
    id: pageId,
    label: def.label,
    path: def.path,
    hero: pickHero(def.defaultHero, override?.hero),
    panels: mergePanelsForAdmin(def.defaultPanels, override?.panels),
  };
}

export function mergeInnerPage(
  pageId: InnerPageId,
  override?: InnerPageOverride | null,
): ResolvedInnerPage {
  const def = INNER_PAGE_REGISTRY[pageId];
  return {
    id: pageId,
    label: def.label,
    path: def.path,
    hero: pickHero(def.defaultHero, override?.hero),
    panels: mergePanels(def.defaultPanels, override?.panels),
  };
}

export function mergeAllInnerPages(config?: InnerPagesConfig | null): ResolvedInnerPage[] {
  const pages = config?.pages ?? {};
  return INNER_PAGE_IDS.map((id) => mergeInnerPage(id, pages[id]));
}

export async function getInnerPage(pageId: InnerPageId): Promise<ResolvedInnerPage> {
  const settings = await getSiteSettingsData();
  return mergeInnerPage(pageId, settings?.innerPages?.pages?.[pageId]);
}

export async function getAllInnerPages(): Promise<ResolvedInnerPage[]> {
  const settings = await getSiteSettingsData();
  return mergeAllInnerPages(settings?.innerPages);
}

export async function getAllInnerPagesForAdmin(): Promise<AdminInnerPage[]> {
  const settings = await getSiteSettingsData();
  const pages = settings?.innerPages?.pages ?? {};
  return INNER_PAGE_IDS.map((id) => mergeInnerPageAdmin(id, pages[id]));
}

export async function getInnerPageMetadata(pageId: InnerPageId) {
  const page = await getInnerPage(pageId);
  const def = INNER_PAGE_REGISTRY[pageId];
  return {
    title: page.hero.metaTitle || page.hero.title,
    description: page.hero.metaDescription || def.defaultHero.metaDescription || page.hero.lead,
    path: def.path,
  };
}

export function innerPageHasOverrides(pageId: InnerPageId, settings: Awaited<ReturnType<typeof getSiteSettingsData>>) {
  return Boolean(settings?.innerPages?.pages?.[pageId]);
}

export function homeSectionsHasOverrides(settings: Awaited<ReturnType<typeof getSiteSettingsData>>) {
  return Boolean(settings?.homeSections);
}

export { parseListInput };
