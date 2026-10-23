import Link from "next/link";

import type { Project } from "../../data/projects";
import {
  getYouTubeFrames,
  isLocalVideoSrc,
  normalizeVideoSrc,
} from "../../lib/video";

import ShortFormStrip from "./ShortFormStrip";

type ShortFormProjectLayoutProps = {
  project: Project;
  nextProject: Project;
};

/* Nhãn góc phải phía trên của mọi trang short-form. */
const LABEL = "SHORT-FORM";

export default function ShortFormProjectLayout({
  project,
  nextProject,
}: ShortFormProjectLayoutProps) {
  const videoSrc =
    normalizeVideoSrc(project.video);

  const isLocalVideo =
    isLocalVideoSrc(videoSrc);

  const fallbackImages = getYouTubeFrames(project.video);

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

            ) : (

              <div
                className="shortform-player-empty"
                style={{
                  backgroundImage: project.cover
                    ? `url(${project.cover})`
                    : undefined,
                }}
              >
                VIDEO COMING SOON
              </div>

            )}

          </div>

        </div>


        {/* RIGHT — CONTENT */}

        <div className="shortform-info">

          <div className="shortform-info-top">

            {/* <span> rỗng giữ nhãn bên phải ở đúng góc phải */}
            <span />

            <span>
              {LABEL}
            </span>

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

        </div>

      </section>


      {/* =====================================================
          PREVIEW STRIP

          Ảnh xem trước nếu không muốn bấm xem video.
          Dùng ảnh trong public/projects/<slug>/01.jpg ... 04.jpg,
          chưa có thì dùng khung hình YouTube tự tạo từ video.
      ===================================================== */}

      <ShortFormStrip
        images={project.images}
        fallbackImages={fallbackImages}
        title={project.title}
      />


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