import Link from "next/link";
import { relatedPagesByPath } from "@/data/page-content";

type Props = {
  path: keyof typeof relatedPagesByPath;
  title?: string;
};

export function RelatedPageLinks({
  path,
  title = "你可能都想睇",
}: Props) {
  const links = relatedPagesByPath[path];
  if (!links?.length) return null;

  return (
    <nav className="moana-related" aria-label={title}>
      <p className="moana-section-label">
        <span className="moana-section-label__rule" aria-hidden />
        More
      </p>
      <h2 className="moana-related__title">{title}</h2>
      <ul className="moana-related__list">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="moana-pill-btn moana-pill-btn--ghost"
              data-cta-id={`cta_related_${path.replace(/\//g, "")}_${link.href.replace(/\//g, "")}`}
            >
              {link.label}
              <span aria-hidden>→</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
