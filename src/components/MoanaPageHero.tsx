import type { ReactNode } from "react";

type Props = {
  watermark: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

export function MoanaPageHero({
  watermark,
  eyebrow,
  title,
  lead,
  children,
  className = "",
  variant = "light",
}: Props) {
  return (
    <header
      className={`moana-page-hero moana-page-hero--${variant} ${className}`.trim()}
    >
      <p className="moana-page-hero__watermark" aria-hidden="true">
        {watermark}
      </p>
      <div className="moana-page-hero__inner">
        <p className="moana-section-label">
          <span className="moana-section-label__rule" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="moana-page-hero__title">{title}</h1>
        {lead && <div className="moana-page-hero__lead">{lead}</div>}
        {children}
      </div>
    </header>
  );
}
