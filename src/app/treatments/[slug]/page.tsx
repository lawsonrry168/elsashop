import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingCTA } from "@/components/BookingCTA";
import { InstagramCta, WhatsAppCta } from "@/components/conversion/CtaLinks";
import { EditorialImage } from "@/components/EditorialImage";
import { getTreatment, treatments } from "@/data/treatments";
import { whatsappMessages } from "@/lib/whatsapp-messages";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) return { title: "療程" };
  return {
    title: treatment.name,
    description: treatment.tagline,
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  const bookMessage = whatsappMessages.treatment(treatment.name);

  return (
    <>
      <section className="moana-page">
        <div className="container-kz max-w-3xl">
          <Link
            href="/treatments"
            className="font-ui text-sm text-kz-rose no-underline hover:underline"
            data-cta-id="cta_treatment_back"
          >
            ← 返回療程
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            {treatment.problems.map((p) => (
              <span key={p} className="tag-kz">
                {p}
              </span>
            ))}
            <span className="tag-kz !bg-kz-blush/40">{treatment.category}</span>
          </div>
          <h1 className="mt-6 font-serif text-3xl font-semibold text-kz-plum md:text-4xl">
            {treatment.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-kz-plum-muted">
            {treatment.tagline}
          </p>

          <div className="conversion-treatment-hero-cta mt-6">
            <WhatsAppCta
              ctaId="cta_whatsapp_treatment_detail_hero"
              message={bookMessage}
              className="moana-pill-btn moana-pill-btn--dark"
            >
              WhatsApp 預約此療程
              <span aria-hidden>→</span>
            </WhatsAppCta>
            <InstagramCta
              ctaId="cta_instagram_treatment_detail"
              className="moana-pill-btn"
            >
              Instagram DM
            </InstagramCta>
          </div>

          <div className="mt-6 rounded-2xl border border-kz-lilac bg-white/80 p-6">
            {treatment.priceType === "fixed" ? (
              <p className="price-fixed text-2xl">
                {treatment.price}{" "}
                <span className="text-base font-normal text-kz-plum-muted">/ 單次</span>
              </p>
            ) : (
              <p className="price-consult text-lg">諮詢報價 · 量膚分析後建議</p>
            )}
            {treatment.priceNote && (
              <p className="mt-2 text-sm text-kz-plum-muted">{treatment.priceNote}</p>
            )}
          </div>
        </div>
      </section>

      <section className="section-kz">
        <div className="container-kz max-w-3xl space-y-10">
          {treatment.image && (
            <EditorialImage
              src={treatment.image}
              alt={treatment.imageAlt ?? treatment.name}
              aspect="landscape"
            />
          )}
          <div>
            <h2 className="font-serif text-xl font-semibold text-kz-plum">適合對象</h2>
            <p className="mt-3 text-sm leading-relaxed text-kz-plum-muted">
              針對 {treatment.problems.join("、")} 等肌膚問題。建議先進行量膚分析，由專業人員評估是否適合。
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-kz-plum">療程特色</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-kz-plum-muted">
              <li>單次收費，絕無硬銷套裝</li>
              <li>量膚定制，對症建議</li>
              <li>醫美級儀器，專業操作</li>
            </ul>
          </div>
          <div className="conversion-treatment-hero-cta">
            <WhatsAppCta
              ctaId="cta_whatsapp_treatment_detail_footer"
              message={bookMessage}
              className="moana-pill-btn moana-pill-btn--dark"
            >
              WhatsApp 預約此療程
              <span aria-hidden>→</span>
            </WhatsAppCta>
            <Link
              href="/skin-analysis"
              className="moana-pill-btn moana-pill-btn--ghost"
              data-cta-id="cta_treatment_skin_analysis"
            >
              先了解量膚分析
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <BookingCTA
        title="還有其他肌膚問題？"
        subtitle="預約量膚分析，我們會為你建議最適合的療程組合。"
        whatsappMessage={whatsappMessages.skinAnalysis}
        ctaIdPrefix="cta_treatment_detail_booking"
      />
    </>
  );
}
