import { Fragment } from "react";
import Link from "next/link";

import type { Project } from "../../data/projects";

type MotionProjectLayoutProps = {
  project: Project;
  nextProject: Project;
  /** Thứ tự (bắt đầu từ 1) của project trong nhóm motion. */
  position: number;
};

/* Mô tả: nếu project có descriptionLines thì ngắt dòng theo đó
   (dòng đầu được tô riêng), ngược lại hiện description bình thường. */
function MotionDescription({ project }: { project: Project }) {
  const lines = project.descriptionLines;

  if (!lines?.length) {
    return <p>{project.description}</p>;
  }

  return (
    <p>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {index === 0 ? (
            <span className="motion02-about-first-line">{line}</span>
          ) : (
            line
          )}
          {index < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  );
}

export default function MotionProjectLayout({
  project,
  nextProject,
  position,
}: MotionProjectLayoutProps) {
  const className = ["motion02-project", project.detailClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={className}>
      {/* =====================================================
          FIXED GLASS NAV
      ===================================================== */}

      <nav className="motion02-nav">
        <Link href="/" className="motion02-logo">
          CUONG HOANG
        </Link>

        <div className="motion02-nav-center">MOTION DESIGN</div>

        <Link href="/#work" className="motion02-back">
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
        <a href="#motion02-gallery" className="motion02-view">
          VIEW
        </a>

        {/* TITLE */}
        <div className="motion02-title-wrap">
          <span className="motion02-title-label">
            MOTION / {String(position).padStart(2, "0")}
          </span>

          <h1>{project.title}</h1>
        </div>

        {/* VERTICAL MOTION */}
        <div className="motion02-type">
          <div className="motion02-type-word" aria-label="MOTION">
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
          <span>02</span>
          <span>ABOUT</span>
        </div>

        <div className="motion02-about-grid">
          <div className="motion02-about-label">ABOUT THE PROJECT</div>

          <div className="motion02-about-content">
            <MotionDescription project={project} />
          </div>
        </div>
      </section>

      {/* =====================================================
          VISUAL BREAKDOWN
      ===================================================== */}

      {project.images.length > 0 && (
        <section id="motion02-gallery" className="motion02-gallery">
          <div className="motion02-section-head">
            <span>03</span>
            <span>VISUAL BREAKDOWN</span>
          </div>

          <div className="motion02-gallery-grid">
            {project.images.map((image, index) => (
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
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================
          NEXT PROJECT
      ===================================================== */}

      <section className="motion02-next">
        <span className="motion02-next-label">NEXT PROJECT</span>

        <Link href={`/work/${nextProject.slug}`}>
          <span>{nextProject.title}</span>
          <span>↗</span>
        </Link>
      </section>
    </main>
  );
}
