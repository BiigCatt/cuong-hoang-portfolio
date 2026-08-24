import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProject,
  projects,
} from "../../../data/projects";

import ProjectTransitionLink from "../../components/ProjectTransitionLink";

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

  return (
    <main className="project-page project-page-enter">
      {/* =========================================
          PROJECT NAV
      ========================================= */}

      <nav className="project-nav">
        <ProjectTransitionLink
          href="/"
          className="project-logo"
        >
          CUONG HOANG
        </ProjectTransitionLink>

        <ProjectTransitionLink
          href="/#work"
          className="project-back"
        >
          ← BACK TO WORK
        </ProjectTransitionLink>
      </nav>

      {/* =========================================
          PROJECT HERO
      ========================================= */}

      <section className="project-detail-hero">
        <div className="project-detail-meta project-reveal project-reveal-1">
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

        <div className="project-title-mask">
          <h1 className="project-detail-title project-reveal-title">
            {project.title}
          </h1>
        </div>
      </section>

      {/* =========================================
          PROJECT VIDEO
      ========================================= */}

      <section className="project-video-section project-reveal project-reveal-2">
        <div className="project-video-frame">
          {project.video ? (
            <iframe
              src={project.video}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="project-video-iframe"
            />
          ) : (
            <>
              <span className="project-video-label">
                PROJECT FILM
              </span>

              <button
                className="project-play"
                type="button"
              >
                PLAY
              </button>
            </>
          )}
        </div>
      </section>

      {/* =========================================
          ABOUT PROJECT
      ========================================= */}

      <section className="project-info-section project-reveal project-reveal-3">
        <div className="project-info-label">
          ABOUT THE PROJECT
        </div>

        <div className="project-info-content">
          <p className="project-description">
            {project.description}
          </p>

          <div className="project-facts">
            <div className="project-fact">
              <span className="fact-label">
                ROLE
              </span>

              <span>
                {project.role}
              </span>
            </div>

            <div className="project-fact">
              <span className="fact-label">
                TYPE
              </span>

              <span>
                {project.category}
              </span>
            </div>

            <div className="project-fact">
              <span className="fact-label">
                YEAR
              </span>

              <span>
                {project.year}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          GALLERY
      ========================================= */}

      <section className="project-gallery">
        {project.images?.length > 0 ? (
          <div className="gallery-stack">
            {project.images.map(
              (image, index) => (
                <div
                  className="gallery-cinematic project-gallery-reveal"
                  key={image}
                >
                  <Image
                    src={image}
                    alt={`${project.title} visual ${
                      index + 1
                    }`}
                    fill
                    sizes="(max-width: 600px) 100vw, 95vw"
                    className="gallery-image"
                  />
                </div>
              )
            )}
          </div>
        ) : (
          <div className="gallery-main">
            <span>
              PROJECT VISUALS COMING SOON
            </span>
          </div>
        )}
      </section>

      {/* =========================================
          NEXT PROJECT
      ========================================= */}

      <section className="next-project-section">
        <span className="next-project-label">
          NEXT PROJECT
        </span>

        <ProjectTransitionLink
          href={`/work/${nextProject.slug}`}
          className="next-project-link"
        >
          <span>
            {nextProject.title}
          </span>

          <span>→</span>
        </ProjectTransitionLink>
      </section>
    </main>
  );
}