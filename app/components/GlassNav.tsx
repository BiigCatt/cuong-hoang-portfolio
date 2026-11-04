"use client";

import { useEffect, useState, type ReactNode } from "react";

type GlassNavProps = {
  className: string;
  children: ReactNode;
};

export default function GlassNav({ className, children }: GlassNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav className={`${className} nav-glass${isScrolled ? " is-scrolled" : ""}`}>
      {children}
    </nav>
  );
}
