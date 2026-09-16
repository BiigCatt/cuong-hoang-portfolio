"use client";

import { useEffect, useState } from "react";

export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="logo">CUONG HOANG</div>

      <div className="nav-right">
        <a href="#work" className="nav-item" data-cursor>
          WORK
        </a>
        <a href="#about" className="nav-item" data-cursor>
          ABOUT
        </a>
        <a href="#contact" className="nav-item" data-cursor>
          CONTACT
        </a>
      </div>
    </nav>
  );
}
