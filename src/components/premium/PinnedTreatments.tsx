"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { featuredTreatments } from "@/data/treatments";

gsap.registerPlugin(ScrollTrigger);

export function PinnedTreatments() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${listRef.current?.offsetHeight ?? 800}`,
          pin: pinRef.current,
          pinSpacing: true,
        });
      });

      gsap.utils.toArray<HTMLElement>(".premium-pin__card").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.8, opacity: 0.35, filter: "brightness(0.7)" },
          {
            scale: 1,
            opacity: 1,
            filter: "brightness(1)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            },
          },
        );
        gsap.to(card, {
          scale: 0.88,
          opacity: 0.25,
          filter: "brightness(0.55)",
          scrollTrigger: {
            trigger: card,
            start: "bottom 45%",
            end: "bottom 10%",
            scrub: 1,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="premium-pin py-32 md:py-48"
      id="treatments"
    >
      <div className="container-kz premium-pin__grid">
        <div ref={pinRef} className="premium-pin__aside">
          <h2 className="premium-pin__title max-w-md">
            精選療程，量膚後才建議
          </h2>
          <p className="premium-pin__desc">
            每位客人的膚質、生活習慣與困擾都不同。我們堅持先進行專業量膚分析，再建議最適合的療程。
          </p>
          <Link
            href="/treatments"
            className="moana-pill-btn moana-pill-btn--dark mt-8 inline-flex"
            data-cta-id="cta_pin_all_treatments"
          >
            查看全部療程
            <span aria-hidden>→</span>
          </Link>
        </div>

        <ul ref={listRef} className="premium-pin__list">
          {featuredTreatments.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/treatments/${t.slug}`}
                className="premium-pin__card group"
                data-cta-id={`cta_pin_treatment_${t.slug}`}
              >
                <div className="premium-pin__card-media overflow-hidden">
                  {t.image && (
                    <Image
                      src={t.image}
                      alt={t.imageAlt ?? t.name}
                      width={640}
                      height={400}
                      className="transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="premium-pin__card-body">
                  <h3>{t.name}</h3>
                  <p>{t.tagline}</p>
                  <span className="font-ui text-xs tracking-widest uppercase">
                    {t.price ?? t.priceNote ?? "量膚後報價"}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
