import type { ReactNode } from "react";
import { EditorialImage } from "@/components/EditorialImage";

type Props = {
  watermark: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function MoanaPageHero({
  watermark,
  eyebrow,
  title,
  lead,
  children,
  className = "",
  imageSrc,
  imageAlt,
}: Props) {
  const hasImage = Boolean(imageSrc && imageAlt);

  return (
    <header
      className={`moana-page-hero${hasImage ? " moana-page-hero--split" : ""} ${className}`.trim()}
    >
      <p className="moana-page-hero__watermark" aria-hidden="true">
        {watermark}
      </p>
      <div className="moana-page-hero__layout">
        <div className="moana-page-hero__inner">
          <p className="moana-section-label">
            <span className="moana-section-label__rule" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="moana-page-hero__title">{title}</h1>
          {lead && <div className="moana-page-hero__lead">{lead}</div>}
          {children}
        </div>

        {hasImage && (
          <div className="moana-page-hero__media">
            <EditorialImage
              src={imageSrc!}
              alt={imageAlt!}
              aspect="promo"
              posterSize="md"
              bleed
              sizes="(max-width: 767px) 92vw, 320px"
            />
          </div>
        )}
      </div>
    </header>
  );
}
