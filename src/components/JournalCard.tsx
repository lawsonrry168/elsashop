import Link from "next/link";
import type { JournalPost } from "@/data/journal";

export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="card-kz group block no-underline"
    >
      <span className="tag-kz">{post.category}</span>
      <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-kz-plum group-hover:text-kz-rose">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-kz-plum-muted">
        {post.excerpt}
      </p>
      <p className="mt-4 font-ui text-sm text-kz-rose">閱讀更多 →</p>
    </Link>
  );
}
