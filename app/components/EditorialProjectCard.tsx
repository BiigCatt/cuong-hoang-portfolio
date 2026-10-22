"use client";

import { Fragment, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "../../data/projects";

export type OpenProjectHandler = (
  event: MouseEvent<HTMLAnchorElement>,
  href: string
) => void;

type EditorialProjectCardProps = {
  project: Project;
  className?: string;
  onOpen?: OpenProjectHandler;
};

/* Tiêu đề card: dùng cardTitle (nếu có) để ngắt dòng riêng,
   nếu không thì hiện title bình thường. */
function CardTitle({ project }: { project: Project }) {
  const cardTitle = project.cardTitle;

  return (
    <h3
      style={
        cardTitle?.minHeight
          ? {
              minHeight: `${cardTitle.minHeight}px`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }
          : undefined
      }
    >
      {cardTitle
        ? cardTitle.lines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 && <br />}
              {line}
            </Fragment>
          ))
        : project.title}
    </h3>
  );
}

export default function EditorialProjectCard({
  project,
  className = "",
  onOpen,
}: EditorialProjectCardProps) {
  const href = `/work/${project.slug}`;

  const showPlay =
    project.type === "film" || project.type === "short-form";

  const isGif = project.cover?.toLowerCase().endsWith(".gif") ?? false;

  return (
    <Link
      href={href}
      className={`editorial-project ${className}`}
      data-cursor
      onClick={(event) => onOpen?.(event, href)}
    >
      {/* IMAGE */}
      <div className="editorial-project-media">
        {project.cover ? (
          isGif ? (
            <img
              src={project.cover}
              alt={project.title}
              className="editorial-project-image editorial-project-gif"
            />
          ) : (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="100vw"
              className="editorial-project-image"
            />
          )
        ) : (
          <div className="editorial-project-placeholder">
            {project.number}
          </div>
        )}
      </div>

      {/* SHADE */}
      <div className="editorial-project-shade" />

      {/* BOTTOM */}
      <div className="editorial-project-bottom">
        <div>
          <CardTitle project={project} />
          <span>{project.category}</span>
        </div>

        <span className="editorial-project-play">
          {showPlay ? (
            <span className="editorial-project-play-icon">▶</span>
          ) : (
            <span className="editorial-project-play-text">VIEW</span>
          )}
        </span>
      </div>
    </Link>
  );
}
