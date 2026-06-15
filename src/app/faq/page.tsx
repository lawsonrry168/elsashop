import type { Metadata } from "next";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { MoanaPageHero } from "@/components/MoanaPageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "常見問題",
  description: "康姿健常見問題 — 價格、痛感、硬銷、預約等。",
};

const faqs = [
  {
    q: "會不會硬銷療程套裝？",
    a: "不會。康姿健堅持單次收費，量膚分析後才建議療程，由你決定做不做。",
  },
  {
    q: "價格如何顯示？",
    a: "部分療程有明碼單次價（如微針射頻 $880、等離子抗痘 $680）。需量膚定制或組合的療程會標示「諮詢報價」，請 WhatsApp 或 IG 查詢。",
  },
  {
    q: "如何預約？",
    a: "主要透過 WhatsApp 或 Instagram DM 預約。詳見預約頁面。",
  },
  {
    q: "首次應該預約什麼？",
    a: "建議首次預約「量膚分析」，了解膚質後再決定適合的療程。",
  },
  {
    q: "有男賓服務嗎？",
    a: "有。官網設有獨立「男賓護理」專區，包括針清、激光護理等。",
  },
  {
    q: "療程會痛嗎？",
    a: "視乎療程而定。微針射頻等可能有輕微感覺，等離子煥膚相對溫和。預約時可查詢詳情。",
  },
  {
    q: "在哪裡？",
    a: site.address,
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="moana-page">
        <div className="container-kz moana-page__narrow">
          <MoanaPageHero
            watermark="FAQ"
            eyebrow={site.nameEn}
            title="常見問題"
            lead={
              <p>
                價格、痛感、硬銷、預約 — 整理客人最常問的
                <strong>七個問題</strong>。
              </p>
            }
          >
            <Link href="/book" className="moana-pill-btn moana-pill-btn--dark">
              立即預約
              <span aria-hidden>→</span>
            </Link>
          </MoanaPageHero>

          <div className="moana-faq">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="moana-faq__item">
                <summary className="moana-faq__question">
                  <span className="moana-faq__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{faq.q}</span>
                  <span className="moana-faq__toggle" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="moana-faq__answer">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
