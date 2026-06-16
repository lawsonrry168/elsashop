import { journalPosts } from "@/data/journal";
import { treatments } from "@/data/treatments";
import { sitePages } from "@/data/site";
import type { CmsSelectOption } from "@/lib/cms/admin-field-options";
import { getAdminJournalPosts, getAdminTreatments } from "@/lib/cms/queries";

export function buildStaticPathOptions(): CmsSelectOption[] {
  const home: CmsSelectOption = { value: "/", label: "首頁", group: "主要頁面" };
  const pages = sitePages.map((p) => ({
    value: p.href,
    label: `${p.label}（${p.href}）`,
    group: "主要頁面" as const,
  }));
  return [home, ...pages];
}

export function buildDynamicPathOptions(
  treatmentRows: { slug: string; name: string }[],
  journalRows: { slug: string; title: string }[],
): CmsSelectOption[] {
  const treatmentOpts = treatmentRows.map((t) => ({
    value: `/treatments/${t.slug}`,
    label: `${t.name}（/treatments/${t.slug}）`,
    group: "療程詳情",
  }));
  const journalOpts = journalRows.map((j) => ({
    value: `/journal/${j.slug}`,
    label: `${j.title}（/journal/${j.slug}）`,
    group: "醫美知識文章",
  }));
  return [...buildStaticPathOptions(), ...treatmentOpts, ...journalOpts];
}

/** 後台表單用：靜態頁 + CMS／靜態療程與文章 */
export async function getCmsPathOptions(): Promise<CmsSelectOption[]> {
  const [cmsTreatments, cmsJournal] = await Promise.all([
    getAdminTreatments(),
    getAdminJournalPosts(),
  ]);

  const treatmentRows =
    cmsTreatments.length > 0
      ? cmsTreatments.map((r) => ({ slug: r.slug, name: r.name }))
      : treatments.map((t) => ({ slug: t.slug, name: t.name }));

  const journalRows =
    cmsJournal.length > 0
      ? cmsJournal.map((r) => ({ slug: r.slug, title: r.title }))
      : journalPosts.map((p) => ({ slug: p.slug, title: p.title }));

  return buildDynamicPathOptions(treatmentRows, journalRows);
}
