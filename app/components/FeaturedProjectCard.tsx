import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

import {
  PROJECT_TYPE_LABEL,
  Project,
  getTitleLines,
} from "../../data/projects";

type FeaturedProjectCardProps = {
  project: Project;
  href: string;
  onOpen: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
};

export default function FeaturedProjectCard({
  project,
  href,
  onOpen,
}: FeaturedProjectCardProps) {
  const titleLines = getTitleLines(project);

  return (
    <Link
      href={href}
      className="project project-featured project-type-film"
      data-cursor
      onClick={(event) => onOpen(event, href)}
    >
      <div className="featured-project">
        <div className="featured-background">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="featured-background-image"
            />
          ) : null}
          <div className="featured-overlay" />
        </div>

        <div className="featured-top">
          <span>PROJECT {project.number}</span>
          <div className="featured-top-center">
            <span>{project.category}</span>
            <strong>CUONG HOANG</strong>
          </div>
          <span className="featured-year">{project.year}</span>
        </div>

        <div className="featured-small-image">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={`${project.title} color preview`}
              fill
              sizes="35vw"
              className="featured-small-image-content"
            />
          ) : null}
        </div>

        <div className="featured-center">
          <div className="featured-play">PLAY</div>
        </div>

        <div className="featured-title">
          {titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <div className="featured-film-wrap">
          <div className="featured-side-title">
            {PROJECT_TYPE_LABEL[project.type]}
          </div>
        </div>

        <div className="featured-bottom">
          <span>{project.role}</span>
          <span>VIEW PROJECT</span>
        </div>
      </div>
    </Link>
  );
}
