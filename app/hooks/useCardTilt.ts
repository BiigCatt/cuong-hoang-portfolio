"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

// Match the reference's restrained spring: 1 kg, 200 N/m, 20 N·s/m.
const STIFFNESS = 200;
const DAMPING = 20;
const PERSPECTIVE = 800;
const TILT_RANGE = 10; // Normalized pointer coordinates produce ±5 degrees.

export function useCardTilt(
  cardRef: RefObject<HTMLAnchorElement | null>,
  surfaceRef: RefObject<HTMLDivElement | null>
) {
  useGSAP(() => {
    const card = cardRef.current;
    const surface = surfaceRef.current;
    if (!card || !surface) return;

    const media = gsap.matchMedia();
    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        // Read the stationary link, rotate its child: reveal and stagger
        // transforms remain on the link and never fight the pointer motion.
        const setTransform = (value: string) => {
          surface.style.transform = value;
        };
        let bounds: DOMRect | null = null;
        let x = 0, y = 0, vx = 0, vy = 0;
        let targetX = 0, targetY = 0;
        let ticking = false;
        let listening = false;

        const stop = () => {
          gsap.ticker.remove(tick);
          ticking = false;
        };

        const tick = (_time: number, deltaMs: number) => {
          // Cap elapsed time after a background-tab pause; substep the
          // spring so its response stays stable on slower displays.
          const elapsed = Math.min(deltaMs / 1000, 1 / 30);
          const steps = Math.max(1, Math.ceil(elapsed * 120));
          const dt = elapsed / steps;
          for (let step = 0; step < steps; step++) {
            vx += (STIFFNESS * (targetX - x) - DAMPING * vx) * dt;
            vy += (STIFFNESS * (targetY - y) - DAMPING * vy) * dt;
            x += vx * dt;
            y += vy * dt;
          }
          setTransform(
            `perspective(${PERSPECTIVE}px) rotateX(${x}deg) rotateY(${y}deg)`
          );

          if (
            Math.abs(targetX - x) < 0.01 && Math.abs(targetY - y) < 0.01 &&
            Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01
          ) {
            x = targetX;
            y = targetY;
            vx = vy = 0;
            stop();
            if (x === 0 && y === 0) {
              surface.style.removeProperty("transform");
              surface.style.removeProperty("will-change");
              card.classList.remove("is-tilting");
            } else {
              setTransform(
                `perspective(${PERSPECTIVE}px) rotateX(${x}deg) rotateY(${y}deg)`
              );
            }
          }
        };

        const start = () => {
          if (ticking) return;
          surface.style.willChange = "transform";
          card.classList.add("is-tilting");
          ticking = true;
          gsap.ticker.add(tick);
        };

        const reset = () => {
          bounds = null;
          targetX = targetY = 0;
          if (x !== 0 || y !== 0 || vx !== 0 || vy !== 0) start();
        };

        const leave = () => {
          reset();
          window.removeEventListener("scroll", reset, true);
          window.removeEventListener("resize", reset);
          window.removeEventListener("blur", leave);
          listening = false;
        };

        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          bounds ??= card.getBoundingClientRect();
          if (!bounds.width || !bounds.height) return;
          const px = gsap.utils.clamp(-0.5, 0.5, (event.clientX - bounds.left) / bounds.width - 0.5);
          const py = gsap.utils.clamp(-0.5, 0.5, (event.clientY - bounds.top) / bounds.height - 0.5);
          targetX = -py * TILT_RANGE;
          targetY = px * TILT_RANGE;
          if (!listening) {
            // Only the card under the pointer listens for viewport changes.
            window.addEventListener("scroll", reset, { passive: true, capture: true });
            window.addEventListener("resize", reset, { passive: true });
            window.addEventListener("blur", leave);
            listening = true;
          }
          start();
        };

        card.addEventListener("pointerenter", move);
        card.addEventListener("pointermove", move, { passive: true });
        card.addEventListener("pointerleave", leave);
        card.addEventListener("pointercancel", leave);

        return () => {
          leave();
          stop();
          card.removeEventListener("pointerenter", move);
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          card.removeEventListener("pointercancel", leave);
          surface.style.removeProperty("transform");
          surface.style.removeProperty("will-change");
          card.classList.remove("is-tilting");
        };
      }
    );
    return () => media.revert();
  }, { scope: cardRef });
}
