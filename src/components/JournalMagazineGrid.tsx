import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/data/journal";
import { formatJournalDate, journalDateTimeAttr } from "@/lib/format-date";

type Props = {
  posts: JournalPost[];
  limit?: number;
  /** stacked = 圖片全幅 + 文案在下方；overlay = 玻璃面板疊在圖上 */
  layout?: "stacked" | "overlay";
};

function JournalCardCopy({
  post,
}: {
  post: JournalPost;
}) {
  return (
    <>
      <h3 className="moana-news-card__name">{post.title}</h3>
      <p className="moana-news-card__tagline">{post.excerpt}</p>
      <div className="moana-news-card__footer">
        <time
          className="moana-news-card__date"
          dateTime={journalDateTimeAttr(post.date)}
        >
          {formatJournalDate(post.date)}
        </time>
        <span className="moana-pill-btn">
          閱讀
          <span aria-hidden>→</span>
        </span>
      </div>
    </>
  );
}

export function JournalMagazineGrid({
  posts,
  limit,
  layout = "stacked",
}: Props) {
  const items = limit ? posts.slice(0, limit) : posts;
  const isStacked = layout === "stacked";

  return (
    <div
      className={`moana-news-grid moana-news-grid--journal${isStacked ? " moana-news-grid--journal-stacked" : ""}`}
      role="list"
    >
      {items.map((post, i) => {
        const num = String(i + 1).padStart(2, "0");

        return (
          <article
            key={post.slug}
            className={`moana-news-card${isStacked ? " moana-news-card--stacked" : ""}`}
            role="listitem"
          >
            <Link
              href={`/journal/${post.slug}`}
              className="moana-news-card__link group"
            >
              <div className="moana-news-card__media">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="moana-news-card__placeholder" aria-hidden />
                )}
                <span className="moana-news-card__tag">{post.category}</span>
                <span className="moana-news-card__index">{num}</span>
                {!isStacked && (
                  <div className="moana-news-card__glass">
                    <JournalCardCopy post={post} />
                  </div>
                )}
              </div>
              {isStacked && (
                <div className="moana-news-card__glass moana-news-card__glass--stacked">
                  <JournalCardCopy post={post} />
                </div>
              )}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
