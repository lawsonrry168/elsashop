import Link from "next/link";
import { EditorialImage } from "@/components/EditorialImage";
import { IconArrowRight } from "@/components/icons/KzIconsServer";
import { SectionBodyText, resolveSectionContent, type SectionContentProps } from "@/components/home/section-content";

export function FeaturedTreatmentTeaser({ content }: SectionContentProps) {
  const c = resolveSectionContent("featured-treatment", content);
  return (
    <section className="moana-home__chapter moana-home__chapter--split moana-home__chapter--reverse">
      {c.image ? (
        <EditorialImage
          src={c.image}
          alt={c.imageAlt ?? ""}
          caption={c.imageAlt}
          aspect="promo"
          posterSize="sm"
        />
      ) : null}
      <div className="moana-home__chapter-body">
        {c.eyebrow ? (
          <p className="moana-section-label">
            <span className="moana-section-label__rule" aria-hidden />
            {c.eyebrow}
          </p>
        ) : null}
        {c.title ? <h2 className="moana-home__chapter-title">{c.title}</h2> : null}
        <SectionBodyText body={c.body} highlight={c.highlight} />
        {c.linkLabel && c.linkHref ? (
          <p className="moana-home__link-row">
            <Link href={c.linkHref} className="moana-pill-btn">
              {c.linkLabel}
              <IconArrowRight size={14} />
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
