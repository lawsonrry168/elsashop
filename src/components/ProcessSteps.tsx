import Link from "next/link";
import { WhatsAppCta } from "@/components/conversion/CtaLinks";
import type { ProcessStepItem } from "@/data/site-content";
import { whatsappMessages } from "@/lib/whatsapp-messages";

export type ProcessStepsContent = {
  sectionLabel: string;
  title: string;
  steps: ProcessStepItem[];
};

type Props = {
  embedded?: boolean;
  bare?: boolean;
  showCta?: boolean;
  showLinks?: boolean;
  hideHeading?: boolean;
  content?: ProcessStepsContent;
};

const defaultContent: ProcessStepsContent = {
  sectionLabel: "Skin Analysis",
  title: "量膚定制流程",
  steps: [
    { num: "01", title: "膚質分析", desc: "先幫你量膚，了解膚質同煩惱。" },
    { num: "02", title: "對症配方", desc: "跟住分析結果，建議啱嘅療程同配方。" },
    { num: "03", title: "單次療程", desc: "明碼或者諮詢報價，做唔做由你決定。" },
    { num: "04", title: "家居建議", desc: "有需要會俾家居護理貼士，延續效果。" },
  ],
};

export function ProcessSteps({
  embedded = false,
  bare = false,
  showCta = false,
  showLinks = false,
  hideHeading = false,
  content = defaultContent,
}: Props) {
  const body = (
    <>
      {!hideHeading && (
        <>
          <p className="moana-section-label">
            <span className="moana-section-label__rule" aria-hidden />
            {content.sectionLabel}
          </p>
          <h2 className="moana-process__title">{content.title}</h2>
        </>
      )}
      <ol className="moana-process">
        {content.steps.map((step) => (
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
      {showLinks && !showCta && (
        <p className="moana-home__link-row">
          <Link
            href="/skin-analysis"
            className="moana-pill-btn moana-pill-btn--dark"
            data-cta-id="cta_process_skin_page"
          >
            了解量膚定制
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/book"
            className="moana-pill-btn moana-pill-btn--ghost"
            data-cta-id="cta_process_book_funnel"
          >
            引導式預約
            <span aria-hidden>→</span>
          </Link>
        </p>
      )}
    </>
  );

  if (bare) {
    return <div className="moana-process-block">{body}</div>;
  }

  if (embedded) {
    return <section className="moana-home__chapter">{body}</section>;
  }

  return (
    <section className="moana-page moana-page--band">
      <div className="container-kz">{body}</div>
    </section>
  );
}
