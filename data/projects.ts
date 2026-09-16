export type ProjectType =
  | "film"
  | "motion"
  | "short-form"
  | "photography";

export type Project = {
  number: string;
  slug: string;
  title: string;
  titleLines?: string[];
  year?: string;
  type: ProjectType;
  category: string;
  role: string;
  description: string;
  client?: string;
  location?: string;
  featured?: boolean;
  video?: string;
  images: string[];
  cover: string;
};

export const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  film: "FILM",
  motion: "MOTION",
  "short-form": "SHORT-FORM",
  photography: "PHOTOGRAPHY",
};

const TEAMBUILDING_PHOTOS = Array.from(
  { length: 51 },
  (_, index) =>
    `/images/photography/cmc-teambuilding-18y/${String(
      index + 1
    ).padStart(2, "0")}.jpg`
);

export const projects: Project[] = [
  /* =========================================================
     FILM — 01 → 09
  ========================================================= */

  {
    number: "01",
    slug: "cmc-data-center",
    title: "CMC Data Center Maintenance and Servicing",
    titleLines: ["CMC DATA", "CENTER"],
    year: "2026",
    type: "film",
    category: "CORPORATE FILM",
    role: "DIRECTOR / DOP / EDITOR",
    description:
      "Video giới thiệu quy trình bảo trì, bảo dưỡng Data Center.",
    client: "CMC TELECOM",
    location: "VIETNAM",
    featured: true,
    video: "https://www.youtube.com/embed/m8_8tMzmpTg",
    images: [
      "/projects/cmc-data-center/01.jpg",
      "/projects/cmc-data-center/02.jpg",
      "/projects/cmc-data-center/03.jpg",
    ],
    cover: "/projects/cmc-data-center/01.jpg",
  },

  {
    number: "02",
    slug: "film-project-02",
    title: "Film Project 02",
    year: "2026",
    type: "film",
    category: "FILM",
    role: "DIRECTOR / DOP / EDITOR",
    description: "Project description coming soon.",
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
    description: "Project description coming soon.",
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
    description: "Project description coming soon.",
    video: "",
    images: [],
    cover: "",
  },

  {
    number: "05",
    slug: "film-project-05",
    title: "Film Project 05",
    year: "2026",
    type: "film",
    category: "FILM",
    role: "DIRECTOR / DOP / EDITOR",
    description: "Project description coming soon.",
    video: "",
    images: [],
    cover: "",
  },

  {
    number: "06",
    slug: "film-project-06",
    title: "Film Project 06",
    year: "2026",
    type: "film",
    category: "FILM",
    role: "DIRECTOR / DOP / EDITOR",
    description: "Project description coming soon.",
    video: "",
    images: [],
    cover: "",
  },

  {
    number: "07",
    slug: "film-project-07",
    title: "Film Project 07",
    year: "2026",
    type: "film",
    category: "FILM",
    role: "DIRECTOR / DOP / EDITOR",
    description: "Project description coming soon.",
    video: "",
    images: [],
    cover: "",
  },

  {
    number: "08",
    slug: "film-project-08",
    title: "Film Project 08",
    year: "2026",
    type: "film",
    category: "FILM",
    role: "DIRECTOR / DOP / EDITOR",
    description: "Project description coming soon.",
    video: "",
    images: [],
    cover: "",
  },

  {
    number: "09",
    slug: "film-project-09",
    title: "Film Project 09",
    year: "2026",
    type: "film",
    category: "FILM",
    role: "DIRECTOR / DOP / EDITOR",
    description: "Project description coming soon.",
    video: "",
    images: [],
    cover: "",
  },

  /* =========================================================
     MOTION — 10 → 12
  ========================================================= */

  {
    number: "10",
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
  number: "11",
  slug: "motion-project-02",
  title: "GAME ON",
  type: "motion",
  category: "MOTION GRAPHICS",
  role: "MOTION GRAPHICS / EDITOR",
  description:
    "A motion design project for CMC Telecom “GAME ON — One Team, One Goal” campaign, combining football-inspired visuals, dynamic mascots, and energetic stadium graphics into a bold event identity.",

  images: [
    "/projects/motion-project-02/01.gif",
    "/projects/motion-project-02/02.gif",
    "/projects/motion-project-02/03.gif",
    "/projects/motion-project-02/04.gif",
    "/projects/motion-project-02/05.gif",
    "/projects/motion-project-02/06.gif",
  ],

    cover: "/projects/motion-project-02/cover.png",
  },

  {
    number: "12",
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
     SHORT-FORM — 13 → 16
  ========================================================= */

  {
    number: "13",
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
    number: "14",
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

  {
    number: "15",
    slug: "short-form-project-03",
    title: "Short-Form Project 03",
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
    number: "16",
    slug: "short-form-project-04",
    title: "Short-Form Project 04",
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
     PHOTOGRAPHY — 17 → 19
  ========================================================= */

  {
    number: "17",
    slug: "photography-project-01",
    title: "CMC TEAMBUILDING 18Y",
    year: "2026",
    type: "photography",
    category: "PHOTOGRAPHY",
    role: "PHOTOGRAPHER",
    description:
      "A photography series documenting a 3-day team building trip with CMC Telecom in Da Nang, capturing the people, activities, and memorable moments throughout the journey.",
    client: "CMC TELECOM",
    location: "DA NANG",
    video: "",
    images: TEAMBUILDING_PHOTOS,
    cover:
      "/images/photography/cmc-teambuilding-18y/cover.jpg",
  },

  {
    number: "18",
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
    number: "19",
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
];

export function getProject(slug: string) {
  return projects.find(
    (project) => project.slug === slug
  );
}

export function getNextProject(slug: string) {
  const currentIndex = projects.findIndex(
    (item) => item.slug === slug
  );

  if (currentIndex < 0) {
    return projects[0];
  }

  return projects[
    (currentIndex + 1) % projects.length
  ];
}

export function getTitleLines(project: Project) {
  if (project.titleLines?.length) {
    return project.titleLines;
  }

  const words = project.title
    .trim()
    .split(/\s+/);

  if (words.length <= 2) {
    return [project.title];
  }

  const mid = Math.ceil(
    words.length / 2
  );

  return [
    words.slice(0, mid).join(" "),
    words.slice(mid).join(" "),
  ];
}