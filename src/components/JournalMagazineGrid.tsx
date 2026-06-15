import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/data/journal";

type Props = {
  posts: JournalPost[];
  limit?: number;
};

export function JournalMagazineGrid({ posts, limit }: Props) {
  const items = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="moana-news-grid moana-news-grid--journal" role="list">
      {items.map((post, i) => {
        const num = String(i + 1).padStart(2, "0");

        return (
          <article key={post.slug} className="moana-news-card" role="listitem">
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
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="moana-news-card__placeholder" aria-hidden />
                )}
                <span className="moana-news-card__tag">{post.category}</span>
                <span className="moana-news-card__index">{num}</span>
                <div className="moana-news-card__glass">
                  <h3 className="moana-news-card__name">{post.title}</h3>
                  <p className="moana-news-card__tagline">{post.excerpt}</p>
                  <div className="moana-news-card__footer">
                    <time className="moana-news-card__date">{post.date}</time>
                    <span className="moana-pill-btn">
                      閱讀
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
