"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  /** sm = marquee cards, md = narrative sections, lg = flush band */
  size?: "sm" | "md" | "lg";
  className?: string;
  sizes?: string;
};

export function PromoPoster({
  src,
  alt,
  priority = false,
  size = "md",
  className = "",
  sizes = "(max-width: 768px) 85vw, 320px",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`promo-poster promo-poster--${size} ${className}`.trim()}
      data-loaded={loaded || failed ? "" : undefined}
    >
      <div className="promo-poster__frame">
        {!loaded && !failed && (
          <div className="promo-poster__shimmer" aria-hidden="true" />
        )}
        {failed ? (
          <div className="promo-poster__fallback font-ui" role="img" aria-label={alt}>
            <span className="promo-poster__fallback-mark">KZJ</span>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={`promo-poster__img ${loaded ? "promo-poster__img--loaded" : ""}`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
