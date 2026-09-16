import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getProject,
  projects,
} from "../../../data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex(
    (item) => item.slug === slug
  );

  const nextProject =
    projects[(currentIndex + 1) % projects.length];

  /* =========================================================
     SPECIAL LAYOUT — PROJECT 01
  ========================================================= */

  if (project.slug === "cmc-data-center") {
    return (
      <main className="aperture-project">

        {/* TOP NAV */}

        <nav className="aperture-nav">

          <Link
            href="/"
            className="aperture-logo"
          >
            CUONG HOANG
          </Link>

          <div className="aperture-nav-center">

            <span>
              CMC TELECOM
            </span>

            <span>
              VIETNAM
            </span>

          </div>

          <div className="aperture-nav-right">

            <Link href="/#work">
              WORK
            </Link>

            <Link href="/#about">
              ABOUT
            </Link>

            <Link href="/#contact">
              CONTACT
            </Link>

          </div>

        </nav>


        {/* HERO */}

        <section className="aperture-hero">

          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="aperture-background"
          />

          <div className="aperture-dark-overlay" />


          {/* GRID */}

          <div className="aperture-grid">

            <div className="grid-line grid-line-1" />

            <div className="grid-line grid-line-2" />

            <div className="grid-line grid-line-3" />

          </div>


          {/* SMALL COLOR FRAME */}

          <div className="aperture-inset">

            <Image
              src="/projects/cmc-data-center/02.jpg"
              alt={`${project.title} detail`}
              fill
              sizes="30vw"
              className="aperture-inset-image"
            />

          </div>


          {/* PLAY */}

          <a
            href="#project-film"
            className="aperture-play"
          >
            <span>
              ▶
            </span>
          </a>


          {/* LEFT BOTTOM TITLE */}

          <div className="aperture-bottom-title">

            <span className="aperture-project-number">
              PROJECT {project.number}
            </span>

            <h1>
              CMC DATA CENTER
              <br />
              MAINTENANCE
            </h1>

          </div>


          {/* RIGHT TYPE */}

          <div className="aperture-type-panel">

            <span className="aperture-type-big">
              FILM
            </span>

            <div className="aperture-type-meta">

              <span>
                CORPORATE FILM
              </span>

              <span>
                {project.year}
              </span>

            </div>

          </div>


          <div className="aperture-credit">
            DIRECTOR / DOP / EDITOR
          </div>

        </section>


        {/* FILM */}

        <section
          id="project-film"
          className="aperture-film-section"
        >

          <div className="aperture-section-label">
            WATCH FILM
          </div>

          <div className="aperture-film-frame">

            {project.video ? (

              <iframe
                src={project.video}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="aperture-film-iframe"
              />

            ) : (

              <div className="aperture-film-placeholder">
                FILM COMING SOON
              </div>

            )}

          </div>

        </section>


        {/* ABOUT */}

        <section className="aperture-about">

          <div className="aperture-about-label">
            ABOUT THE PROJECT
          </div>

          <div className="aperture-about-content">

            <p>
              {project.description}
            </p>

            <div className="aperture-facts">

              <div>
                <span>
                  ROLE
                </span>

                <strong>
                  {project.role}
                </strong>
              </div>

              <div>
                <span>
                  TYPE
                </span>

                <strong>
                  {project.category}
                </strong>
              </div>

              <div>
                <span>
                  YEAR
                </span>

                <strong>
                  {project.year}
                </strong>
              </div>

            </div>

          </div>

        </section>


        {/* GALLERY */}

        {project.images.length > 0 && (

          <section className="aperture-gallery">

            {project.images.map(
              (image, index) => (

                <div
                  className={`aperture-gallery-item aperture-gallery-${index + 1}`}
                  key={`${image}-${index}`}
                >

                  <Image
                    src={image}
                    alt={`${project.title} visual ${index + 1}`}
                    fill
                    sizes="100vw"
                    className="aperture-gallery-image"
                  />

                </div>

              )
            )}

          </section>

        )}


        {/* NEXT */}

        <section className="aperture-next">

          <span>
            NEXT PROJECT
          </span>

          <Link
            href={`/work/${nextProject.slug}`}
          >
            {nextProject.title}
          </Link>

        </section>

      </main>
    );
  }


  /* =========================================================
   SPECIAL LAYOUT — MOTION PROJECT 02
========================================================= */
const motionProjects = projects.filter(
  (item) => item.type === "motion"
);

