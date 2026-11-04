"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ScrollRevealTextProps = {
  text: string;
  enabled?: boolean;
};

export default function ScrollRevealText({
  text,
  enabled = false,
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.trim().split(/\s+/).filter(Boolean);
  const revealWords = words.length > 3;

  useGSAP(() => {
    const root = ref.current;
    if (!root) return;
    const units = root.querySelectorAll<HTMLElement>("[data-reveal-unit]");
    const clear = () => units.forEach((unit) => unit.style.removeProperty("opacity"));
    clear();
    if (!enabled || !units.length) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {

      // Match the reference's overlapping fades. Short headings reveal
      // letters; longer statements reveal whole words at a time.
      gsap.set(units, { opacity: 0.2 });
      const tween = gsap.to(units, {
        opacity: 1,
        duration: 0.22,
        stagger: { amount: 0.8 },
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "clamp(top 90%)",
          end: "clamp(bottom 60%)",
          scrub: true,
        },
      });

      let mounted = true;
      void document.fonts.ready.then(() => {
        if (mounted) tween.scrollTrigger?.refresh();
      });
      return () => {
        mounted = false;
        clear();
      };
    });
    return () => {
      media.revert();
      clear();
    };
  }, { scope: ref, dependencies: [enabled, text], revertOnUpdate: true });

  return (
    <span ref={ref} className="scroll-reveal-text" data-scroll-reveal={enabled ? "active" : "off"}>
      <span className="scroll-reveal-accessible">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            {index > 0 && " "}
            <span className="scroll-reveal-word" data-reveal-unit={revealWords ? "" : undefined}>
              {revealWords ? word : Array.from(word).map((letter, letterIndex) => (
                <span key={letterIndex} data-reveal-unit="">{letter}</span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
