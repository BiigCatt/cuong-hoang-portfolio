import { notFound } from "next/navigation";

import DefaultProjectLayout from "../../components/DefaultProjectLayout";
import FilmProjectLayout from "../../components/FilmProjectLayout";
import MotionProjectLayout from "../../components/MotionProjectLayout";
import ShortFormProjectLayout from "../../components/ShortFormProjectLayout";

import {
  getNextProject,
  getNextProjectOfType,
  getProject,
  getProjectsByType,
} from "../../../data/projects";
import { getFilmAssets } from "../../../lib/getFilmAssets";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/*
 * Chọn layout theo loại project:
 *   film        -> FilmProjectLayout       (next: project film kế tiếp)
 *   short-form  -> ShortFormProjectLayout  (next: short-form kế tiếp)
 *   motion      -> MotionProjectLayout     (next: project kế tiếp trong toàn bộ danh sách)
 *   còn lại     -> DefaultProjectLayout    (next: project kế tiếp trong toàn bộ danh sách)
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  switch (project.type) {
    case "film": {
      const filmProject = await getFilmAssets(project);

      return (
        <FilmProjectLayout
          project={filmProject}
          nextProject={getNextProjectOfType(project)}
        />
      );
    }

    case "short-form":
      return (
        <ShortFormProjectLayout
          project={project}
          nextProject={getNextProjectOfType(project)}
        />
      );

    case "motion": {
      const position =
        getProjectsByType("motion").findIndex(
          (item) => item.slug === project.slug
        ) + 1;

      return (
        <MotionProjectLayout
          project={project}
          nextProject={getNextProject(slug)}
          position={position}
        />
      );
    }

    default:
      return (
        <DefaultProjectLayout
          project={project}
          nextProject={getNextProject(slug)}
        />
      );
  }
}
