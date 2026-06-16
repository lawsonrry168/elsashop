"use client";

import Image from "next/image";
import { useState } from "react";
import { PromoPoster } from "@/components/PromoPoster";
import type { SiteImage } from "@/data/images";

type Props = SiteImage & {
  priority?: boolean;
  aspect?: "portrait" | "landscape" | "square" | "promo" | "auto";
  fit?: "cover" | "contain";
  bleed?: boolean;
  className?: string;
  sizes?: string;
  posterSize?: "sm" | "md" | "lg";
  unoptimized?: boolean;
};

const aspectClass = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  promo: "aspect-[4/5]",
  auto: "aspect-auto min-h-[280px]",
};

export function EditorialImage({
  src,
  alt,
  caption,
  priority = false,
  aspect = "portrait",
  fit = "cover",
  bleed = false,
  className = "",
  sizes,
  posterSize = "md",
  unoptimized = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  const isPromo = aspect === "promo";

  if (isPromo) {
    return (
      <figure
        className={`narrative-figure narrative-figure--promo ${bleed ? "narrative-figure--bleed" : ""} ${className}`}
      >
        <PromoPoster
          src={src}
          alt={alt}
          priority={priority}
          size={posterSize}
          sizes={sizes ?? (bleed ? "100vw" : "(max-width: 768px) 100vw, 320px")}
        />
        {caption && (
          <figcaption className="narrative-figure__caption">{caption}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure
      className={`narrative-figure ${bleed ? "narrative-figure--bleed" : ""} ${className}`}
    >
      <div className={`narrative-figure__frame ${aspectClass[aspect]}`}>
        {!loaded && !failed && (
          <div className="narrative-figure__shimmer" aria-hidden="true" />
        )}
        {failed ? (
          <div className="narrative-figure__fallback" role="img" aria-label={alt}>
            <span className="narrative-figure__fallback-mark font-ui">KZJ</span>
            <span className="narrative-figure__fallback-text">{caption ?? alt}</span>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            unoptimized={unoptimized}
            sizes={sizes ?? (bleed ? "100vw" : "(max-width: 768px) 100vw, 640px")}
            className={`${fitClass} narrative-figure__img ${loaded ? "narrative-figure__img--loaded" : ""}`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {caption && (
        <figcaption className="narrative-figure__caption">{caption}</figcaption>
      )}
    </figure>
  );
}
