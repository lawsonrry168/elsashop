import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { JournalMagazineGrid } from "@/components/JournalMagazineGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { PremiumTestimonials } from "@/components/premium/PremiumTestimonials";
import { journalPosts } from "@/data/journal";

export function HomeNarrativeTail() {
  return (
    <div className="moana-home">
      <ProcessSteps embedded showCta />

      <section className="moana-home__wide moana-home__wide--bordered py-32 md:py-48">
        <div className="container-kz">
          <div className="moana-home__section-head">
            <div>
              <h2 className="moana-home__section-title max-w-xl">
                醫美知識
              </h2>
              <p className="moana-home__section-desc">
                果酸、暗瘡、敏感肌 — 慢慢讀，慢慢了解。
              </p>
            </div>
            <Link
              href="/journal"
              className="moana-pill-btn moana-pill-btn--ghost"
              data-cta-id="cta_journal_all"
            >
              全部文章
              <span aria-hidden>→</span>
            </Link>
          </div>
          <JournalMagazineGrid posts={journalPosts} limit={3} />
        </div>
      </section>

      <PremiumTestimonials />
      <BookingCTA />
    </div>
  );
}
