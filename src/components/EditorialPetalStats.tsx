"use client";

import Link from "next/link";
import { trackCtaClick } from "@/lib/analytics";

export type PetalStat = {
  value: string;
  label: string;
  caption?: string;
  corner: "tl" | "tr" | "bl" | "br";
  href?: string;
  ctaId?: string;
};

type Props = {
  items: PetalStat[];
  title?: string;
  eyebrow?: string;
  intro?: string;
};

type Accent = "violet" | "cyan";

function accentForCorner(corner: PetalStat["corner"]): Accent {
  return corner === "tr" || corner === "br" ? "cyan" : "violet";
}

function Gem({
  className,
  size,
  hue,
  shape = "diamond",
}: {
  className?: string;
  size: number;
  hue: number;
  shape?: "diamond" | "cube" | "shard";
}) {
  const clip =
    shape === "cube"
      ? "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)"
      : shape === "shard"
        ? "polygon(50% 0, 78% 40%, 60% 100%, 38% 100%, 22% 40%)"
        : "polygon(50% 0, 100% 38%, 72% 100%, 28% 100%, 0 38%)";

  return (
    <span
      className={`moana-petals__gem ${className ?? ""}`}
      style={
        {
          width: size,
          height: size,
          clipPath: clip,
          ["--g-hue" as string]: hue,
        } as React.CSSProperties
      }
      aria-hidden
    />
  );
}

function PetalDecor({ corner }: { corner: PetalStat["corner"] }) {
  if (corner === "tl") {
    return (
      <>
        <Gem className="g-a" size={36} hue={250} shape="shard" />
        <Gem className="g-b" size={28} hue={210} shape="cube" />
        <Gem className="g-c" size={20} hue={285} shape="diamond" />
      </>
    );
  }
  if (corner === "tr") {
    return (
      <>
        <Gem className="g-a" size={26} hue={255} shape="cube" />
        <Gem className="g-b" size={30} hue={300} shape="diamond" />
      </>
    );
  }
  if (corner === "bl") {
    return (
      <>
        <Gem className="g-a" size={19} hue={250} shape="diamond" />
        <Gem className="g-b" size={30} hue={215} shape="cube" />
      </>
    );
  }
  return (
    <>
      <Gem className="g-a" size={20} hue={205} shape="cube" />
      <span className="moana-petals__blossom" aria-hidden />
    </>
  );
}

function PetalBody({ item }: { item: PetalStat }) {
  const accent = accentForCorner(item.corner);
  return (
    <>
      <span className="moana-petals__glass" aria-hidden />
      <span className="moana-petals__sheen" aria-hidden />
      <span className="moana-petals__facet" aria-hidden />
      <span className="moana-petals__edge" aria-hidden />
      <PetalDecor corner={item.corner} />
      <div className="moana-petals__content">
        {item.caption && <p className="moana-petals__top">{item.caption}</p>}
        <p
          className={`moana-petals__value moana-petals__value--${accent}${/[+\d:h]/.test(item.value) ? "" : " moana-petals__value--text"}`}
        >
          {item.value}
        </p>
        <p className="moana-petals__bottom">{item.label}</p>
      </div>
    </>
  );
}

function PetalCard({ item }: { item: PetalStat }) {
  const className = `moana-petals__petal moana-petals__petal--${item.corner}`;

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={`${className} moana-petals__petal--link`}
        data-cta-id={item.ctaId ?? `cta_petal_${item.corner}`}
        onClick={() => trackCtaClick(item.ctaId ?? `cta_petal_${item.corner}`)}
      >
        <PetalBody item={item} />
      </Link>
    );
  }

  return (
    <article className={className}>
      <PetalBody item={item} />
    </article>
  );
}

export function EditorialPetalStats({
  items,
  title = "為什麼選康姿健",
  eyebrow = "Trust",
  intro,
}: Props) {
  return (
    <section className="moana-petals" aria-label={title}>
      <div className="moana-petals__head">
        <p className="moana-section-label">
          <span className="moana-section-label__rule" aria-hidden />
          {eyebrow}
        </p>
        <h2 className="moana-petals__title">{title}</h2>
        {intro && <p className="moana-petals__intro">{intro}</p>}
      </div>

      <div className="moana-petals__stage">
        <div className="moana-petals__grid-lines" aria-hidden />

        <div className="moana-petals__flower" aria-label={title}>
          {items.map((item) => (
            <PetalCard key={`${item.corner}-${item.label}`} item={item} />
          ))}
        </div>

        <span className="moana-petals__sparkle" aria-hidden />
      </div>
    </section>
  );
}
