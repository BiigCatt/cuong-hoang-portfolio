"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects } from "../data/projects";

export default function Home() {
  const router = useRouter();

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  useEffect(() => {
    /* =========================
       CUSTOM CURSOR
    ========================= */

    const cursor = document.querySelector(".custom-cursor");

    const moveCursor = (event: MouseEvent) => {
      if (!cursor) return;

      (cursor as HTMLElement).style.left =
        `${event.clientX}px`;

      (cursor as HTMLElement).style.top =
        `${event.clientY}px`;
    };

    const interactiveElements =
      document.querySelectorAll("[data-cursor]");

    const addHover = () => {
      if (!cursor) return;

      cursor.classList.add("hover");
    };

    const removeHover = () => {
      if (!cursor) return;

      cursor.classList.remove("hover");
    };

    window.addEventListener("mousemove", moveCursor);

    interactiveElements.forEach((element) => {
      element.addEventListener(
        "mouseenter",
        addHover
      );

      element.addEventListener(
        "mouseleave",
        removeHover
      );
    });

    /* =========================
       PROJECT SCROLL REVEAL
    ========================= */

    const projectElements =
      document.querySelectorAll(".project");

    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            projectObserver.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    projectElements.forEach((project) => {
      projectObserver.observe(project);
    });

    /* =========================
       NAVBAR SCROLL STATE
    ========================= */

    const nav = document.querySelector(".nav");

    const handleNavScroll = () => {
      if (!nav) return;

      if (window.scrollY > 40) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    };

    handleNavScroll();

    window.addEventListener(
      "scroll",
      handleNavScroll,
      {
        passive: true,
      }
    );

    /* =========================
       CLEANUP
    ========================= */

    return () => {
      window.removeEventListener(
        "mousemove",
        moveCursor
      );

      interactiveElements.forEach((element) => {
        element.removeEventListener(
          "mouseenter",
          addHover
        );

        element.removeEventListener(
          "mouseleave",
          removeHover
        );
      });

      projectObserver.disconnect();

      window.removeEventListener(
        "scroll",
        handleNavScroll
      );
    };
  }, []);

  /* =========================
     PAGE TRANSITION
  ========================= */

  const openProject = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    if (isTransitioning) return;

    setIsTransitioning(true);

    window.setTimeout(() => {
      router.push(href);
    }, 450);
  };

  return (
    <main className="portfolio">
      {/* PAGE TRANSITION OVERLAY */}

      <div
        className={`page-transition ${
          isTransitioning ? "is-active" : ""
        }`}
      />

      {/* CUSTOM CURSOR */}

      <div className="custom-cursor" />

      {/* =========================
          NAV
      ========================= */}

      <nav className="nav">
        <div className="logo">
          CUONG HOANG
        </div>

        <div className="nav-right">
          <a
            href="#work"
            className="nav-item"
            data-cursor
          >
            WORK
          </a>

          <a
            href="#about"
            className="nav-item"
            data-cursor
          >
            ABOUT
          </a>

          <a
            href="#contact"
            className="nav-item"
            data-cursor
          >
            CONTACT
          </a>
        </div>
      </nav>

      {/* =========================
          HERO
      ========================= */}

      <section className="hero">
        <div className="hero-title">
          <div className="hero-line">
            <span>MEDIA</span>
          </div>

          <div className="hero-line">
            <span>MOTION</span>
          </div>

          <div className="hero-line indent">
            <span>DESIGNER</span>
          </div>
        </div>

        <div className="hero-bottom">
          <span>BASED IN VIETNAM</span>

          <span>SCROLL ↓</span>

          <span>2026</span>
        </div>
      </section>

      {/* =========================
          WORK
      ========================= */}

      <section
        className="work-section"
        id="work"
      >
        <div className="section-header">
          <span>SELECTED WORK</span>

          <span>2025 — 2026</span>
        </div>

        <div className="projects">
          {projects.map((project, index) => {
            const href =
              `/work/${project.slug}`;

            return (
              <Link
                href={href}
                className={`project project-${
                  index + 1
                }`}
                key={project.number}
                data-cursor
                onClick={(event) =>
                  openProject(event, href)
                }
              >
                <div className="project-visual">
                  {project.cover ? (
                    <Image
                      src={project.cover}
                      alt={`${project.title} cover`}
                      fill
                      sizes="100vw"
                      className="project-cover"
                    />
                  ) : (
                    <div className="project-placeholder">
                      <span>
                        PROJECT {project.number}
                      </span>
                    </div>
                  )}
                </div>

                <div className="project-info">
                  <div className="project-number">
                    {project.number}
                  </div>

                  <div className="project-title">
                    {project.title}
                  </div>

                  <div className="project-meta">
                    <span>
                      {project.category}
                    </span>

                    <span>
                      {project.year}
                    </span>
                  </div>

                  <div className="project-arrow">
                    ↗
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =========================
          ABOUT
      ========================= */}

      <section
        id="about"
        className="about-section"
      >
        <div className="about-header">
          <span>ABOUT</span>

          <span>01</span>
        </div>

        <div className="about-main">
          <div className="about-intro">
            <p>
              I CREATE VISUAL STORIES
              THROUGH FILM, MOTION
              AND DESIGN.
            </p>
          </div>

          <div className="about-details">
            <div className="about-location">
              <span className="about-label">
                BASED IN
              </span>

              <span>VIETNAM</span>
            </div>

            <div className="about-role">
              <span className="about-label">
                WHAT I DO
              </span>

              <div className="about-role-list">
                <span>DIRECTOR</span>
                <span>DOP</span>
                <span>EDITOR</span>
                <span>MEDIA PRODUCTION</span>
                <span>MOTION DESIGN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CONTACT
      ========================= */}

      <section
        id="contact"
        className="contact-section"
      >
        <div className="contact-header">
          <span>CONTACT</span>

          <span>02</span>
        </div>

        <div className="contact-main">
          <p className="contact-title">
            HAVE A PROJECT
            IN MIND?
          </p>

          <a
            href="mailto:caocuong749@gmail.com"
            className="contact-cta"
            data-cursor
          >
            LET&apos;S TALK ↗
          </a>
        </div>

        <div className="contact-footer">
          <div className="contact-links">
            <a
              href="mailto:caocuong749@gmail.com"
              data-cursor
            >
              EMAIL
            </a>

            <a
              href="https://www.instagram.com/no.6rt/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
            >
              INSTAGRAM
            </a>

            <a
              href="https://www.youtube.com/@TheHillsOfficial-ME"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
            >
              YOUTUBE
            </a>

            <a
              href="https://www.behance.net/caocuong749"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
            >
              BEHANCE
            </a>
          </div>

          <span>
            © 2026 CUONG HOANG
          </span>
        </div>
      </section>
    </main>
  );
}