import Link from "next/link";
import { PromoPoster } from "@/components/PromoPoster";
import { IconArrowRight } from "@/components/icons/KzIconsServer";
import { promo } from "@/data/promo-images";

const collazenItems = [
  {
    ...promo.collazenAlt,
    href: "/treatments/collazen",
    label: "A to Z 膠原小旋風",
  },
  {
    ...promo.collazenHifuRf,
    href: "/treatments/hifu",
    label: "HIFU RF 增效",
  },
  {
    ...promo.collazenTriple,
    href: "/treatments/collazen",
    label: "一打三組合",
  },
] as const;

export function CollazenShowcase() {
  return (
    <section className="moana-home__wide py-16 md:py-24">
      <div className="container-kz">
        <div className="moana-home__section-head">
          <div>
            <p className="moana-section-label">
              <span className="moana-section-label__rule" aria-hidden />
              COLLAZEN
            </p>
            <h2 className="moana-home__section-title">膠原美肌小旋風系列</h2>
            <p className="moana-home__section-desc">
              5 合 1 膠原提升、HIFU RF 增效 — 量膚後為你配搭最合適組合。
            </p>
          </div>
          <Link href="/treatments/collazen" className="moana-pill-btn moana-pill-btn--ghost">
            了解 COLLAZEN
            <IconArrowRight size={14} />
          </Link>
        </div>

        <ul className="moana-collazen-grid" role="list">
          {collazenItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="moana-collazen-grid__link group">
                <PromoPoster
                  src={item.src}
                  alt={item.alt}
                  size="md"
                  sizes="(max-width: 768px) 88vw, 320px"
                />
                <span className="moana-seasonal-grid__tag font-ui">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
