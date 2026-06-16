import type { HomeSectionContent, HomeSectionId } from "@/data/home-sections";
import { HOME_SECTION_REGISTRY } from "@/data/home-sections";

export function SectionBodyText({
  body,
  highlight,
  className = "moana-home__chapter-text moana-home__chapter-text--single",
}: {
  body?: string;
  highlight?: string;
  className?: string;
}) {
  if (!body && !highlight) return null;
  return (
    <p className={className}>
      {body}
      {highlight ? <strong className="text-kz-brand-pink">{highlight}</strong> : null}
    </p>
  );
}

export type SectionContentProps = {
  content?: HomeSectionContent;
};

export function resolveSectionContent(
  id: HomeSectionId,
  content?: HomeSectionContent,
): HomeSectionContent {
  const merged: HomeSectionContent = { ...HOME_SECTION_REGISTRY[id].defaults };
  if (!content) return merged;
  for (const [key, value] of Object.entries(content)) {
    if (typeof value === "string" && value.trim()) {
      (merged as Record<string, string>)[key] = value.trim();
    }
  }
  return merged;
}
