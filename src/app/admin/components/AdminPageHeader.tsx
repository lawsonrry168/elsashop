import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  lead?: string;
  previewHref?: string;
  previewLabel?: string;
  guideHref?: string;
  children?: ReactNode;
};

export function AdminPageHeader({
  title,
  lead,
  previewHref,
  previewLabel = "預覽前台",
  guideHref,
  children,
}: Props) {
  return (
    <header className="kz-admin__header">
      <div className="kz-admin__header-main">
        <h1 className="kz-admin__title">{title}</h1>
        {lead ? <p className="kz-admin__subtitle">{lead}</p> : null}
        {(previewHref || guideHref) && (
          <div className="kz-admin__header-links">
            {previewHref ? (
              <Link
                href={previewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="kz-admin__header-link"
              >
                {previewLabel} ↗
              </Link>
            ) : null}
            {guideHref ? (
              <Link href={guideHref} className="kz-admin__header-link kz-admin__header-link--muted">
                使用說明
              </Link>
            ) : null}
          </div>
        )}
      </div>
      {children ? <div className="kz-admin__header-actions">{children}</div> : null}
    </header>
  );
}
