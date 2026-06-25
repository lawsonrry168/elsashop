"use client";

import Link from "next/link";
import Image from "next/image";
import { images } from "@/data/images";

const bentoCells = [
  {
    id: "studio",
    href: "/about",
    ctaId: "cta_bento_studio",
    col: "md:col-span-7",
    row: "md:row-span-2",
    title: "一人小店的私密節奏",
    body: "沒有連鎖店的喧囂，只有專注於你的護理節奏。",
    image: images.studio.interior,
    dark: true,
  },
  {
    id: "peel",
    href: "/skin-analysis",
    ctaId: "cta_bento_peel",
    col: "md:col-span-5",
    row: "md:row-span-1",
    title: "TEGODER 量膚定制果酸",
    body: "先量膚，再建議濃度與療程組合。",
    image: images.treatments.peel,
    dark: false,
  },
  {
    id: "device",
    href: "/treatments",
    ctaId: "cta_bento_treatments",
    col: "md:col-span-5",
    row: "md:row-span-1",
    title: "醫美級儀器療程",
    body: "等離子、射頻、激光 — 單次收費，明碼透明。",
    image: images.treatments.device,
    dark: false,
  },
  {
    id: "wellness",
    href: "/wellness",
    ctaId: "cta_bento_wellness",
    col: "md:col-span-12",
    row: "md:row-span-1",
    title: "痛症理療 · 女賓為主",
    body: "遠紅外線養生、傳統理療；推拿只限女賓。男賓護理只限預約。",
    image: { src: "/videos/reels/posters/11.jpg", alt: "康姿健女賓護理服務" },
    dark: true,
    wide: true,
  },
] as const;

export function HomeBento() {
  return (
    <section className="premium-bento py-32 md:py-48">
      <div className="container-kz">
        <div className="premium-bento__head">
          <h2 className="premium-bento__title max-w-4xl">
            你的皮膚，是你最好的配飾
          </h2>
          <p className="premium-bento__desc max-w-xl">
            康姿健是屯門韓系皮膚管理工作室。護膚從了解膚質開始，而非推銷套裝。
          </p>
        </div>

        <div
          className="premium-bento__grid grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 grid-flow-dense auto-rows-[minmax(220px,auto)]"
          style={{ gridAutoFlow: "dense" }}
        >
          {bentoCells.map((cell) => (
            <Link
              key={cell.id}
              href={cell.href}
              data-cta-id={cell.ctaId}
              className={`premium-bento__cell group overflow-hidden ${cell.col} ${cell.row} ${"wide" in cell && cell.wide ? "premium-bento__cell--wide" : ""} ${cell.dark ? "premium-bento__cell--dark" : ""}`}
            >
              <div className="premium-bento__media overflow-hidden">
                <Image
                  src={cell.image.src}
                  alt={cell.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale-[30%] contrast-125 opacity-90"
                />
              </div>
              <div className="premium-bento__content">
                <h3 className="premium-bento__cell-title">{cell.title}</h3>
                <p className="premium-bento__cell-body">{cell.body}</p>
                <span className="premium-bento__arrow font-ui">探索 →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
