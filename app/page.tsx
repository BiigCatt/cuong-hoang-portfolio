"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  projects,
  ProjectType,
} from "../data/projects";

/* =========================================================
   TYPES
========================================================= */

type FilterType =
  | "all"
  | ProjectType;

const categoryFilters: {
  label: string;
  value: ProjectType;
}[] = [
  {
    label: "FILM",
    value: "film",
  },
  {
    label: "MOTION",
    value: "motion",
  },
  {
    label: "SHORT-FORM",
    value: "short-form",
  },
  {
    label: "PHOTOGRAPHY",
    value: "photography",
  },
];

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const router = useRouter();

  const [
    activeFilter,
    setActiveFilter,
  ] = useState<FilterType>("all");

  const [
    isTransitioning,
    setIsTransitioning,
  ] = useState(false);

  /* =========================================================
     FILTER PROJECTS
  ========================================================= */

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.type === activeFilter
    );
  }, [activeFilter]);

  /* =========================================================
     CUSTOM CURSOR
  ========================================================= */

  useEffect(() => {
    const cursor =
      document.querySelector(
        ".custom-cursor"
      );

    const moveCursor = (
      event: MouseEvent
    ) => {
      if (!cursor) return;

      (
        cursor as HTMLElement
      ).style.left =
        `${event.clientX}px`;

      (
        cursor as HTMLElement
      ).style.top =
        `${event.clientY}px`;
    };

    const interactiveElements =
      document.querySelectorAll(
        "[data-cursor]"
      );

    const addHover = () => {
      if (!cursor) return;

      cursor.classList.add("hover");
    };

    const removeHover = () => {
      if (!cursor) return;

      cursor.classList.remove("hover");
    };

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    interactiveElements.forEach(
      (element) => {
        element.addEventListener(
          "mouseenter",
          addHover
        );

        element.addEventListener(
          "mouseleave",
          removeHover
        );
      }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        moveCursor
      );

      interactiveElements.forEach(
        (element) => {
          element.removeEventListener(
            "mouseenter",
            addHover
          );

          element.removeEventListener(
            "mouseleave",
            removeHover
          );
        }
      );
    };
  }, [activeFilter]);

  /* =========================================================
     PROJECT SCROLL REVEAL
  ========================================================= */

  useEffect(() => {
    const projectElements =
      document.querySelectorAll(
        ".project"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "is-visible"
                );

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.1,
          rootMargin:
            "0px 0px -5% 0px",
        }
      );

    projectElements.forEach(
      (project) => {
        observer.observe(project);
      }
    );

    return () => {
      observer.disconnect();
    };
  }, [activeFilter]);

  /* =========================================================
     NAVBAR SCROLL
  ========================================================= */

  useEffect(() => {
    const nav =
      document.querySelector(".nav");

    const handleScroll = () => {
      if (!nav) return;

      if (window.scrollY > 40) {
        nav.classList.add(
          "nav-scrolled"
        );
      } else {
        nav.classList.remove(
          "nav-scrolled"
        );
      }
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =========================================================
     PAGE TRANSITION
  ========================================================= */

  const openProject = (
    event:
      React.MouseEvent<
        HTMLAnchorElement
      >,
    href: string
  ) => {
    event.preventDefault();

    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);

    window.setTimeout(() => {
      router.push(href);
    }, 450);
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <main className="portfolio">

      {/* =====================================================
          PAGE TRANSITION
      ===================================================== */}

      <div
        className={`page-transition ${
          isTransitioning
            ? "is-active"
            : ""
        }`}
      />

      {/* =====================================================
          CUSTOM CURSOR
      ===================================================== */}

      <div className="custom-cursor" />

      {/* =====================================================
          NAV
      ===================================================== */}

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

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">

        <div className="hero-title">

          <div className="hero-line">
            <span>
              MEDIA
            </span>
          </div>

          <div className="hero-line">
            <span>
              MOTION
            </span>
          </div>

          <div className="hero-line indent">
            <span>
              DESIGNER
            </span>
          </div>

        </div>

        <div className="hero-bottom">

          <span>
            BASED IN VIETNAM
          </span>

          <span>
            SCROLL ↓
          </span>

          <span>
            2026
          </span>

        </div>

      </section>

      {/* =====================================================
          WORK
      ===================================================== */}

      <section
        className="work-section"
        id="work"
      >

        {/* =================================================
            WORK HEADER
        ================================================= */}

        <div className="section-header">

          <span>
            SELECTED WORK
          </span>

          <span>
            2025 — 2026
          </span>

        </div>

        {/* =================================================
            FILTER
        ================================================= */}

        <div className="work-filter">

          {/* ALL — LEFT */}

          <div className="work-filter-left">

            <button
              type="button"
              className={`work-filter-button ${
                activeFilter === "all"
                  ? "is-active"
                  : ""
              }`}
              onClick={() =>
                setActiveFilter("all")
              }
              data-cursor
            >
              ALL
            </button>

          </div>

          {/* 4 FILTERS — CENTER */}

          <div className="work-filter-center">

            {categoryFilters.map(
              (filter) => (

                <button
                  key={filter.value}
                  type="button"
                  className={`work-filter-button ${
                    activeFilter ===
                    filter.value
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveFilter(
                      filter.value
                    )
                  }
                  data-cursor
                >
                  {filter.label}
                </button>

              )
            )}

          </div>

          {/* PROJECT COUNT */}

          <div className="work-filter-count">

            {String(
              filteredProjects.length
            ).padStart(2, "0")}

            <span>
              {" / "}
            </span>

            {String(
              projects.length
            ).padStart(2, "0")}

          </div>

        </div>

        {/* =================================================
            PROJECT LIST
        ================================================= */}

        <div
          className={`projects projects-filter-${activeFilter}`}
          key={activeFilter}
        >

          {filteredProjects.map(
            (project) => {

              const href =
                `/work/${project.slug}`;

              /*
               * PROJECT 01 chỉ dùng layout
               * đặc biệt khi đang ở ALL.
               */

              const isFeatured =
                activeFilter === "all" &&
                project.number === "01";

              return (

                <Link
                  href={href}
                  key={project.number}
                  className={`project project-type-${project.type} ${
                    isFeatured
                      ? "project-featured"
                      : ""
                  }`}
                  data-cursor
                  onClick={(event) =>
                    openProject(
                      event,
                      href
                    )
                  }
                >

                  {isFeatured ? (

                    /* =============================================
                       PROJECT 01 — FEATURED
                    ============================================= */

                    <div className="featured-project">

                      {/* =========================================
                          BLACK & WHITE BACKGROUND
                      ========================================= */}

                      <div className="featured-background">

                        {project.cover && (

                          <Image
                            src={
                              project.cover
                            }
                            alt={
                              project.title
                            }
                            fill
                            priority
                            sizes="100vw"
                            className="featured-background-image"
                          />

                        )}

                        <div className="featured-overlay" />

                      </div>

                      {/* =========================================
                          TOP INFORMATION
                      ========================================= */}

                      <div className="featured-top">

                        <span>
                          PROJECT{" "}
                          {
                            project.number
                          }
                        </span>

                        <div className="featured-top-center">

                          <span>
                            {
                              project.category
                            }
                          </span>

                          <strong>
                            CUONG HOANG
                          </strong>

                        </div>

                        <span className="featured-year">
                          {
                            project.year
                          }
                        </span>

                      </div>

                      {/* =========================================
                          SMALL COLOR IMAGE

                          CÙNG ẢNH VỚI BACKGROUND
                          NHƯNG GIỮ MÀU GỐC
                      ========================================= */}

                      <div className="featured-small-image">

                        {project.cover && (

                          <Image
                            src={
                              project.cover
                            }
                            alt={`${project.title} color preview`}
                            fill
                            sizes="35vw"
                            className="featured-small-image-content"
                          />

                        )}

                      </div>

                      {/* =========================================
                          PLAY BUTTON
                      ========================================= */}

                      <div className="featured-center">

                        <div className="featured-play">
                          PLAY
                        </div>

                      </div>

                      {/* =========================================
                          PROJECT TITLE
                      ========================================= */}

                      <div className="featured-title">

                        <span>
                          CMC DATA
                        </span>

                        <span>
                          CENTER
                        </span>

                      </div>

                      {/* =========================================
                          FILM

                          ĐÂY CHÍNH LÀ ĐOẠN MÀY HỎI
                      ========================================= */}

                      <div className="featured-film-wrap">

                        <div className="featured-side-title">
                          FILM
                        </div>

                      </div>

                      {/* =========================================
                          BOTTOM INFORMATION
                      ========================================= */}

                      <div className="featured-bottom">

                        <span>
                          DIRECTOR / DOP / EDITOR
                        </span>

                        <span>
                          VIEW PROJECT
                        </span>

                      </div>

                    </div>

                  ) : (

                    /* =============================================
                       NORMAL PROJECT CARD
                    ============================================= */

                    <>

                      <div className="project-visual">

                        {project.cover ? (

                          <Image
                            src={
                              project.cover
                            }
                            alt={`${project.title} cover`}
                            fill
                            sizes="100vw"
                            className="project-cover"
                          />

                        ) : (

                          <div className="project-placeholder">

                            <span>
                              PROJECT{" "}
                              {
                                project.number
                              }
                            </span>

                          </div>

                        )}

                        {/* PROJECT TYPE */}

                        <div className="project-type-badge">

                          {project.type ===
                            "film" &&
                            "FILM"}

                          {project.type ===
                            "motion" &&
                            "MOTION"}

                          {project.type ===
                            "short-form" &&
                            "SHORT-FORM"}

                          {project.type ===
                            "photography" &&
                            "PHOTOGRAPHY"}

                        </div>

                      </div>

                      {/* PROJECT INFO */}

                      <div className="project-info">

                        <div className="project-number">
                          {
                            project.number
                          }
                        </div>

                        <div className="project-title">
                          {
                            project.title
                          }
                        </div>

                        <div className="project-meta">

                          <span>
                            {
                              project.category
                            }
                          </span>

                          <span>
                            {
                              project.year
                            }
                          </span>

                        </div>

                      </div>

                    </>

                  )}

                </Link>

              );

            }
          )}

        </div>

      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        id="about"
        className="about-section"
      >

        <div className="about-header">

          <span>
            ABOUT
          </span>

          <span>
            01
          </span>

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

              <span>
                VIETNAM
              </span>

            </div>

            <div className="about-role">

              <span className="about-label">
                WHAT I DO
              </span>

              <div className="about-role-list">

                <span>
                  DIRECTOR
                </span>

                <span>
                  DOP
                </span>

                <span>
                  EDITOR
                </span>

                <span>
                  MEDIA PRODUCTION
                </span>

                <span>
                  MOTION DESIGN
                </span>

                <span>
                  PHOTOGRAPHY
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section
        id="contact"
        className="contact-section"
      >

        <div className="contact-header">

          <span>
            CONTACT
          </span>

          <span>
            02
          </span>

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