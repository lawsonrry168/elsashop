import Link from "next/link";
import { IconArrowRight } from "@/components/icons/KzIconsServer";
import { sitePages } from "@/data/site";

export function HomePageHub() {
  return (
    <section className="moana-home__wide moana-home__wide--bordered" aria-labelledby="home-hub-title">
      <div className="container-kz">
        <div className="moana-home__section-head">
          <div>
            <p className="moana-section-label">
              <span className="moana-section-label__rule" aria-hidden />
              Explore
            </p>
            <h2 id="home-hub-title" className="moana-home__section-title">
              探索全站
            </h2>
            <p className="moana-home__section-desc">
              療程、量膚、知識、痛症理療 — 你想了解嘅，都喺呢度。
            </p>
          </div>
        </div>

        <nav className="moana-hub-grid" aria-label="全站主要頁面">
          {sitePages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="moana-hub-card moana-panel moana-panel--card group no-underline"
              data-cta-id={`cta_home_hub_${page.href.replace(/\//g, "") || "home"}`}
            >
              <p className="moana-hub-card__eyebrow">{page.eyebrow}</p>
              <h3 className="moana-hub-card__title">{page.label}</h3>
              <p className="moana-hub-card__desc">{page.desc}</p>
              <span className="moana-hub-card__cta moana-pill-btn moana-pill-btn--ghost">
                前往
                <IconArrowRight size={14} />
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
