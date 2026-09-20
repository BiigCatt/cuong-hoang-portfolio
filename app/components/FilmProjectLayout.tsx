import Image from "next/image";
import Link from "next/link";

import type { Project } from "../../data/projects";

type FilmProjectLayoutProps = {
  project: Project;
  nextProject: Project;
};

/* =========================================================
   HELPERS
========================================================= */

function isGif(src: string) {
  return /\.gif(\?.*)?$/i.test(src);
}

function normalizeVideoSrc(src?: string) {
  if (!src) return "";

  const value = src.trim();

  try {
    const url = new URL(value);

    /* youtu.be/VIDEO_ID */
    if (
      url.hostname === "youtu.be" ||
      url.hostname === "www.youtu.be"
    ) {
      const videoId = url.pathname
        .replace(/^\/+/, "")
        .split("/")[0];

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    /* youtube.com/... */
    if (url.hostname.includes("youtube.com")) {
      /* đã là embed */
      if (url.pathname.startsWith("/embed/")) {
        return value;
      }

      /* youtube.com/watch?v=VIDEO_ID */
      const videoId =
        url.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      /* youtube.com/shorts/VIDEO_ID */
      const shortsMatch =
        url.pathname.match(
          /^\/shorts\/([^/?]+)/
        );

      if (shortsMatch?.[1]) {
        return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      }
    }
  } catch {
    /*
     * Local path dạng:
     * /projects/film-project-05/video.mp4
     *
     * không phải URL đầy đủ nên URL()
     * có thể throw.
     *
     * Cứ trả lại path gốc.
     */
  }

  return value;
}

export default function FilmProjectLayout({
  project,
  nextProject,
}: FilmProjectLayoutProps) {
  /* =========================================================
     PREVIEW IMAGE
  ========================================================= */

const previewImage =
  project.slug === "cmc-data-center"
    ? project.images[0] || project.cover
    : project.slug === "film-project-06"
      ? project.images[2] ||
        project.images[0] ||
        project.cover
      : project.images[1] ||
        project.images[0] ||
        project.cover;

  /* =========================================================
     VIDEO
  ========================================================= */

  const videoSrc =
    normalizeVideoSrc(project.video);

  const isLocalVideo =
    /\.(mp4|webm|ogg)(\?.*)?$/i.test(
      videoSrc
    );

  /* =========================================================
     BREAKDOWN

     TỰ ĐỘNG:
     01
     02
     03
     ...
     N

     Ảnh đầu tiên luôn FEATURED.
  ========================================================= */

  const breakdownItems = project.images
    .filter(Boolean)
    .map((src, index) => ({
      src,

      number: String(
        index + 1
      ).padStart(2, "0"),

      featured:
        index === 0,
    }));
const heroImage = project.cover;
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

        {/* BACKGROUND */}

  {heroImage && (
  <Image
    src={heroImage}
    alt={project.title}
    fill
    priority
    sizes="100vw"
    className="aperture-background"
  />
)}

        <div className="aperture-dark-overlay" />


        {/* ===================================================
            GRID

            CSS hiện tại có thể display:none.
            Giữ markup để không phá structure.
        =================================================== */}

        <div className="aperture-grid">

          <div className="grid-line grid-line-1" />

          <div className="grid-line grid-line-2" />

          <div className="grid-line grid-line-3" />

        </div>


        {/* ===================================================
            SMALL PREVIEW
        =================================================== */}

        {previewImage && (
          <div className="aperture-inset">

            <Image
              src={previewImage}
              alt={`${project.title} preview`}
              fill
              sizes="30vw"
              className="aperture-inset-image"
              unoptimized={
                isGif(previewImage)
              }
            />

          </div>
        )}


        {/* ===================================================
            PLAY
        =================================================== */}

        <a
          href="#project-film"
          className="aperture-play"
          aria-label="Watch film"
        >
          <span>▶</span>
        </a>


        {/* ===================================================
            TITLE
        =================================================== */}

        <div className="aperture-bottom-title">

          <span className="aperture-project-number">
            PROJECT {project.number}
          </span>

     <h1>
  {(project.titleLines?.length
    ? project.titleLines
    : [project.title]
  ).map((line, index) => (
    <span
      key={`${line}-${index}`}
      className={`film-title-line ${
        project.slug === "cmc-data-center" &&
        index === 1
          ? "film-title-line-pj1-small"
          : ""
      }`}
    >
      {line}
    </span>
  ))}
</h1>

        </div>


        {/* ===================================================
            FILM TYPE
        =================================================== */}

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

          {videoSrc ? (

            isLocalVideo ? (

              <video
                src={videoSrc}
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
                src={videoSrc}
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

            <p>
              {project.description}
            </p>


            <div className="film-motion-meta">

              {/* ROLE */}

              <div className="film-motion-meta-item">

                <span>
                  ROLE
                </span>

                <strong>
                  {project.role}
                </strong>

              </div>


              {/* TYPE */}

              <div className="film-motion-meta-item">

                <span>
                  TYPE
                </span>

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

          {/* HEADER */}

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


          {/* GRID */}

          <div className="film-breakdown-grid">

            {breakdownItems.map(
              (item, index) => (

                <article
                  key={`${item.src}-${index}`}
                  className={`film-breakdown-card ${
                    item.featured
                      ? "is-featured"
                      : ""
                  }`}
                >

                  {/* GIF / IMAGE */}

                  <div className="film-breakdown-media">

                    <img
                      src={item.src}
                      alt={`${project.title} breakdown ${item.number}`}
                      className="film-breakdown-image"
                      loading={
                        index === 0
                          ? "eager"
                          : "lazy"
                      }
                      decoding="async"
                    />

                  </div>


                  {/* NUMBER ONLY */}

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