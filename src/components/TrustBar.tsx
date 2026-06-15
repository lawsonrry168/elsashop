import { EditorialPetalStats } from "@/components/EditorialPetalStats";
import { moanaPetalIntro, moanaPetalStats } from "@/data/moana-stats";

export function TrustBar() {
  return (
    <section className="moana-page moana-page--flush" aria-label="專業認證">
      <div className="container-kz">
        <EditorialPetalStats
          items={moanaPetalStats}
          eyebrow="Trust"
          title="為什麼選康姿健"
          intro={moanaPetalIntro}
        />
      </div>
    </section>
  );
}
