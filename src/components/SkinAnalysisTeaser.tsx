import Link from "next/link";
import { EditorialImage } from "@/components/EditorialImage";
import { SectionBodyText, resolveSectionContent, type SectionContentProps } from "@/components/home/section-content";
import { IconArrowRight } from "@/components/icons/KzIconsServer";
import { ProcessSteps } from "@/components/ProcessSteps";
import { getProcessStepsContent } from "@/lib/cms/site-content";
import { WhatsAppCta } from "@/components/conversion/CtaLinks";
import { whatsappMessages } from "@/lib/whatsapp-messages";

export async function SkinAnalysisTeaser({ content }: SectionContentProps) {
  const c = resolveSectionContent("skin-analysis", content);
  const processContent = await getProcessStepsContent();
  return (
    <section className="moana-home__band moana-home__band--skin">
      <div className="container-kz moana-home__band-grid">
        <div className="moana-home__band-copy">
          {c.eyebrow ? (
            <p className="moana-section-label">
              <span className="moana-section-label__rule" aria-hidden />
              {c.eyebrow}
            </p>
          ) : null}
          {c.title ? <h2 className="moana-home__chapter-title">{c.title}</h2> : null}
          <SectionBodyText body={c.body} highlight={c.highlight} />
          <p className="moana-home__link-row">
            {c.linkLabel ? (
              <WhatsAppCta
                ctaId="cta_whatsapp_home_skin"
                message={whatsappMessages.skinAnalysis}
                className="moana-pill-btn moana-pill-btn--dark"
              >
                {c.linkLabel}
                <IconArrowRight size={14} />
              </WhatsAppCta>
            ) : null}
            {c.secondaryLinkHref && c.secondaryLinkLabel ? (
              <Link
                href={c.secondaryLinkHref}
                className="moana-pill-btn"
                data-cta-id="cta_home_skin_page"
              >
                {c.secondaryLinkLabel}
                <IconArrowRight size={14} />
              </Link>
            ) : null}
          </p>
        </div>

        {c.image ? (
          <div className="moana-home__band-media">
            <EditorialImage
              src={c.image}
              alt={c.imageAlt ?? ""}
              caption={c.imageAlt}
              aspect="promo"
              posterSize="sm"
            />
          </div>
        ) : null}

        <div className="moana-home__band-steps">
          <p className="moana-section-label moana-section-label--compact">
            <span className="moana-section-label__rule" aria-hidden />
            Process
          </p>
          <h3 className="moana-process__subtitle">量膚定制流程</h3>
          <ProcessSteps bare hideHeading showLinks content={processContent} />
        </div>
      </div>
    </section>
  );
}
