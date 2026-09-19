import Link from "next/link";

import type { Project } from "../../data/projects";

type ShortFormProjectLayoutProps = {
  project: Project;
  nextProject: Project;
};

function normalizeVideoSrc(src?: string) {
  if (!src) return "";

  const value = src.trim();

  try {
    const url = new URL(value);

    if (
      url.hostname === "youtu.be" ||
      url.hostname === "www.youtu.be"
    ) {
      const id = url.pathname
        .replace(/^\/+/, "")
        .split("/")[0];

      return id
        ? `https://www.youtube.com/embed/${id}`
        : value;
    }

    if (url.hostname.includes("youtube.com")) {
      if (url.pathname.startsWith("/embed/")) {
        return value;
      }

      const id = url.searchParams.get("v");

      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }

      const shorts =
        url.pathname.match(/^\/shorts\/([^/?]+)/);

      if (shorts?.[1]) {
        return `https://www.youtube.com/embed/${shorts[1]}`;
      }
    }
  } catch {
    // local video path
  }

  return value;
}

export default function ShortFormProjectLayout({
  project,
  nextProject,
}: ShortFormProjectLayoutProps) {
  const videoSrc =
    normalizeVideoSrc(project.video);

  const isLocalVideo =
    /\.(mp4|webm|ogg)(\?.*)?$/i.test(
      videoSrc
    );

  return (
    <main className="shortform-detail">

      {/* =====================================================
          NAV
      ===================================================== */}

      <nav className="shortform-nav">

        <Link
          href="/"
          className="shortform-logo"
        >
          CUONG HOANG
        </Link>

        <div className="shortform-nav-title">
          SHORT-FORM PROJECT
        </div>

        <Link
          href="/#work"
          className="shortform-back"
        >
          ← BACK TO WORK
        </Link>

      </nav>


      {/* =====================================================
          HERO / FEATURED PLAYER
      ===================================================== */}

      <section className="shortform-hero">

        {/* LEFT — PLAYER */}

        <div className="shortform-player-column">

          <div className="shortform-player">

            {videoSrc ? (

              isLocalVideo ? (

                <video
                  src={videoSrc}
                  controls
                  playsInline
                  preload="metadata"
                  poster={
                    project.cover || undefined
                  }
                  className="shortform-player-media"
                />

              ) : (

                <iframe
                  src={videoSrc}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="shortform-player-media"
                />

              )

            ) : project.cover ? (

              <img
                src={project.cover}
                alt={project.title}
                className="shortform-player-media"
              />

            ) : (

              <div className="shortform-player-empty">
                VIDEO COMING SOON
              </div>

            )}

          </div>

        </div>


        {/* RIGHT — CONTENT */}

        <div className="shortform-info">

          <div className="shortform-info-top">

            <span>
              PROJECT {project.number}
            </span>

            <span>
              TIKTOK / REELS
            </span>

          </div>


          <div className="shortform-handwriting">
            GOOD IDEAS
            <br />
            TRAVEL FASTER.
          </div>


          <div className="shortform-tags">

            <span>TIKTOK</span>
            <span>REELS</span>
            <span>SOCIAL AD</span>

          </div>


          <h1 className="shortform-title">
            {project.title}
          </h1>


          <p className="shortform-description">
            {project.description}
          </p>


          <div className="shortform-meta">

            <div>
              <span>ROLE</span>

              <strong>
                {project.role}
              </strong>
            </div>

            <div>
              <span>TYPE</span>

              <strong>
                {project.category}
              </strong>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MORE CLIPS
      ===================================================== */}

      {project.images.length > 0 && (

        <section className="shortform-more">

          <div className="shortform-more-head">

            <div>
              <span>02</span>

              <h2>
                MORE CLIPS
              </h2>
            </div>

            <span>
              {String(
                project.images.length
              ).padStart(2, "0")}{" "}
              VISUALS
            </span>

          </div>


          <div className="shortform-clips">

            {project.images.map(
              (image, index) => (

                <article
                  className="shortform-clip"
                  key={`${image}-${index}`}
                >

                  <div className="shortform-clip-media">

                    <img
                      src={image}
                      alt={`${project.title} clip ${index + 1}`}
                    />

                    <div className="shortform-clip-play">
                      ▶
                    </div>

                    <span className="shortform-clip-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                  </div>

                  <div className="shortform-clip-bottom">

                    <span>
                      CLIP{" "}
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <span>
                      SHORT-FORM
                    </span>

                  </div>

                </article>

              )
            )}

          </div>

        </section>

      )}


      {/* =====================================================
          NEXT PROJECT
      ===================================================== */}

      <section className="shortform-next">

        <span>
          NEXT PROJECT
        </span>

        <Link
          href={`/work/${nextProject.slug}`}
        >
          {nextProject.title}
          <span>→</span>
        </Link>

      </section>

    </main>
  );
}