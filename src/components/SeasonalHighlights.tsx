import Link from "next/link";
import { PromoPoster } from "@/components/PromoPoster";
import { IconArrowRight } from "@/components/icons/KzIconsServer";
import { journalPosts } from "@/data/journal";
import { promo } from "@/data/promo-images";

function journalHref(keyword: string, fallback = "/journal") {
  const post = journalPosts.find(
    (p) => p.title.includes(keyword) || p.excerpt.includes(keyword),
  );
  return post ? `/journal/${post.slug}` : fallback;
}

const seasonalItems = [
  {
    ...promo.seasonal,
    href: journalHref("轉季", "/journal"),
    tag: "轉季貼士",
  },
  {
    ...promo.winterSkincare,
    href: journalHref("寒流", "/journal"),
    tag: "秋冬保濕",
  },
  {
    ...promo.eventPrep,
    href: "/skin-analysis",
    tag: "重要日子",
  },
  {
    ...promo.brandOpening,
    href: "/book",
    tag: "開工大吉",
  },
  {
    ...promo.cnyPrep,
    href: "/treatments/tegoder-peel",
    tag: "過年前護理",
  },
  {
    ...promo.holidayGreeting,
    href: "/book",
    tag: "節日問候",
  },
] as const;

export function SeasonalHighlights() {
  return (
    <section className="moana-home__wide moana-home__wide--bordered py-16 md:py-24">
      <div className="container-kz">
        <div className="moana-home__section-head">
          <div>
            <p className="moana-section-label">
              <span className="moana-section-label__rule" aria-hidden />
              Seasonal
            </p>
            <h2 className="moana-home__section-title">季節護膚 · 節日精選</h2>
            <p className="moana-home__section-desc">
              轉季、秋冬、重要日子前 — 海報上的貼士，都可以在這裡找到對應護理。
            </p>
          </div>
          <Link href="/journal" className="moana-pill-btn moana-pill-btn--ghost">
            更多貼士
            <IconArrowRight size={14} />
          </Link>
        </div>

        <ul className="moana-seasonal-grid" role="list">
          {seasonalItems.map((item) => (
            <li key={item.tag} className="moana-seasonal-grid__item">
              <Link href={item.href} className="moana-seasonal-grid__link group">
                <PromoPoster
                  src={item.src}
                  alt={item.alt}
                  size="sm"
                  className="moana-seasonal-grid__poster"
                  sizes="(max-width: 640px) 46vw, 180px"
                />
                <span className="moana-seasonal-grid__tag font-ui">{item.tag}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
