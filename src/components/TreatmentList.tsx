import Image from "next/image";
import Link from "next/link";
import type { Treatment } from "@/data/treatments";

type Props = {
  treatments: Treatment[];
  startIndex?: number;
  showIndex?: boolean;
};

function formatPrice(t: Treatment) {
  if (t.priceType === "fixed" && t.price) {
    return `${t.price} / 單次`;
  }
  return "諮詢報價";
}

export function TreatmentList({
  treatments,
  startIndex = 1,
  showIndex = true,
}: Props) {
  return (
    <ul className="treatment-index" role="list">
      {treatments.map((t, i) => (
        <li key={t.slug}>
          <Link
            href={`/treatments/${t.slug}`}
            className="treatment-index__row group"
          >
            {showIndex && (
              <span className="treatment-index__num">
                {String(startIndex + i).padStart(2, "0")}
              </span>
            )}
            {t.image && (
              <span className="treatment-index__thumb">
                <Image
                  src={t.image}
                  alt=""
                  width={64}
                  height={80}
                  className="object-cover"
                />
              </span>
            )}
            <div className="treatment-index__body">
              <h3 className="treatment-index__name">{t.name}</h3>
              <p className="treatment-index__tagline">{t.tagline}</p>
              <div className="treatment-index__tags">
                {t.problems.slice(0, 2).map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
            </div>
            <span className="treatment-index__category">{t.category}</span>
            <span className="treatment-index__price">{formatPrice(t)}</span>
            <span className="treatment-index__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
