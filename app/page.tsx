"use client";

import { useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import GlassNav from "./components/GlassNav";
import PortfolioHero from "./components/PortfolioHero";
import ScrollRevealText from "./components/ScrollRevealText";

import {
  getProjectsByType,
  projects,
  type ProjectType,
} from "../data/projects";
import {
  ABOUT_ROLES,
  CATEGORY_NOTES,
  CONTACT_LINKS,
  NAV_LINKS,
  SITE,
} from "../data/site";

import EditorialProjectCard from "./components/EditorialProjectCard";
import EditorialSectionHeader from "./components/EditorialSectionHeader";
import WorkHeader, { type FilterType } from "./components/WorkHeader";
import {
  useCustomCursor,
  useRevealOnScroll,
} from "./hooks/useHomeEffects";

/* Thời gian chờ hiệu ứng chuyển trang trước khi router.push (ms). */
const PAGE_TRANSITION_MS = 450;

function projectsOfType(type: ProjectType) {
  return getProjectsByType(type);
}

const filmProjects = projectsOfType("film");
const motionProjects = projectsOfType("motion");
const shortProjects = projectsOfType("short-form");
const photoProjects = projectsOfType("photography");

/*
 * FILM LAYOUT
 *
 * ROW 1: 01            (film-hero)
 * ROW 2: 02 / 03 / 04  (film-small)
 * ROW 3: 05 / 06       (film-wide)
 * ROW 4: 07 / 08 / 09  (film-small)
 */
const filmRowTwo = filmProjects.slice(1, 4);
const filmRowThree = filmProjects.slice(4, 6);
const filmRowFour = filmProjects.slice(6, 9);

export default function Home() {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeCount =
    activeFilter === "all"
      ? projects.length
      : projectsOfType(activeFilter).length;

  const isShown = (type: ProjectType) =>
    activeFilter === "all" || activeFilter === type;

  useCustomCursor(activeFilter);
  useRevealOnScroll(activeFilter);

  const openProject = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    if (isTransitioning) return;

    setIsTransitioning(true);

    window.setTimeout(() => {
      router.push(href);
    }, PAGE_TRANSITION_MS);
  };

  return (
    <main className="portfolio">
      <div
        className={`page-transition ${isTransitioning ? "is-active" : ""}`}
      />

      <div className="custom-cursor" />

      {/* =====================================================
          NAV
      ===================================================== */}

      <GlassNav className="nav">
        <div className="logo">{SITE.name}</div>

        <div className="nav-right">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-item"
              data-cursor
            >
              {link.label}
            </a>
          ))}
        </div>
      </GlassNav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <PortfolioHero />

      {/* =====================================================
          EDITORIAL WORK
      ===================================================== */}

      <section id="work" className="editorial-work-section">
        <WorkHeader
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeCount={activeCount}
          totalCount={projects.length}
          revealTitles={activeFilter === "all"}
        />

        {/* FILM */}
        {isShown("film") && (
          <section className="editorial-category editorial-film">
            <EditorialSectionHeader
              title="FILM"
              revealTitle={activeFilter === "all"}
              count={filmProjects.length}
              index="01"
              note={CATEGORY_NOTES.film}
            />

            {filmProjects[0] && (
              <EditorialProjectCard
                project={filmProjects[0]}
                className="film-hero"
                onOpen={openProject}
              />
            )}

            <div className="film-row film-row-three">
              {filmRowTwo.map((project) => (
                <EditorialProjectCard
                  key={project.number}
                  project={project}
                  className="film-small"
                  onOpen={openProject}
                />
              ))}
            </div>

            <div className="film-row film-row-two">
              {filmRowThree.map((project) => (
                <EditorialProjectCard
                  key={project.number}
                  project={project}
                  className="film-wide"
                  onOpen={openProject}
                />
              ))}
            </div>

            <div className="film-row film-row-three">
              {filmRowFour.map((project) => (
                <EditorialProjectCard
                  key={project.number}
                  project={project}
                  className="film-small"
                  onOpen={openProject}
                />
              ))}
            </div>
          </section>
        )}

        {/* SHORT-FORM */}
        {isShown("short-form") && (
          <section className="editorial-category editorial-short">
            <EditorialSectionHeader
              title="SHORT-FORM"
              revealTitle={activeFilter === "all"}
              count={shortProjects.length}
              index="02"
              note={CATEGORY_NOTES["short-form"]}
            />

            <div className="editorial-short-grid">
              {shortProjects.map((project) => (
                <EditorialProjectCard
                  key={project.number}
                  project={project}
                  className="short-card"
                  onOpen={openProject}
                />
              ))}
            </div>
          </section>
        )}

        {/* PHOTOGRAPHY */}
        {isShown("photography") && (
          <section id="photography" className="editorial-category editorial-photo">
            <EditorialSectionHeader
              title="PHOTOGRAPHY"
              revealTitle={activeFilter === "all"}
              count={photoProjects.length}
              index="03"
              note={CATEGORY_NOTES.photography}
            />

            <div className="editorial-photo-grid">
              {photoProjects.map((project, index) => (
                <EditorialProjectCard
                  key={project.slug}
                  project={project}
                  className={index === 0 ? "photo-main" : "photo-side"}
                  onOpen={openProject}
                />
              ))}
            </div>
          </section>
        )}

        {/* MOTION */}
        {isShown("motion") && (
          <section className="editorial-category editorial-motion">
            <EditorialSectionHeader
              title="MOTION"
              revealTitle={activeFilter === "all"}
              count={motionProjects.length}
              index="04"
              note={CATEGORY_NOTES.motion}
            />

            <div className="editorial-motion-grid">
              {motionProjects[0] && (
                <EditorialProjectCard
                  project={motionProjects[0]}
                  className="motion-main"
                  onOpen={openProject}
                />
              )}

              {motionProjects[1] && (
                <EditorialProjectCard
                  project={motionProjects[1]}
                  className="motion-side motion-side-top"
                  onOpen={openProject}
                />
              )}

              {motionProjects[2] && (
                <EditorialProjectCard
                  project={motionProjects[2]}
                  className="motion-side motion-side-bottom"
                  onOpen={openProject}
                />
              )}
            </div>
          </section>
        )}
      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section id="about" className="about-section">
        <div className="about-header">
          <span>ABOUT</span>
          <span>01</span>
        </div>

        <div className="about-main">
          <div className="about-intro">
            <p>
              <ScrollRevealText
                text="I CREATE VISUAL STORIES THROUGH FILM, MOTION AND DESIGN."
                enabled={activeFilter === "all"}
              />
            </p>
          </div>

          <div className="about-details">
            <div className="about-location">
              <span className="about-label">BASED IN</span>
              <span>{SITE.location}</span>
            </div>

            <div className="about-role">
              <span className="about-label">WHAT I DO</span>

              <div className="about-role-list">
                {ABOUT_ROLES.map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section id="contact" className="contact-section">
        <div className="contact-header">
          <span>CONTACT</span>
          <span>02</span>
        </div>

        <div className="contact-main">
          <p className="contact-title">
            <ScrollRevealText text="HAVE A PROJECT IN MIND?" enabled={activeFilter === "all"} />
          </p>

          <a
            href={`mailto:${SITE.email}`}
            className="contact-cta"
            data-cursor
          >
            LET&apos;S TALK ↗
          </a>
        </div>

        <div className="contact-footer">
          <div className="contact-links">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-cursor
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>

          <span>
            © {SITE.year} {SITE.name}
          </span>
        </div>
      </section>
    </main>
  );
}
