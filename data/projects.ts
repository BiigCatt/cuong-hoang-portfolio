export type ProjectType =
  | "film"
  | "motion"
  | "short-form"
  | "photography";

export type Project = {
  number: string;
  slug: string;
  title: string;
  year: string;

  type: ProjectType;

  category: string;
  role: string;
  description: string;

  video: string;
  images: string[];
  cover: string;
};

export const projects: Project[] = [
  /* =========================================================
     FILM / VIDEO
     PROJECT 01 — 04
  ========================================================= */

  {
    number: "01",
    slug: "cmc-data-center",
    title: "CMC Data Center Maintenance and Servicing",
    year: "2026",

    type: "film",

    category: "CORPORATE FILM",
    role: "DIRECTOR / DOP / EDITOR",

    description:
      "Video giới thiệu quy trình bảo trì, bảo dưỡng Data Center.",

    video:
      "https://www.youtube.com/embed/m8_8tMzmpTg",

    images: [
      "/projects/cmc-data-center/01.jpg",
      "/projects/cmc-data-center/02.jpg",
      "/projects/cmc-data-center/03.jpg",
    ],

    cover:
      "/projects/cmc-data-center/01.jpg",
  },

  {
    number: "02",
    slug: "film-project-02",
    title: "Film Project 02",
    year: "2026",

    type: "film",

    category: "FILM",
    role: "DIRECTOR / DOP / EDITOR",

    description:
      "Project description coming soon.",

    video: "",
    images: [],
    cover: "",
  },

  {
    number: "03",
    slug: "film-project-03",
    title: "Film Project 03",
    year: "2026",

    type: "film",

    category: "FILM",
    role: "DIRECTOR / DOP / EDITOR",

    description:
      "Project description coming soon.",

    video: "",
    images: [],
    cover: "",
  },

  {
    number: "04",
    slug: "film-project-04",
    title: "Film Project 04",
    year: "2026",

    type: "film",

    category: "FILM",
    role: "DIRECTOR / DOP / EDITOR",

    description:
      "Project description coming soon.",

    video: "",
    images: [],
    cover: "",
  },

  /* =========================================================
     MOTION
     PROJECT 05 — 07
  ========================================================= */

  {
    number: "05",
    slug: "motion-project-01",
    title: "Motion Project 01",
    year: "2026",

    type: "motion",

    category: "MOTION DESIGN",
    role: "MOTION DESIGNER / EDITOR",

    description:
      "Motion design project description coming soon.",

    video: "",
    images: [],
    cover: "",
  },

  {
    number: "06",
    slug: "motion-project-02",
    title: "Motion Project 02",
    year: "2026",

    type: "motion",

    category: "MOTION DESIGN",
    role: "MOTION DESIGNER / EDITOR",

    description:
      "Motion design project description coming soon.",

    video: "",
    images: [],
    cover: "",
  },

  {
    number: "07",
    slug: "motion-project-03",
    title: "Motion Project 03",
    year: "2026",

    type: "motion",

    category: "MOTION DESIGN",
    role: "MOTION DESIGNER / EDITOR",

    description:
      "Motion design project description coming soon.",

    video: "",
    images: [],
    cover: "",
  },

  /* =========================================================
     SHORT-FORM
     PROJECT 08 — 09
  ========================================================= */

  {
    number: "08",
    slug: "short-form-project-01",
    title: "Short-Form Project 01",
    year: "2026",

    type: "short-form",

    category: "SHORT-FORM",

    role: "DIRECTOR / DOP / EDITOR",

    description:
      "Short-form video project description coming soon.",

    video: "",
    images: [],
    cover: "",
  },

  {
    number: "09",
    slug: "short-form-project-02",
    title: "Short-Form Project 02",
    year: "2026",

    type: "short-form",

    category: "SHORT-FORM",

    role: "DIRECTOR / DOP / EDITOR",

    description:
      "Short-form video project description coming soon.",

    video: "",
    images: [],
    cover: "",
  },

  /* =========================================================
     PHOTOGRAPHY
     PROJECT 10 — 13
  ========================================================= */

  {
    number: "10",
    slug: "photography-project-01",
    title: "CMC TEAMBUILDING 18Y",
    year: "2026",

    type: "photography",

    category: "PHOTOGRAPHY",
    role: "PHOTOGRAPHER",

    description:
  "A photography series documenting a 3-day team building trip with CMC Telecom in Da Nang, capturing the people, activities, and memorable moments throughout the journey.",
    video: "",
    images: [
  "/images/photography/cmc-teambuilding-18y/01.jpg",
  "/images/photography/cmc-teambuilding-18y/02.jpg",
  "/images/photography/cmc-teambuilding-18y/03.jpg",
  "/images/photography/cmc-teambuilding-18y/04.jpg",
  "/images/photography/cmc-teambuilding-18y/05.jpg",
  "/images/photography/cmc-teambuilding-18y/06.jpg",
  "/images/photography/cmc-teambuilding-18y/07.jpg",
  "/images/photography/cmc-teambuilding-18y/08.jpg",
  "/images/photography/cmc-teambuilding-18y/09.jpg",
  "/images/photography/cmc-teambuilding-18y/10.jpg",
  "/images/photography/cmc-teambuilding-18y/11.jpg",
  "/images/photography/cmc-teambuilding-18y/12.jpg",
  "/images/photography/cmc-teambuilding-18y/13.jpg",
  "/images/photography/cmc-teambuilding-18y/14.jpg",
  "/images/photography/cmc-teambuilding-18y/15.jpg",
  "/images/photography/cmc-teambuilding-18y/16.jpg",
  "/images/photography/cmc-teambuilding-18y/17.jpg",
  "/images/photography/cmc-teambuilding-18y/18.jpg",
  "/images/photography/cmc-teambuilding-18y/19.jpg",
  "/images/photography/cmc-teambuilding-18y/20.jpg",
  "/images/photography/cmc-teambuilding-18y/21.jpg",
  "/images/photography/cmc-teambuilding-18y/22.jpg",
  "/images/photography/cmc-teambuilding-18y/23.jpg",
  "/images/photography/cmc-teambuilding-18y/24.jpg",
  "/images/photography/cmc-teambuilding-18y/25.jpg",
  "/images/photography/cmc-teambuilding-18y/26.jpg",
  "/images/photography/cmc-teambuilding-18y/27.jpg",
  "/images/photography/cmc-teambuilding-18y/28.jpg",
  "/images/photography/cmc-teambuilding-18y/29.jpg",
  "/images/photography/cmc-teambuilding-18y/30.jpg",
  "/images/photography/cmc-teambuilding-18y/31.jpg",
  "/images/photography/cmc-teambuilding-18y/32.jpg",
  "/images/photography/cmc-teambuilding-18y/33.jpg",
  "/images/photography/cmc-teambuilding-18y/34.jpg",
  "/images/photography/cmc-teambuilding-18y/35.jpg",
  "/images/photography/cmc-teambuilding-18y/36.jpg",
  "/images/photography/cmc-teambuilding-18y/37.jpg",
  "/images/photography/cmc-teambuilding-18y/38.jpg",
  "/images/photography/cmc-teambuilding-18y/39.jpg",
  "/images/photography/cmc-teambuilding-18y/40.jpg",
  "/images/photography/cmc-teambuilding-18y/41.jpg",
  "/images/photography/cmc-teambuilding-18y/42.jpg",
  "/images/photography/cmc-teambuilding-18y/43.jpg",
  "/images/photography/cmc-teambuilding-18y/44.jpg",
  "/images/photography/cmc-teambuilding-18y/45.jpg",
  "/images/photography/cmc-teambuilding-18y/46.jpg",
  "/images/photography/cmc-teambuilding-18y/47.jpg",
  "/images/photography/cmc-teambuilding-18y/48.jpg",
  "/images/photography/cmc-teambuilding-18y/49.jpg",
  "/images/photography/cmc-teambuilding-18y/50.jpg",
  "/images/photography/cmc-teambuilding-18y/51.jpg",
],
    cover: "/images/photography/cmc-teambuilding-18y/cover.jpg",
  },

  {
    number: "11",
    slug: "photography-project-02",
    title: "PICKLEBALL",
    year: "2026",

    type: "photography",

    category: "PHOTOGRAPHY",
    role: "PHOTOGRAPHER",

    description:
      "Photography project description coming soon.",

    video: "",
    images: [],
    cover: "",
  },

  {
    number: "12",
    slug: "photography-project-03",
    title: "Photography Project 03",
    year: "2026",

    type: "photography",

    category: "PHOTOGRAPHY",
    role: "PHOTOGRAPHER",

    description:
      "Photography project description coming soon.",

    video: "",
    images: [],
    cover: "",
  },

  {
    number: "13",
    slug: "photography-project-04",
    title: "Photography Project 04",
    year: "2026",

    type: "photography",

    category: "PHOTOGRAPHY",
    role: "PHOTOGRAPHER",

    description:
      "Photography project description coming soon.",

    video: "",
    images: [],
    cover: "",
  },
];

/* =========================================================
   GET PROJECT BY SLUG
========================================================= */

export function getProject(slug: string) {
  return projects.find(
    (project) => project.slug === slug
  );
}