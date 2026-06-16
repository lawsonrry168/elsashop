"use client";

import { useState } from "react";
import Image from "next/image";
import { promo } from "@/data/promo-images";

const testimonials = [
  {
    quote:
      "以前最怕被硬銷，康姿健單次收費好安心。量膚分析完先建議療程，自己決定做唔做。",
    author: "屯門客人",
    image: promo.heroWelcome,
  },
  {
    quote:
      "等離子抗痘做完毛孔細咗好多，環境舒服，韓系感覺好放鬆。",
    author: "Instagram 客人",
    image: promo.spanishFacial,
  },
  {
    quote:
      "TEGODER 果酸係量膚後先配，敏感肌都做得，專業又溫柔。",
    author: "回頭客人",
    image: promo.tegoder,
  },
] as const;

export function PremiumTestimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="premium-testimonials py-32 md:py-48">
      <div className="container-kz">
        <h2 className="premium-testimonials__title max-w-2xl mb-16">
          客人分享
        </h2>

        <div className="premium-testimonials__layout">
          <div className="premium-testimonials__portraits">
            {testimonials.map((item, i) => (
              <button
                key={item.author}
                type="button"
                className={`premium-testimonials__portrait overflow-hidden transition-[opacity,box-shadow,transform] duration-500 ${i === active ? "premium-testimonials__portrait--active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`查看 ${item.author} 的分享`}
                aria-pressed={i === active}
              >
                <Image
                  src={item.image.src}
                  alt=""
                  width={120}
                  height={150}
                  className="object-cover w-full h-full transition-transform duration-700 ease-out hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </button>
            ))}
          </div>

          <blockquote
            className="premium-testimonials__quote"
            aria-live="polite"
            aria-atomic="true"
          >
            <p>「{t.quote}」</p>
            <footer>— {t.author}</footer>
          </blockquote>

          <div className="premium-testimonials__nav font-ui">
            <button
              type="button"
              onClick={() =>
                setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
              }
              aria-label="上一則"
              className="premium-testimonials__arrow"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % testimonials.length)}
              aria-label="下一則"
              className="premium-testimonials__arrow"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
