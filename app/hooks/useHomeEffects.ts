"use client";

import { useEffect } from "react";

/* =========================================================
   HIỆU ỨNG TRANG CHỦ
   Tách khỏi page.tsx cho gọn. Logic giữ nguyên.
   `refreshKey` đổi (ví dụ khi đổi filter) -> gắn lại listener
   cho các phần tử mới render.
========================================================= */

/** Con trỏ tuỳ chỉnh: bám chuột + đổi trạng thái khi hover [data-cursor]. */
export function useCustomCursor(refreshKey: unknown) {
  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");

    const moveCursor = (event: MouseEvent) => {
      if (!cursor) return;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const addHover = () => cursor?.classList.add("hover");
    const removeHover = () => cursor?.classList.remove("hover");

    const interactiveElements = document.querySelectorAll("[data-cursor]");

    window.addEventListener("mousemove", moveCursor);

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", addHover);
      element.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", addHover);
        element.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [refreshKey]);
}

/** Thêm class "is-visible" cho từng card khi cuộn tới (hiệu ứng hiện dần). */
export function useRevealOnScroll(refreshKey: unknown) {
  useEffect(() => {
    const projectElements = document.querySelectorAll(".editorial-project");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -4% 0px",
      }
    );

    projectElements.forEach((project) => observer.observe(project));

    return () => observer.disconnect();
  }, [refreshKey]);
}

/** Thêm class "nav-scrolled" cho .nav khi cuộn quá 40px. */
export function useNavScrolled() {
  useEffect(() => {
    const nav = document.querySelector(".nav");

    const handleScroll = () => {
      if (!nav) return;

      if (window.scrollY > 40) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
