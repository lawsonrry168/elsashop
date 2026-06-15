import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingCTA } from "@/components/BookingCTA";
import { EditorialImage } from "@/components/EditorialImage";
import { getJournalBody, getJournalPost, journalPosts } from "@/data/journal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "文章" };
  return { title: post.title, description: post.excerpt };
}

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const paragraphs = getJournalBody(slug);

  return (
    <>
      <article className="section-kz">
        <div className="container-kz max-w-2xl">
          <Link
            href="/journal"
            className="font-ui text-sm text-kz-rose no-underline hover:underline"
          >
            ← 返回醫美知識
          </Link>
          {post.image && (
            <div className="mt-8">
              <EditorialImage
                src={post.image}
                alt={post.imageAlt ?? post.title}
                aspect="landscape"
              />
            </div>
          )}
          <span className="mt-6 inline-block tag-kz">{post.category}</span>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-kz-plum">
            {post.title}
          </h1>
          <time className="mt-4 block font-ui text-xs text-kz-plum-muted">
            {post.date}
          </time>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-kz-plum-muted">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
      </article>
      <BookingCTA />
    </>
  );
}
