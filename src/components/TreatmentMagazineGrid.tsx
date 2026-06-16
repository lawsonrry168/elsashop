import Image from "next/image";
import Link from "next/link";
import type { Treatment } from "@/data/treatments";

type Props = {
  treatments: Treatment[];
  startIndex?: number;
  /** stacked = 圖片全幅 + 文案在下方；overlay = 玻璃面板疊在圖上 */
  layout?: "stacked" | "overlay";
};

function formatPrice(t: Treatment) {
  if (t.priceType === "fixed" && t.price) {
    return `${t.price} / 單次`;
  }
  return "諮詢報價";
}

function TreatmentCardCopy({ treatment }: { treatment: Treatment }) {
  return (
    <>
      <h3 className="moana-news-card__name">{treatment.name}</h3>
      <p className="moana-news-card__tagline">{treatment.tagline}</p>
      <div className="moana-news-card__footer">
        <div className="moana-news-card__problems">
          {treatment.problems.slice(0, 2).map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
        <span className="moana-pill-btn">
          了解療程
          <span aria-hidden>→</span>
        </span>
      </div>
      <p className="moana-news-card__price">{formatPrice(treatment)}</p>
    </>
  );
}

export function TreatmentMagazineGrid({
  treatments,
  startIndex = 1,
  layout = "stacked",
}: Props) {
  const isStacked = layout === "stacked";

  return (
    <div
      className={`moana-news-grid${isStacked ? " moana-news-grid--treatment-stacked" : ""}`}
      role="list"
    >
      {treatments.map((t, i) => {
        const num = String(startIndex + i).padStart(2, "0");

        return (
          <article
            key={t.slug}
            className={`moana-news-card${isStacked ? " moana-news-card--stacked" : ""}`}
            role="listitem"
          >
            <Link
              href={`/treatments/${t.slug}`}
              className="moana-news-card__link group"
            >
              <div className="moana-news-card__media">
                {t.image ? (
                  <Image
                    src={t.image}
                    alt={t.imageAlt ?? t.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="moana-news-card__placeholder" aria-hidden />
                )}
                <span className="moana-news-card__tag">{t.category}</span>
                <span className="moana-news-card__index">{num}</span>
                {!isStacked && (
                  <div className="moana-news-card__glass">
                    <TreatmentCardCopy treatment={t} />
                  </div>
                )}
              </div>
              {isStacked && (
                <div className="moana-news-card__glass moana-news-card__glass--stacked">
                  <TreatmentCardCopy treatment={t} />
                </div>
              )}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
