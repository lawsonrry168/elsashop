import { EditorialPetalStats } from "@/components/EditorialPetalStats";
import { getTrustContent } from "@/lib/cms/site-content";

export async function TrustBar() {
  const trust = await getTrustContent();

  return (
    <section className="moana-page moana-page--flush" aria-label="專業認證">
      <div className="container-kz">
        <EditorialPetalStats
          items={trust.petalStats}
          eyebrow="Trust"
          title="為什麼選康姿健"
          intro={trust.petalIntro}
          highlights={trust.petalHighlights}
        />
      </div>
    </section>
  );
}
