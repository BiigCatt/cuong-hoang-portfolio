"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
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

  /* Ảnh bìa: nếu file `cover` chưa có / tải lỗi thì dùng coverFallback;
     không có cả hai thì hiện khung số thứ tự. */
  const mediaRef = useRef<HTMLDivElement>(null);
  const [coverFailed, setCoverFailed] = useState(false);

  const cover = coverFailed ? project.coverFallback ?? "" : project.cover;

  /* Ảnh lỗi trước khi trang "tỉnh dậy" (hydrate) thì onError bị lỡ,
     nên kiểm tra lại một lần khi component vừa hiện. */
  useEffect(() => {
    const image = mediaRef.current?.querySelector("img");

    if (image && image.complete && image.naturalWidth === 0) {
      setCoverFailed(true);
    }
  }, []);

  const isGif = cover?.toLowerCase().endsWith(".gif") ?? false;

  return (
    <Link
      href={href}
      className={`editorial-project ${className}`}
      data-cursor
      onClick={(event) => onOpen?.(event, href)}
    >
      {/* IMAGE */}
      <div className="editorial-project-media" ref={mediaRef}>
        {cover ? (
          isGif ? (
            <img
              src={cover}
              alt={project.title}
              className="editorial-project-image editorial-project-gif"
              onError={() => setCoverFailed(true)}
            />
          ) : (
            <Image
              src={cover}
              alt={project.title}
              fill
              sizes="100vw"
              className="editorial-project-image"
              onError={() => setCoverFailed(true)}
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
