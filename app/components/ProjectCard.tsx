import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

import {
  PROJECT_TYPE_LABEL,
  Project,
} from "../../data/projects";

type ProjectCardProps = {
  project: Project;
  href: string;
  onOpen: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => void;
};

export default function ProjectCard({
  project,
  href,
  onOpen,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={`project project-type-${project.type}`}
      data-cursor
      onClick={(event) => onOpen(event, href)}
    >
      <div className="project-visual">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            sizes="100vw"
            className="project-cover"
          />
        ) : (
          <div className="project-placeholder">
            <span>PROJECT {project.number}</span>
          </div>
        )}

        <div className="project-type-badge">
          {PROJECT_TYPE_LABEL[project.type]}
        </div>
      </div>

      <div className="project-info">
        <div className="project-number">
          {project.number}
        </div>

        <div className="project-title">
          {project.title}
        </div>

        <div className="project-meta">
          <span>{project.category}</span>
        </div>
      </div>
    </Link>
  );
}