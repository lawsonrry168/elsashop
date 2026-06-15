import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { EditorialImage } from "@/components/EditorialImage";
import { IconArrowRight } from "@/components/icons/KzIconsServer";
import { JournalMagazineGrid } from "@/components/JournalMagazineGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Testimonials } from "@/components/Testimonials";
import { TreatmentFeatureSlider } from "@/components/TreatmentFeatureSlider";
import { images, narrativeChapters } from "@/data/images";
import { promo } from "@/data/promo-images";
import { journalPosts } from "@/data/journal";
import { featuredTreatments } from "@/data/treatments";

export function HomeNarrative() {
  return (
    <div className="moana-home">
      {narrativeChapters.map((chapter, i) => (
        <RevealOnScroll key={chapter.id} delay={i * 80}>
          <section className="moana-home__chapter moana-home__chapter--editorial">
            <EditorialImage
              {...chapter.image}
              aspect="promo"
              fit="contain"
              className="moana-home__chapter-image"
            />
            <div className="moana-home__chapter-body">
              <p className="moana-section-label">
                <span className="moana-section-label__rule" aria-hidden />
                {chapter.label}
              </p>
              <h2 className="moana-home__chapter-title">{chapter.title}</h2>
              <div className="moana-home__chapter-text">
                {chapter.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>
      ))}

      <RevealOnScroll delay={120}>
        <section className="moana-home__wide" id="treatments">
          <div className="container-kz">
            <TreatmentFeatureSlider treatments={featuredTreatments} />
            <p className="moana-home__link-row">
              <Link href="/treatments" className="moana-pill-btn moana-pill-btn--dark">
                查看全部療程
                <IconArrowRight size={14} />
              </Link>
            </p>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delay={80}>
        <section className="moana-home__flush">
          <EditorialImage
            {...images.treatments.peel}
            caption={images.treatments.peel.alt}
            aspect="promo"
            fit="contain"
          />
        </section>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <ProcessSteps embedded />
      </RevealOnScroll>

      <RevealOnScroll delay={120}>
        <section className="moana-home__chapter moana-home__chapter--split">
          <EditorialImage
            {...promo.microneedle}
            caption={promo.microneedle.alt}
            aspect="promo"
            fit="contain"
          />
          <div className="moana-home__chapter-body">
            <p className="moana-section-label">
              <span className="moana-section-label__rule" aria-hidden />
              Featured Treatment
            </p>
            <h2 className="moana-home__chapter-title">m.pen 微針射頻膠原修復</h2>
            <p className="moana-home__chapter-text moana-home__chapter-text--single">
              西班牙醫學級 Mesoestetic m.pen — 垂直進針更精準，收毛孔、去凹凸洞、撫平細紋。
              <strong className="text-kz-brand-pink">單次 $880</strong>，可加 Bioskin 精華。
            </p>
            <p className="moana-home__link-row">
              <Link
                href="/treatments/microneedle-rf"
                className="moana-pill-btn"
              >
                了解微針療程
                <IconArrowRight size={14} />
              </Link>
            </p>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <section className="moana-home__wide moana-home__wide--bordered">
          <div className="container-kz">
            <div className="moana-home__section-head">
              <div>
                <p className="moana-section-label">
                  <span className="moana-section-label__rule" aria-hidden />
                  Journal
                </p>
                <h2 className="moana-home__section-title">醫美知識</h2>
                <p className="moana-home__section-desc">
                  果酸、暗瘡、敏感肌 — 慢慢讀，慢慢了解。
                </p>
              </div>
              <Link href="/journal" className="moana-pill-btn moana-pill-btn--ghost">
                全部文章
                <IconArrowRight size={14} />
              </Link>
            </div>
            <JournalMagazineGrid posts={journalPosts} limit={3} />
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delay={80}>
        <Testimonials embedded />
      </RevealOnScroll>

      <RevealOnScroll delay={60}>
        <BookingCTA />
      </RevealOnScroll>
    </div>
  );
}
