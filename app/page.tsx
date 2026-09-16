"use client";

import {
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  projects,
  type Project,
  type ProjectType,
} from "../data/projects";

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

type EditorialProjectCardProps = {
  project: Project;
  className?: string;

  onOpen?: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => void;
};

function EditorialProjectCard({
  project,
  className = "",
  onOpen,
}: EditorialProjectCardProps) {
  const href = `/work/${project.slug}`;

  const showPlay =
    project.type === "film" ||
    project.type === "short-form";

  const isGif =
    project.cover?.toLowerCase().endsWith(".gif") ??
    false;

  return (
    <Link
      href={href}
      className={`editorial-project ${className}`}
      data-cursor
      onClick={(event) => {
        if (onOpen) {
          onOpen(event, href);
        }
      }}
    >

      {/* IMAGE */}

      <div className="editorial-project-media">

        {project.cover ? (

          isGif ? (

            <img
              src={project.cover}
              alt={project.title}
              className="editorial-project-image editorial-project-gif"
            />

          ) : (

            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="100vw"
              className="editorial-project-image"
            />

          )

        ) : (

          <div className="editorial-project-placeholder">
            {project.number}
          </div>

        )}

      </div>


      {/* SHADE */}

      <div className="editorial-project-shade" />


      {/* TOP META */}

      <div className="editorial-project-top">

        <span>
          PROJECT {project.number}
        </span>

        {project.year && (
          <span>
            {project.year}
          </span>
        )}

      </div>


      {/* BOTTOM */}

      <div className="editorial-project-bottom">

        <div>

          <h3>
            {project.title}
          </h3>

          <span>
            {project.category}
          </span>

        </div>


        <span className="editorial-project-play">

          {showPlay ? (

            <span className="editorial-project-play-icon">
              ▶
            </span>

          ) : (

            <span className="editorial-project-play-text">
              VIEW
            </span>

          )}

        </span>

      </div>

    </Link>
  );
}

