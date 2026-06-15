"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { promo } from "@/data/promo-images";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: "custom",
    title: "量膚定制",
    body: "先分析膚況，再建議療程，不推銷套裝。",
    image: promo.spanishFacial,
  },
  {
    id: "pricing",
    title: "單次收費",
    body: "明碼實價或諮詢報價，絕無硬銷。",
    image: promo.tegoder,
  },
  {
    id: "cert",
    title: "專業認證",
    body: "IBDR 2025 金獎 · ITEC LV4 激光美容師 · 姊妹美容優秀專業美容院。",
    image: promo.plaser,
  },
  {
    id: "vibe",
    title: "韓系質感",
    body: "少女感空間，專注你的 Me Time。",
    image: promo.heroShop,
  },
] as const;

export function HorizontalAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".premium-accordion__panel");
      if (!cards.length) return;

      gsap.to(cards, {
        y: (i) => -i * 24,
        ease: "none",
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="premium-accordion py-32 md:py-48">
      <div className="container-kz">
        <h2 className="premium-accordion__title max-w-3xl mb-16 md:mb-20">
          為什麼選擇康姿健
        </h2>

        <div ref={stackRef} className="premium-accordion__stack">
          {items.map((item) => (
            <article
              key={item.id}
              className="premium-accordion__panel group"
              tabIndex={0}
            >
              <div className="premium-accordion__slice overflow-hidden">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="240px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 contrast-125 grayscale-[20%]"
                />
              </div>
              <div className="premium-accordion__body">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
