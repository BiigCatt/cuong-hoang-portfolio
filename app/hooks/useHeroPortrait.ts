"use client";

import { useEffect, useRef, type MouseEvent } from "react";

type Phase = "idle" | "running" | "settled" | "ready" | "free";
const QUIET_MS = 450;

export function useHeroPortrait() {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);
  const clickRef = useRef<(keyboard: boolean) => void>(() => {});

  useEffect(() => {
    const hero = heroRef.current;
    const portrait = portraitRef.current;
    const button = scrollRef.current;
    if (!hero || !portrait || !button) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const echoes = new Set<HTMLElement>();
    let phase: Phase = "idle";
    let disposed = false;
    let generation = 0;
    let lastInput = 0;
    let quietTimer: ReturnType<typeof setTimeout> | undefined;

    const setPhase = (next: Phase) => {
      phase = next;
      hero.dataset.introPhase = next;
      button.setAttribute("aria-label", next === "idle"
        ? "Reveal portrait, then scroll to selected work"
        : "Scroll to selected work");
    };

    const release = () => {
      generation++;
      clearTimeout(quietTimer);
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      echoes.forEach((echo) => echo.remove());
      echoes.clear();
      portrait.style.removeProperty("will-change");
      setPhase("free");
    };

    const armNextGesture = () => {
      clearTimeout(quietTimer);
      if (phase !== "settled") return;
      quietTimer = setTimeout(() => {
        if (disposed || phase !== "settled") return;
        if (performance.now() - lastInput < QUIET_MS) { armNextGesture(); return; }
        setPhase("ready");
      }, QUIET_MS);
    };

    const play = () => {
      if (phase !== "idle") return;
      const id = ++generation;
      setPhase("running");
      portrait.style.willChange = "transform, opacity";
      const bounds = portrait.getBoundingClientRect();
      const start = -bounds.left - bounds.width - 30;
      const options = { duration: 1100, easing: "cubic-bezier(.77,0,.175,1)", fill: "forwards" as FillMode };
      const main = portrait.animate([
        { transform: `translateX(${start}px)`, opacity: 1 },
        { transform: "translateX(0)", opacity: 1 },
      ], options);
      animations.add(main);
      const current = [main];

      for (let i = 1; i <= 5; i++) {
        const echo = portrait.cloneNode(true) as HTMLElement;
        echo.setAttribute("aria-hidden", "true");
        echo.style.zIndex = "2";
        echo.style.opacity = "0";
        hero.append(echo);
        echoes.add(echo);
        const animation = echo.animate([
          { transform: `translateX(${start}px)`, opacity: 0 },
          { opacity: 0.32 - i * 0.035, offset: 0.12 },
          { transform: `translateX(${-42 * i}px)`, opacity: 0.18 - i * 0.02, offset: 0.75 },
          { transform: "translateX(0)", opacity: 0 },
        ], { ...options, delay: i * 70, fill: "both" });
        animations.add(animation);
        current.push(animation);
        const remove = () => { echo.remove(); echoes.delete(echo); animations.delete(animation); };
        animation.finished.then(remove, remove);
      }

      Promise.all(current.map((animation) => animation.finished)).then(() => {
        if (disposed || id !== generation) return;
        setPhase("settled");
        main.cancel();
        animations.delete(main);
        portrait.style.removeProperty("will-change");
        armNextGesture();
      }).catch(() => {});
    };

    const onWheel = (event: WheelEvent) => {
      if (phase === "free" || event.defaultPrevented || event.ctrlKey || event.deltaY <= 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (window.scrollY > 8) { release(); return; }
      lastInput = performance.now();
      if (phase === "ready") { release(); return; }
      event.preventDefault();
      if (phase === "idle") play();
      else if (phase === "settled") armNextGesture();
    };

    let touchY = 0;
    let touchPhase: Phase = "idle";
    const onTouchStart = (event: TouchEvent) => { touchY = event.touches[0].clientY; touchPhase = phase; };
    const onTouchMove = (event: TouchEvent) => {
      if (phase === "free" || touchY - event.touches[0].clientY < 12) return;
      if (touchPhase === "ready") { release(); return; }
      event.preventDefault();
      lastInput = performance.now();
      if (phase === "idle") play();
      else if (phase === "settled") armNextGesture();
    };
    const onKey = (event: KeyboardEvent) => {
      if (["PageDown", "ArrowDown", " ", "End", "Tab"].includes(event.key)) release();
    };
    const onNavigation = (event: globalThis.MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a[href^="#"]')) release();
    };
    const onMotionChange = () => { if (motion.matches) release(); };

    clickRef.current = (keyboard) => {
      if (keyboard || motion.matches) release();
      if (phase === "idle") { play(); return; }
      if (phase === "running" || phase === "settled") return;
      release();
      document.getElementById("work")?.scrollIntoView({ behavior: keyboard || motion.matches ? "instant" : "smooth" });
    };

    if (motion.matches || window.scrollY > 8 || window.location.hash) release();
    else setPhase("idle");
    window.addEventListener("wheel", onWheel, { passive: false });
    hero.addEventListener("touchstart", onTouchStart, { passive: true });
    hero.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onNavigation);
    window.addEventListener("resize", release);
    motion.addEventListener("change", onMotionChange);

    return () => {
      disposed = true;
      release();
      delete hero.dataset.introPhase;
      clickRef.current = () => {};
      window.removeEventListener("wheel", onWheel);
      hero.removeEventListener("touchstart", onTouchStart);
      hero.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onNavigation);
      window.removeEventListener("resize", release);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return { heroRef, portraitRef, scrollRef, onScrollClick: (event: MouseEvent<HTMLButtonElement>) => clickRef.current(event.detail === 0) };
}
