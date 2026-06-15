"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookingCTA } from "@/components/BookingCTA";
import { TreatmentFilterCta } from "@/components/conversion/TreatmentFilterCta";
import { EditorialPetalStats } from "@/components/EditorialPetalStats";
import { MoanaPageHero } from "@/components/MoanaPageHero";
import { TreatmentFeatureSlider } from "@/components/TreatmentFeatureSlider";
import { TreatmentMagazineGrid } from "@/components/TreatmentMagazineGrid";
import { moanaPetalStats } from "@/data/moana-stats";
import { site } from "@/data/site";
import { featuredTreatments, treatments } from "@/data/treatments";

const categories = [
  "全部",
  ...Array.from(new Set(treatments.filter((t) => !t.forMen).map((t) => t.category))),
];

const problems = [
  "全部",
  ...Array.from(new Set(treatments.flatMap((t) => t.problems))),
];

export default function TreatmentsPage() {
  const [category, setCategory] = useState("全部");
  const [problem, setProblem] = useState("全部");

  const filtered = useMemo(() => {
    return treatments.filter((t) => {
      if (t.forMen) return false;
      if (category !== "全部" && t.category !== category) return false;
      if (problem !== "全部" && !t.problems.includes(problem)) return false;
      return true;
    });
  }, [category, problem]);

  const sliderItems = useMemo(() => {
    if (category === "全部" && problem === "全部") {
      return featuredTreatments;
    }
    return filtered.slice(0, 6);
  }, [category, problem, filtered]);

  const hasFilters = category !== "全部" || problem !== "全部";

  return (
    <>
      <section className="moana-page">
        <div className="container-kz">
          <MoanaPageHero
            watermark="Treatments"
            eyebrow={site.nameEn}
            title="療程總覽"
            lead={
              <p>
                屯門一人小店，<strong>量膚定制</strong>、
                <strong className="text-kz-brand-pink">單次收費</strong>、
                <strong className="text-kz-sage">絕無硬銷</strong>
                — 像翻閱護膚雜誌，按自己的節奏比較。
              </p>
            }
          >
            <Link
              href="/book"
              className="moana-pill-btn moana-pill-btn--dark"
              data-cta-id="cta_treatments_hero_book"
            >
              引導式預約
              <span aria-hidden>→</span>
            </Link>
          </MoanaPageHero>

          <TreatmentFeatureSlider treatments={sliderItems} />
          <EditorialPetalStats items={moanaPetalStats} />

          <div className="moana-catalog">
            <div className="moana-catalog__head">
              <div>
                <p className="moana-section-label">
                  <span className="moana-section-label__rule" aria-hidden />
                  Catalog
                </p>
                <h2 className="moana-catalog__title">
                  全部療程
                  <span className="moana-catalog__count">{filtered.length}</span>
                </h2>
              </div>
              <p className="moana-catalog__aside">
                男賓護理
                <Link
                  href="/men"
                  className="moana-pill-btn moana-pill-btn--ghost"
                  data-cta-id="cta_treatments_men"
                >
                  專區
                  <span aria-hidden>→</span>
                </Link>
              </p>
            </div>

            <div className="moana-filters">
              <div className="moana-filters__row">
                <span className="moana-filters__label" id="filter-category-label">
                  類型
                </span>
                <div
                  className="moana-filters__chips"
                  role="radiogroup"
                  aria-labelledby="filter-category-label"
                >
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={category === c}
                      aria-pressed={category === c}
                      data-cta-id={`cta_filter_category_${c}`}
                      onClick={() => setCategory(c)}
                      className={`moana-filters__chip ${
                        category === c ? "moana-filters__chip--active" : ""
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="moana-filters__row">
                <span className="moana-filters__label" id="filter-problem-label">
                  肌膚
                </span>
                <div
                  className="moana-filters__chips moana-filters__chips--scroll"
                  role="radiogroup"
                  aria-labelledby="filter-problem-label"
                >
                  {problems.map((p) => (
                    <button
                      key={p}
                      type="button"
                      role="radio"
                      aria-checked={problem === p}
                      aria-pressed={problem === p}
                      data-cta-id={`cta_filter_problem_${p}`}
                      onClick={() => setProblem(p)}
                      className={`moana-filters__chip ${
                        problem === p ? "moana-filters__chip--active" : ""
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              {hasFilters && (
                <button
                  type="button"
                  className="moana-filters__reset"
                  data-cta-id="cta_filter_reset"
                  onClick={() => {
                    setCategory("全部");
                    setProblem("全部");
                  }}
                >
                  清除篩選
                </button>
              )}
            </div>

            <TreatmentFilterCta
              category={category}
              problem={problem}
              count={filtered.length}
            />

            {filtered.length > 0 ? (
              <TreatmentMagazineGrid treatments={filtered} />
            ) : (
              <p className="moana-empty">
                沒有符合條件的療程。
                <button
                  type="button"
                  className="moana-filters__reset moana-filters__reset--inline"
                  data-cta-id="cta_filter_reset_empty"
                  onClick={() => {
                    setCategory("全部");
                    setProblem("全部");
                  }}
                >
                  查看全部
                </button>
              </p>
            )}
          </div>
        </div>
      </section>

      <BookingCTA ctaIdPrefix="cta_treatments_footer" />
    </>
  );
}
