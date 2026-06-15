"use client";

import { site } from "@/data/site";
import { verticalTaglines } from "@/data/images";

const marqueeItems = [
  ...verticalTaglines,
  ...site.credentials,
  site.nameEn,
  site.location,
];

export function MarqueeStrip() {
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <section
      className="premium-marquee py-10 md:py-14 border-y border-kz-plum/10"
      aria-label="品牌承諾與認證"
    >
      <div className="premium-marquee__track">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="premium-marquee__item font-ui">
            {item}
            <span className="premium-marquee__dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}
