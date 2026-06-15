import type { Metadata } from "next";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { JournalMagazineGrid } from "@/components/JournalMagazineGrid";
import { MoanaPageHero } from "@/components/MoanaPageHero";
import { journalPosts } from "@/data/journal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "醫美知識",
  description: "康姿健醫美知識 — 55 篇專業貼文，涵蓋果酸、儀器、痛症理療與護膚貼士。",
};

export default function JournalPage() {
  return (
    <>
      <section className="moana-page">
        <div className="container-kz">
          <MoanaPageHero
            watermark="Journal"
            eyebrow={site.nameEn}
            title="醫美知識"
            lead={
              <p>
                果酸、暗瘡、敏感肌 — 專業文章助你了解
                <strong>療程原理</strong>與
                <strong className="text-kz-brand-pink">護膚知識</strong>。
              </p>
            }
          >
            <Link href="/skin-analysis" className="moana-pill-btn">
              量膚定制
              <span aria-hidden>→</span>
            </Link>
          </MoanaPageHero>

          <JournalMagazineGrid posts={journalPosts} />
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
