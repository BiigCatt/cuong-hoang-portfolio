"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useCustomCursor(activeFilter: string) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      scope.current = document.querySelector<HTMLElement>(".portfolio");
      const cursor = scope.current?.querySelector<HTMLElement>(".custom-cursor");
      if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

      const moveCursor = gsap.quickTo(cursor, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      const moveCursorY = gsap.quickTo(cursor, "y", {
        duration: 0.35,
        ease: "power3.out",
      });
      let pointerX = window.innerWidth / 2;
      let pointerY = window.innerHeight / 2;
      const syncHover = (target: EventTarget | null) => {
        const element = target instanceof Element ? target : null;
        cursor.classList.toggle("hover", Boolean(element?.closest("[data-cursor]")));
      };

      const onMove = contextSafe?.((event: MouseEvent) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        moveCursor(event.clientX);
        moveCursorY(event.clientY);
        syncHover(event.target);
      });
      const onPointerOver = contextSafe?.((event: PointerEvent) => {
        syncHover(event.target);
      });
      const onPointerOut = contextSafe?.((event: PointerEvent) => {
        const next = event.relatedTarget as Element | null;
        if (!next?.closest("[data-cursor]")) cursor.classList.remove("hover");
      });
      const onScroll = contextSafe?.(() => {
        syncHover(document.elementFromPoint(pointerX, pointerY));
      });

      if (!onMove || !onPointerOver || !onPointerOut || !onScroll) return;
      window.addEventListener("mousemove", onMove);
      window.addEventListener("pointerover", onPointerOver);
      window.addEventListener("pointerout", onPointerOut);
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("pointerover", onPointerOver);
        window.removeEventListener("pointerout", onPointerOut);
        window.removeEventListener("scroll", onScroll);
      };
    },
    { scope, dependencies: [activeFilter], revertOnUpdate: true }
  );

  return scope;
}

export function useRevealOnScroll(activeFilter: string) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      scope.current = document.querySelector<HTMLElement>(".portfolio");
      const cards = gsap.utils.toArray<HTMLElement>(".editorial-project", scope.current);
      if (!cards.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(cards, { clearProps: "opacity" });
        cards.forEach((card) => card.classList.add("is-visible"));
        return;
      }

      gsap.set(cards, { opacity: 0 });
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          batch.forEach((card) => card.classList.add("is-visible"));
          gsap.fromTo(batch, { opacity: 0 }, {
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    },
    { scope, dependencies: [activeFilter], revertOnUpdate: true }
  );

  return scope;
}

export function useNavScrolled() {
  useGSAP(() => {
    const nav = document.querySelector<HTMLElement>(".nav");
    if (!nav) return;

    const updateNav = () => nav.classList.toggle("scrolled", window.scrollY > 30);
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  });
}

export function useHeroIntro() {
  useGSAP(() => {
    const portfolio = document.querySelector<HTMLElement>(".portfolio");
    if (!portfolio) return;

    const lines = portfolio.querySelectorAll(".hero-line span");
    const footer = portfolio.querySelector(".hero-bottom");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo(lines, { yPercent: 110, autoAlpha: 0 }, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.05,
        stagger: 0.13,
      })
      .fromTo(footer, { y: 12, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 0.55,
        duration: 0.8,
      }, "-=0.36");
  }, { revertOnUpdate: true });
}
