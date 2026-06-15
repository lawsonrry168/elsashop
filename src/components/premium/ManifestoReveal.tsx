"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const manifesto =
  "我們相信護膚不應該從推銷套裝開始而應該從了解你的膚質開始醫美級儀器西班牙醫學級果酸等離子與微針射頻全部以單次收費方式提供你決定做或不做".split(
    "",
  );

export function ManifestoReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const chars = textRef.current?.querySelectorAll(".premium-reveal__char");
      if (!chars?.length) return;

      gsap.fromTo(
        chars,
        { opacity: 0.08 },
        {
          opacity: 1,
          stagger: 0.015,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="premium-reveal py-32 md:py-48">
      <div className="container-kz">
        <p ref={textRef} className="premium-reveal__text max-w-5xl mx-auto">
          {manifesto.map((char, i) => (
            <span key={`${char}-${i}`} className="premium-reveal__char">
              {char}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
