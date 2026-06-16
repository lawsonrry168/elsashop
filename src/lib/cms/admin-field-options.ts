import { defaultHeroContent } from "@/data/hero";
import { journalPosts } from "@/data/journal";
import { treatments } from "@/data/treatments";
import { navItems } from "@/data/site";

export type CmsSelectOption = {
  value: string;
  label: string;
  group?: string;
};

/** Hero marquee 編號 */
export const CMS_NAV_NUMBERS: CmsSelectOption[] = [
  { value: "01", label: "01" },
  { value: "02", label: "02" },
  { value: "03", label: "03" },
  { value: "04", label: "04" },
];

/** 導覽／連結標籤預設 */
export const CMS_NAV_LABELS: CmsSelectOption[] = uniqueOptions([
  ...defaultHeroContent.marqueeLinks.map((l) => ({
    value: l.label,
    label: l.label,
  })),
  ...navItems.map((item) => ({ value: item.label, label: item.label })),
  { value: "預約", label: "預約" },
  { value: "關於我們", label: "關於我們" },
]);

/** 次要 CTA 文案 */
export const CMS_SECONDARY_LINK_LABELS: CmsSelectOption[] = uniqueOptions([
  { value: defaultHeroContent.secondaryLinkLabel, label: defaultHeroContent.secondaryLinkLabel },
  { value: "了解量膚流程", label: "了解量膚流程" },
  { value: "瀏覽療程", label: "瀏覽療程" },
  { value: "預約諮詢", label: "預約諮詢" },
  { value: "常見問題", label: "常見問題" },
]);

/** 醫美知識分類 */
export const CMS_JOURNAL_CATEGORIES: CmsSelectOption[] = uniqueOptions(
  Array.from(new Set(journalPosts.map((p) => p.category))).map((c) => ({
    value: c,
    label: c,
  })),
);

/** 療程分類 */
export const CMS_TREATMENT_CATEGORIES: CmsSelectOption[] = uniqueOptions(
  Array.from(new Set(treatments.map((t) => t.category))).map((c) => ({
    value: c,
    label: c,
  })),
);

function uniqueOptions(items: CmsSelectOption[]): CmsSelectOption[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item.value.trim() || seen.has(item.value)) return false;
    seen.add(item.value);
    return true;
  });
}

export function optionValueInList(value: string, options: CmsSelectOption[]) {
  return options.some((o) => o.value === value);
}