function EditorialSectionHeader({
  title,
  count,
  index,
  note,
}: {
  title: string;
  count: number;
  index: string;
  note: string;
}) {
  return (
    <div className="editorial-category-header">
      <div className="editorial-category-title">
        <h2>{title}</h2>

        <span>
          / {String(count).padStart(2, "0")}
        </span>
      </div>

      <div className="editorial-category-right">
        <span>{note}</span>
        <span>{index}</span>
      </div>
    </div>
  );
}

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

  const filmProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.type === "film"
      ),
    []
  );

  const motionProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.type === "motion"
      ),
    []
  );

  const shortProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.type ===
          "short-form"
      ),
    []
  );

  const photoProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.type ===
          "photography"
      ),
    []
  );

  const activeCount = useMemo(() => {
    if (activeFilter === "all") {
      return projects.length;
    }

    return projects.filter(
      (project) =>
        project.type === activeFilter
    ).length;
  }, [activeFilter]);

  const showFilm =
    activeFilter === "all" ||
    activeFilter === "film";

  const showMotion =
    activeFilter === "all" ||
    activeFilter === "motion";

  const showShort =
    activeFilter === "all" ||
    activeFilter === "short-form";

  const showPhotography =
    activeFilter === "all" ||
    activeFilter === "photography";

  useEffect(() => {
    const cursor =
      document.querySelector(
        ".custom-cursor"
      );

    const moveCursor = (
      event: globalThis.MouseEvent
    ) => {
      if (!cursor) return;

      const element =
        cursor as HTMLElement;

      element.style.left =
        `${event.clientX}px`;

      element.style.top =
        `${event.clientY}px`;
    };

    const interactiveElements =
      document.querySelectorAll(
        "[data-cursor]"
      );

    const addHover = () => {
      cursor?.classList.add("hover");
    };

    const removeHover = () => {
      cursor?.classList.remove(
        "hover"
      );
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

  useEffect(() => {
    const projectElements =
      document.querySelectorAll(
        ".editorial-project"
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
          threshold: 0.08,
          rootMargin:
            "0px 0px -4% 0px",
        }
      );

    projectElements.forEach(
      (project) => {
        observer.observe(project);
      }
    );

    return () =>
      observer.disconnect();
  }, [activeFilter]);

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

  const openProject = (
    event:
      MouseEvent<HTMLAnchorElement>,
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

  const filmRowTwo =
    filmProjects.slice(1, 4);

  /*
   * FORM ĐÃ CHỐT
   *
   * ROW 1: 01
   * ROW 2: 02 / 03 / 04
   * ROW 3: 08 / 09
   * ROW 4: 06 / 07 / 05
   */

  const filmRowThree = [
    filmProjects[7],
    filmProjects[8],
  ].filter(
    (
      project
    ): project is Project =>
      Boolean(project)
  );

  const filmRowFour = [
    filmProjects[5],
    filmProjects[6],
    filmProjects[4],
  ].filter(
    (
      project
    ): project is Project =>
      Boolean(project)
  );

  return (
    <main className="portfolio">
      <div
        className={`page-transition ${
          isTransitioning
            ? "is-active"
            : ""
        }`}
      />

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
          EDITORIAL WORK
      ===================================================== */}

      <section
        id="work"
        className="editorial-work-section"
      >
        <div className="editorial-work-heading">
          <h1>
            SELECTED WORK
          </h1>

          <span>
            {String(
              activeCount
            ).padStart(2, "0")}
            {" / "}
            {String(
              projects.length
            ).padStart(2, "0")}
          </span>
        </div>

        {/* FILTER */}

        <div className="editorial-filter">
          <button
            type="button"
            className={
              activeFilter === "all"
                ? "is-active"
                : ""
            }
            onClick={() =>
              setActiveFilter("all")
            }
            data-cursor
          >
            ALL
          </button>

          {categoryFilters.map(
            (filter) => (
              <button
                key={filter.value}
                type="button"
                className={
                  activeFilter ===
                  filter.value
                    ? "is-active"
                    : ""
                }
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

        {/* =================================================
            FILM
        ================================================= */}

        {showFilm && (
          <section className="editorial-category editorial-film">
            <EditorialSectionHeader
              title="FILM"
              count={
                filmProjects.length
              }
              index="01"
              note="STORIES FOR A WIDER TOMORROW"
            />

            {filmProjects[0] && (
              <EditorialProjectCard
                project={
                  filmProjects[0]
                }
                className="film-hero"
                onOpen={openProject}
              />
            )}

            <div className="film-row film-row-three">
              {filmRowTwo.map(
                (project) => (
                  <EditorialProjectCard
                    key={
                      project.number
                    }
                    project={project}
                    className="film-small"
                    onOpen={
                      openProject
                    }
                  />
                )
              )}
            </div>

            {/* ROW 3 — 08 / 09 */}

            <div className="film-row film-row-two">
              {filmRowThree.map(
                (project) => (
                  <EditorialProjectCard
                    key={
                      project.number
                    }
                    project={project}
                    className="film-wide"
                    onOpen={
                      openProject
                    }
                  />
                )
              )}
            </div>

            {/* ROW 4 — 06 / 07 / 05 */}

            <div className="film-row film-row-three">
              {filmRowFour.map(
                (project) => (
                  <EditorialProjectCard
                    key={
                      project.number
                    }
                    project={project}
                    className="film-small"
                    onOpen={
                      openProject
                    }
                  />
                )
              )}
            </div>
          </section>
        )}

        {/* =================================================
            MOTION
        ================================================= */}

        {showMotion && (
          <section className="editorial-category editorial-motion">
            <EditorialSectionHeader
              title="MOTION"
              count={
                motionProjects.length
              }
              index="02"
              note="IDEAS IN MOTION"
            />

            <div className="editorial-motion-grid">
              {motionProjects[0] && (
                <EditorialProjectCard
                  project={
                    motionProjects[0]
                  }
                  className="motion-main"
                  onOpen={
                    openProject
                  }
                />
              )}

              {motionProjects[1] && (
                <EditorialProjectCard
                  project={
                    motionProjects[1]
                  }
                  className="motion-side motion-side-top"
                  onOpen={
                    openProject
                  }
                />
              )}

              {motionProjects[2] && (
                <EditorialProjectCard
                  project={
                    motionProjects[2]
                  }
                  className="motion-side motion-side-bottom"
                  onOpen={
                    openProject
                  }
                />
              )}
            </div>
          </section>
        )}

        {/* =================================================
            SHORT FORM
        ================================================= */}

        {showShort && (
          <section className="editorial-category editorial-short">
            <EditorialSectionHeader
              title="SHORT-FORM"
              count={
                shortProjects.length
              }
              index="03"
              note="SMALL FORMAT. BIG STORIES."
            />

            <div className="editorial-short-grid">
              {shortProjects.map(
                (project) => (
                  <EditorialProjectCard
                    key={
                      project.number
                    }
                    project={project}
                    className="short-card"
                    onOpen={
                      openProject
                    }
                  />
                )
              )}
            </div>
          </section>
        )}

        {/* =================================================
            PHOTOGRAPHY
        ================================================= */}

        {showPhotography && (
          <section className="editorial-category editorial-photo">
            <EditorialSectionHeader
              title="PHOTOGRAPHY"
              count={
                photoProjects.length
              }
              index="04"
              note="PEOPLE. PLACES. MOMENTS."
            />

            <div className="editorial-photo-grid">
              {photoProjects[0] && (
                <EditorialProjectCard
                  project={
                    photoProjects[0]
                  }
                  className="photo-main"
                  onOpen={
                    openProject
                  }
                />
              )}

              {photoProjects[1] && (
                <EditorialProjectCard
                  project={
                    photoProjects[1]
                  }
                  className="photo-side"
                  onOpen={
                    openProject
                  }
                />
              )}

              {photoProjects[2] && (
                <EditorialProjectCard
                  project={
                    photoProjects[2]
                  }
                  className="photo-side"
                  onOpen={
                    openProject
                  }
                />
              )}
            </div>
          </section>
        )}
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