import Link from "next/link";
import { PromoPoster } from "@/components/PromoPoster";
import { IconArrowRight } from "@/components/icons/KzIconsServer";
import { promo } from "@/data/promo-images";

const wellnessItems = [
  promo.drRainbow,
  promo.wellnessDetox,
  promo.drFace,
] as const;

export function WellnessTeaser() {
  return (
    <section className="moana-home__chapter moana-home__chapter--split moana-home__chapter--wellness">
      <div className="moana-wellness-teaser__posters">
        {wellnessItems.map((item) => (
          <PromoPoster
            key={item.src}
            src={item.src}
            alt={item.alt}
            size="sm"
            sizes="(max-width: 768px) 30vw, 140px"
          />
        ))}
      </div>
      <div className="moana-home__chapter-body">
        <p className="moana-section-label">
          <span className="moana-section-label__rule" aria-hidden />
          Wellness
        </p>
        <h2 className="moana-home__chapter-title">痛症理療 · 遠紅外線養生</h2>
        <p className="moana-home__chapter-text moana-home__chapter-text--single">
          Dr. Rainbow 醫療級遠紅外線焗倉、Dr. Face 童顏機，配合退背、拔罐、刮痧等傳統理療。
          做完 Facial 再焗一焗，由內而外排濕排毒。
        </p>
        <p className="moana-home__link-row">
          <Link href="/wellness" className="moana-pill-btn moana-pill-btn--dark">
            了解痛症理療
            <IconArrowRight size={14} />
          </Link>
        </p>
      </div>
    </section>
  );
}
