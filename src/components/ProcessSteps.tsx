import Link from "next/link";
import { WhatsAppCta } from "@/components/conversion/CtaLinks";
import { whatsappMessages } from "@/lib/whatsapp-messages";

const steps = [
  {
    num: "01",
    title: "膚質分析",
    desc: "專業量膚，了解膚質、問題與需求。",
  },
  {
    num: "02",
    title: "對症配方",
    desc: "按分析結果建議適合療程與配方。",
  },
  {
    num: "03",
    title: "單次療程",
    desc: "明碼或諮詢報價，你決定做不做。",
  },
  {
    num: "04",
    title: "家居建議",
    desc: "可選家居護理建議，延續療程效果。",
  },
];

export function ProcessSteps({
  embedded = false,
  showCta = false,
}: {
  embedded?: boolean;
  showCta?: boolean;
}) {
  const content = (
    <>
      <p className="moana-section-label">
        <span className="moana-section-label__rule" aria-hidden />
        Skin Analysis
      </p>
      <h2 className="moana-process__title">量膚定制流程</h2>
      <ol className="moana-process">
        {steps.map((step) => (
          <li key={step.num} className="moana-process__item">
            <span className="moana-process__num">{step.num}</span>
            <div>
              <h3 className="moana-process__step-title">{step.title}</h3>
              <p className="moana-process__desc">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
      {showCta && (
        <div className="conversion-process-cta">
          <WhatsAppCta
            ctaId="cta_whatsapp_process"
            message={whatsappMessages.skinAnalysis}
            className="moana-pill-btn moana-pill-btn--dark"
          >
            預約量膚分析
            <span aria-hidden>→</span>
          </WhatsAppCta>
          <Link
            href="/book"
            className="moana-pill-btn moana-pill-btn--ghost"
            data-cta-id="cta_process_book_funnel"
          >
            引導式預約
            <span aria-hidden>→</span>
          </Link>
        </div>
      )}
    </>
  );

  if (embedded) {
    return <section className="moana-home__chapter">{content}</section>;
  }

  return (
    <section className="moana-page moana-page--band">
      <div className="container-kz">{content}</div>
    </section>
  );
}
