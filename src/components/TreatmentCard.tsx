import Link from "next/link";
import type { Treatment } from "@/data/treatments";

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <Link
      href={`/treatments/${treatment.slug}`}
      className="card-kz group flex h-full flex-col no-underline"
    >
      <div className="flex flex-wrap gap-2">
        {treatment.problems.slice(0, 2).map((p) => (
          <span key={p} className="tag-kz">
            {p}
          </span>
        ))}
        <span className="tag-kz !bg-kz-blush/40">{treatment.category}</span>
      </div>

      <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-kz-plum group-hover:text-kz-rose">
        {treatment.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-kz-plum-muted">
        {treatment.tagline}
      </p>

      <div className="mt-5 border-t border-kz-lilac/60 pt-4">
        {treatment.priceType === "fixed" ? (
          <p className="price-fixed">
            {treatment.price}{" "}
            <span className="text-sm font-normal text-kz-plum-muted">/ 單次</span>
          </p>
        ) : (
          <p className="price-consult">諮詢報價</p>
        )}
        {treatment.priceNote && (
          <p className="mt-1 text-xs text-kz-plum-muted">{treatment.priceNote}</p>
        )}
        <p className="mt-3 font-ui text-sm text-kz-rose">了解療程 →</p>
      </div>
    </Link>
  );
}
