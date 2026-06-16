"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { JournalMagazineGrid } from "@/components/JournalMagazineGrid";
import { PageContentPanels } from "@/components/PageContentPanels";
import { RelatedPageLinks } from "@/components/RelatedPageLinks";
import type { ContentPanel } from "@/data/page-content";
import type { JournalPost } from "@/data/journal";
import { handleRadioGroupKeyDown } from "@/lib/radiogroup-keyboard";

type Props = {
  posts: JournalPost[];
  categories: string[];
  panels: ContentPanel[];
};

function readCategoryParam(searchParams: URLSearchParams, categories: string[]) {
  const value = searchParams.get("category");
  return value && categories.includes(value) ? value : "全部";
}

export default function JournalPageClient({ posts, categories, panels }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = readCategoryParam(searchParams, categories);

  const updateCategory = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "全部") {
        params.delete("category");
      } else {
        params.set("category", value);
      }
      const query = params.toString();
      router.replace(query ? `/journal?${query}` : "/journal", { scroll: false });
    },
    [router, searchParams],
  );

  const filtered = useMemo(() => {
    if (category === "全部") return posts;
    return posts.filter((post) => post.category === category);
  }, [category, posts]);

  return (
    <>
      <PageContentPanels panels={panels} />

      <div className="moana-catalog mt-8">
        <div className="moana-catalog__head">
          <div>
            <p className="moana-section-label">
              <span className="moana-section-label__rule" aria-hidden />
              Topics
            </p>
            <h2 className="moana-catalog__title">
              文章分類
              <span className="moana-catalog__count">{filtered.length}</span>
            </h2>
          </div>
        </div>

        <div className="moana-filters">
          <div className="moana-filters__row">
            <span className="moana-filters__label" id="journal-category-label">
              主題
            </span>
            <div
              className="moana-filters__chips moana-filters__chips--scroll"
              role="radiogroup"
              aria-labelledby="journal-category-label"
              onKeyDown={(event) =>
                handleRadioGroupKeyDown(event, {
                  values: categories,
                  current: category,
                  onChange: updateCategory,
                })
              }
            >
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={category === c}
                  data-cta-id={`cta_journal_category_${c}`}
                  onClick={() => updateCategory(c)}
                  className={`moana-filters__chip ${
                    category === c ? "moana-filters__chip--active" : ""
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {category !== "全部" && (
            <button
              type="button"
              className="moana-filters__reset"
              data-cta-id="cta_journal_filter_reset"
              onClick={() => updateCategory("全部")}
            >
              查看全部文章
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <JournalMagazineGrid posts={filtered} />
        ) : (
          <p className="moana-empty">此分類暫無文章。</p>
        )}
      </div>

      <RelatedPageLinks path="/journal" />
    </>
  );
}
