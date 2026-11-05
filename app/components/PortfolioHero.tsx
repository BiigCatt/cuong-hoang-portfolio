"use client";

import Image from "next/image";
import { useHeroPortrait } from "../hooks/useHeroPortrait";
import styles from "./PortfolioHero.module.css";

const WORDS = ["CUONG", "HOANG", "PORTFOLIO"];

export default function PortfolioHero() {
  const { heroRef, portraitRef, scrollRef, onScrollClick } = useHeroPortrait();

  return (
    <section className={styles.hero} ref={heroRef} aria-label="Introduction">
      <h1 className={styles.title} aria-label="Cuong Hoang — Portfolio">
        {WORDS.map((word) => (
          <span className={styles.word} key={word} aria-hidden="true">{word}</span>
        ))}
      </h1>

      <div className={styles.outlineTitle} aria-hidden="true">
        {WORDS.map((word) => (
          <span className={styles.word} key={word}>{word}</span>
        ))}
      </div>

      <figure className={styles.portrait} ref={portraitRef}>
        <Image
          src="/images/hero/cuong-hoang.png"
          alt="Cuong Hoang holding a camera and gimbal"
          fill
          preload
          sizes="(max-width: 760px) 72vw, 43vw"
          className={styles.image}
        />
      </figure>

      <div className={styles.bottom}>
        <button
          type="button"
          ref={scrollRef}
          className={styles.scroll}
          onClick={onScrollClick}
          aria-label="Reveal portrait, then scroll to selected work"
          data-cursor
        >
          <span>SCROLL</span>
          <span className={styles.arrowWindow} aria-hidden="true">
            <span className={styles.arrowTrack}><span>↓</span><span>↓</span></span>
          </span>
        </button>
      </div>
    </section>
  );
}