const motionIndex = motionProjects.findIndex(
  (item) => item.slug === project.slug
);
if (project.type === "motion") {
  return (
    <main className="motion02-project">

      {/* =====================================================
          FIXED GLASS NAV
      ===================================================== */}

      <nav className="motion02-nav">

        <Link
          href="/"
          className="motion02-logo"
        >
          CUONG HOANG
        </Link>


        <div className="motion02-nav-center">
          MOTION DESIGN
        </div>


        <Link
          href="/#work"
          className="motion02-back"
        >
          ← BACK TO WORK
        </Link>

      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="motion02-hero">

        {/* BACKGROUND */}

        {project.cover && (
          <div className="motion02-background">

            <img
              src={project.cover}
              alt={project.title}
              className="motion02-background-image"
            />

            <div className="motion02-background-overlay" />

          </div>
        )}


        {/* PREVIEW GIF 01 */}

        {project.images[0] && (
          <div className="motion02-preview">

            <img
              src={project.images[0]}
              alt={`${project.title} preview`}
              className="motion02-preview-image"
            />

          </div>
        )}


        {/* VIEW */}

       <a
  href="#motion02-gallery"
  className="motion02-view"
>
  VIEW
</a>


        {/* TITLE */}

        <div className="motion02-title-wrap">

         <span className="motion02-title-label">
  MOTION / {String(motionIndex + 1).padStart(2, "0")}
</span>

          <h1>
            {project.title}
          </h1>

        </div>


        {/* VERTICAL MOTION */}

        <div className="motion02-type">

          <div
            className="motion02-type-word"
            aria-label="MOTION"
          >
            <span>M</span>
            <span>O</span>
            <span>T</span>
            <span>I</span>
            <span>O</span>
            <span>N</span>
          </div>

        </div>

      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section className="motion02-about">

        <div className="motion02-section-head">

          <span>
            02
          </span>

          <span>
            ABOUT
          </span>

        </div>


        <div className="motion02-about-grid">

          <div className="motion02-about-label">
            ABOUT THE PROJECT
          </div>


       <div className="motion02-about-content">

  {project.slug === "motion-project-02" ? (

    <p>
      <span className="motion02-about-first-line">
        A motion design project for CMC Telecom’s “GAME ON” campaign,
      </span>
      <br />

      combining football-inspired visuals, dynamic mascots,
      <br />

      and energetic stadium graphics. Together,
      <br />

      these elements create a bold event identity inspired by
      <br />

      the spirit of “One Team — One Goal.”
    </p>

  ) : (

    <p>
      {project.description}
    </p>

  )}

</div>

        </div>

      </section>


      {/* =====================================================
          VISUAL BREAKDOWN — 6 GIF
      ===================================================== */}

      {project.images.length > 0 && (

        <section
          id="motion02-gallery"
          className="motion02-gallery"
        >

          <div className="motion02-section-head">

            <span>
              03
            </span>

            <span>
              VISUAL BREAKDOWN
            </span>

          </div>


          <div className="motion02-gallery-grid">

            {project.images.map(
              (image, index) => (

                <div
                  key={`${image}-${index}`}
                  className={`motion02-gallery-item motion02-gallery-item-${index + 1}`}
                >

                  <img
                    src={image}
                    alt={`${project.title} visual ${index + 1}`}
                    className="motion02-gallery-image"
                  />

                  <span className="motion02-gallery-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                </div>

              )
            )}

          </div>

        </section>

      )}


      {/* =====================================================
          NEXT PROJECT
      ===================================================== */}

      <section className="motion02-next">

        <span className="motion02-next-label">
          NEXT PROJECT
        </span>


        <Link
          href={`/work/${nextProject.slug}`}
        >

          <span>
            {nextProject.title}
          </span>

          <span>
            ↗
          </span>

        </Link>

      </section>

    </main>
  );
}
  /* =========================================================
     NORMAL LAYOUT — OTHER PROJECTS
  ========================================================= */

  return (
    <main
      className={`project-page ${
        project.type === "photography"
          ? "photography-project-page"
          : ""
      }`}
    >

      {/* NAV */}

      <nav className="project-nav">

        <Link
          href="/"
          className="project-logo"
        >
          CUONG HOANG
        </Link>

        <Link
          href="/#work"
          className="project-back"
        >
          ← BACK TO WORK
        </Link>

      </nav>


      {/* HERO */}

      <section
        className={`project-detail-hero ${
          project.type === "photography"
            ? "photography-detail-hero"
            : ""
        }`}
      >

        {project.type === "photography" &&
          project.cover && (

            <div className="photography-hero-background">

              <Image
                src={project.cover}
                alt=""
                fill
                priority
                sizes="100vw"
                className="photography-hero-background-image"
              />

              <div className="photography-hero-darken" />

            </div>

          )}


        <div className="project-detail-meta">

          <span>
            PROJECT {project.number}
          </span>

          <span>
            {project.category}
          </span>

          <span>
            {project.year}
          </span>

        </div>


        <h1 className="project-detail-title">
          {project.title}
        </h1>

      </section>


      {/* ABOUT */}

      <section className="project-info-section">

        <div className="project-info-label">
          ABOUT THE PROJECT
        </div>

        <div className="project-info-content">

          <p className="project-description">
            {project.description}
          </p>

        </div>

      </section>


      {/* PHOTOGRAPHY */}

      {project.type === "photography" &&
        project.images.length > 0 && (

          <section className="photo-gallery">

            {project.images.map(
              (image, index) => (

                <div
                  className="photo-gallery-item"
                  key={`${image}-${index}`}
                >

                  <Image
                    src={image}
                    alt={`${project.title} photo ${index + 1}`}
                    width={1600}
                    height={1200}
                    sizes="(max-width: 600px) 100vw, 50vw"
                    className="photo-gallery-image"
                  />

                </div>

              )
            )}

          </section>

        )}


      {/* NEXT */}

      <section className="next-project-section">

        <span className="next-project-label">
          NEXT PROJECT
        </span>

        <Link
          href={`/work/${nextProject.slug}`}
          className="next-project-link"
        >

          <span>
            {nextProject.title}
          </span>

        </Link>

      </section>

    </main>
  );
}