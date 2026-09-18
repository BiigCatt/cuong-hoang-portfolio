import Image from "next/image";
import Link from "next/link";

import { Project } from "../../data/projects";

type FilmProjectLayoutProps = {
  project: Project;
  nextProject: Project;
};

export default function FilmProjectLayout({
  project,
  nextProject,
}: FilmProjectLayoutProps) {
  const previewImage =
    project.images[1] ||
    project.images[0] ||
    project.cover;

  const isLocalVideo = Boolean(
    project.video &&
      /\.(mp4|webm|ogg)(\?.*)?$/i.test(
        project.video
      )
  );
const breakdownItems = [
  {
    src: project.images[0],
    number: "01",
    title:
      project.slug === "film-project-05"
        ? "NOTMAXZ PROJECT"
        : "FRAME 01",
    caption: "OPENING FRAME",
    featured: true,
  },
  {
    src: project.images[1],
    number: "02",
    title: "GUITAR DETAIL",
    caption: "CLOSE UP",
  },
  {
    src: project.images[2],
    number: "03",
    title: "FOCUS",
    caption: "SHALLOW DEPTH",
  },
  {
    src: project.images[3],
    number: "04",
    title: "PERFORMANCE",
    caption: "MAIN SHOT",
  },
  {
    src: project.images[4],
    number: "05",
    title: "THE MOMENT",
    caption: "STAGE ENERGY",
  },
  {
    src: project.images[5],
    number: "06",
    title: "TRANSITION",
    caption: "ATMOSPHERE",
  },
].filter((item) => item.src);
  return (
   <main className="aperture-project film-detail-red">
      {/* =====================================================
    NAV — SAME AS MOTION
===================================================== */}

<nav className="motion02-nav">

  <Link
    href="/"
    className="motion02-logo"
  >
    CUONG HOANG
  </Link>

  <div className="motion02-nav-center">
    FILM PROJECT
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

      <section className="aperture-hero">
        {project.cover && (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="aperture-background"
          />
        )}

        <div className="aperture-dark-overlay" />

        {/* GRID */}

        <div className="aperture-grid">
          <div className="grid-line grid-line-1" />
          <div className="grid-line grid-line-2" />
          <div className="grid-line grid-line-3" />
        </div>

        {/* SMALL PREVIEW */}

        {previewImage && (
          <div className="aperture-inset">
            <Image
              src={previewImage}
              alt={`${project.title} preview`}
              fill
              sizes="30vw"
              className="aperture-inset-image"
            />
          </div>
        )}

        {/* PLAY */}

        <a
          href="#project-film"
          className="aperture-play"
          aria-label="Watch film"
        >
          <span>▶</span>
        </a>

        {/* TITLE */}

        <div className="aperture-bottom-title">
          <span className="aperture-project-number">
            PROJECT {project.number}
          </span>

          <h1>
            {project.title}
          </h1>
        </div>

        {/* FILM TYPE */}

        <div className="aperture-type-panel">
          <span className="aperture-type-big">
            FILM
          </span>

          <div className="aperture-type-meta">
            <span>
              {project.category}
            </span>
          </div>
        </div>

        {/* ROLE */}

        <div className="aperture-credit">
          {project.role}
        </div>
      </section>

      {/* =====================================================
          WATCH FILM
      ===================================================== */}

      <section
        id="project-film"
        className="aperture-film-section"
      >
        <div className="aperture-section-label">
          WATCH FILM
        </div>

        <div className="aperture-film-frame">
          {project.video ? (
            isLocalVideo ? (
              <video
                src={project.video}
                controls
                playsInline
                preload="metadata"
                className="aperture-film-iframe"
                style={{
                  objectFit: "contain",
                  background: "#000",
                }}
              />
            ) : (
              <iframe
                src={project.video}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="aperture-film-iframe"
              />
            )
          ) : (
            <div className="aperture-film-placeholder">
              FILM COMING SOON
            </div>
          )}
        </div>
      </section>

{/* =====================================================
    ABOUT — SAME LAYOUT AS MOTION
===================================================== */}

<section className="motion02-about film-motion-about">

  <div className="motion02-section-head">
    <span>02</span>
    <span>ABOUT</span>
  </div>

  <div className="motion02-about-grid">

    <div className="motion02-about-label">
      ABOUT THE PROJECT
    </div>

    <div className="motion02-about-content">

      <p>
        {project.description}
      </p>

      <div className="film-motion-meta">

        <div className="film-motion-meta-item">
          <span>ROLE</span>

          <strong>
            {project.role}
          </strong>
        </div>

        <div className="film-motion-meta-item">
          <span>TYPE</span>

          <strong>
            {project.category}
          </strong>
        </div>

      </div>

    </div>

  </div>

</section>

      {/* =====================================================
    BREAKDOWN
===================================================== */}

{breakdownItems.length > 0 && (
  <section className="film-breakdown-section">

    <div className="film-breakdown-head">
      <span>
        BREAKDOWN
      </span>

      <span>
        {String(
          breakdownItems.length
        ).padStart(2, "0")}{" "}
        VISUALS
      </span>
    </div>


    <div className="film-breakdown-grid">

      {breakdownItems.map(
        (item, index) => (

          <article
            key={`${item.number}-${index}`}
            className={`film-breakdown-card ${
              item.featured
                ? "is-featured"
                : ""
            }`}
          >

            <div className="film-breakdown-media">

              <img
                src={item.src}
                alt={`${project.title} breakdown ${item.number}`}
                className="film-breakdown-image"
              />

            </div>

           <div className="film-breakdown-overlay">

  <span className="film-breakdown-number">
    {item.number}
  </span>

</div>

          </article>

        )
      )}

    </div>

  </section>
)}

      {/* =====================================================
          NEXT FILM
      ===================================================== */}

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