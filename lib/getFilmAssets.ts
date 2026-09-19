import "server-only";

import path from "node:path";
import { readdir } from "node:fs/promises";

import { Project } from "../data/projects";

const IMAGE_EXTENSIONS = new Set([
  ".gif",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
]);

const VIDEO_EXTENSIONS = new Set([
  ".mp4",
  ".webm",
  ".ogg",
]);

const collator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

export async function getFilmAssets(
  project: Project
): Promise<Project> {
  const folderPath = path.join(
    process.cwd(),
    "public",
    "projects",
    project.slug
  );

  let files: string[] = [];

  try {
    files = await readdir(folderPath);
  } catch {
    return project;
  }

  const sortedFiles = [...files].sort((a, b) =>
    collator.compare(a, b)
  );

  const coverFile =
    sortedFiles.find((file) =>
      /^cover\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file)
    ) ?? null;

  const detectedImages = sortedFiles
    .filter((file) => {
      const extension = path.extname(file).toLowerCase();

      return IMAGE_EXTENSIONS.has(extension);
    })
    .filter(
      (file) =>
        !/^cover\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file)
    )
    .map(
      (file) =>
        `/projects/${project.slug}/${file}`
    );

  const localVideoFile =
    sortedFiles.find((file) =>
      VIDEO_EXTENSIONS.has(
        path.extname(file).toLowerCase()
      )
    ) ?? null;

  const detectedVideo =
    localVideoFile
      ? `/projects/${project.slug}/${localVideoFile}`
      : "";

  return {
    ...project,

    cover:
      coverFile
        ? `/projects/${project.slug}/${coverFile}`
        : project.cover ||
          detectedImages[0] ||
          "",

    images:
      detectedImages.length > 0
        ? detectedImages
        : project.images,

    video:
      project.video ||
      detectedVideo,
  };
}