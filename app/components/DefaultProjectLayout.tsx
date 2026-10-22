import Image from "next/image";
import Link from "next/link";

import type { Project } from "../../data/projects";

type DefaultProjectLayoutProps = {
  project: Project;
  nextProject: Project;
};

/* Layout chung cho các project không có layout riêng
   (hiện tại chủ yếu là photography). */
export default function DefaultProjectLayout({
  project,
  nextProject,
}: DefaultProjectLayoutProps) {
  const isPhotography = project.type === "photography";

  return (
    <main
      className={`project-page ${isPhotography ? "photography-project-page" : ""}`}
    >
      {/* NAV */}
      <nav className="project-nav">
        <Link href="/" className="project-logo">
          CUONG HOANG
        </Link>

        <Link href="/#work" className="project-back">
          ← BACK TO WORK
        </Link>
      </nav>

      {/* HERO */}
      <section
        className={`project-detail-hero ${isPhotography ? "photography-detail-hero" : ""}`}
      >
        {isPhotography && project.cover && (
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
          <span>PROJECT {project.number}</span>
          <span>{project.category}</span>
        </div>

        <h1 className="project-detail-title">{project.title}</h1>
      </section>

      {/* ABOUT */}
      <section className="project-info-section">
        <div className="project-info-label">ABOUT THE PROJECT</div>

        <div className="project-info-content">
          <p className="project-description">{project.description}</p>
        </div>
      </section>

      {/* PHOTOGRAPHY */}
      {isPhotography && project.images.length > 0 && (
        <section className="photo-gallery">
          {project.images.map((image, index) => (
            <div className="photo-gallery-item" key={`${image}-${index}`}>
              <Image
                src={image}
                alt={`${project.title} photo ${index + 1}`}
                width={1600}
                height={1200}
                sizes="(max-width: 600px) 100vw, 50vw"
                className="photo-gallery-image"
              />
            </div>
          ))}
        </section>
      )}

      {/* NEXT */}
      <section className="next-project-section">
        <span className="next-project-label">NEXT PROJECT</span>

        <Link
          href={`/work/${nextProject.slug}`}
          className="next-project-link"
        >
          <span>{nextProject.title}</span>
        </Link>
      </section>
    </main>
  );
}
