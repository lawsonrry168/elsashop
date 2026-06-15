import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/data/journal";

export function JournalList({ posts }: { posts: JournalPost[] }) {
  return (
    <ul className="journal-index" role="list">
      {posts.map((post, i) => (
        <li key={post.slug}>
          <Link href={`/journal/${post.slug}`} className="journal-index__row group">
            <span className="journal-index__num">
              {String(i + 1).padStart(2, "0")}
            </span>
            {post.image && (
              <span className="journal-index__thumb">
                <Image
                  src={post.image}
                  alt=""
                  width={72}
                  height={96}
                  className="object-cover"
                />
              </span>
            )}
            <div className="journal-index__body">
              <p className="journal-index__category">{post.category}</p>
              <h3 className="journal-index__title">{post.title}</h3>
              <p className="journal-index__excerpt">{post.excerpt}</p>
            </div>
            <time className="journal-index__date">{post.date}</time>
            <span className="journal-index__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
