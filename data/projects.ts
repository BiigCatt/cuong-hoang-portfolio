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
  type: ProjectType;
  category: string;
  role: string;
  description: string;
  featured?: boolean;
  video?: string;
  images: string[];
  cover: string;
};

export const PROJECT_TYPE_LABEL: Record<
  ProjectType,
  string
> = {
  film: "FILM",
  motion: "MOTION",
  "short-form": "SHORT-FORM",
  photography: "PHOTOGRAPHY",
};


/* =========================================================
   PHOTOGRAPHY DATA
========================================================= */

const TEAMBUILDING_PHOTOS = Array.from(
  { length: 51 },
  (_, index) =>
    `/images/photography/cmc-teambuilding-18y/${String(
      index + 1
    ).padStart(2, "0")}.jpg`
);


/* =========================================================
   PROJECTS
========================================================= */

export const projects: Project[] = [

  /* =======================================================
     FILM — 01 → 09

     QUY TẮC CHUNG:
     public/projects/<slug>/
       cover.jpg
       01.gif / 01.jpg
       02.gif / 02.jpg
       03.gif / 03.jpg
       ...

     images KHÔNG cần khai báo nữa.
     Film detail tự quét folder.
  ======================================================= */

  {
    number: "01",
    slug: "cmc-data-center",
    title:
      "CMC Data Center Maintenance and Servicing",
    titleLines: [
      "CMC DATA",
      "CENTER",
    ],
    type: "film",
    category: "CORPORATE FILM",
    role:
      "DIRECTOR / DOP / CAM OP / EDITOR",
    description:
      "Video giới thiệu quy trình bảo trì, bảo dưỡng Data Center.",
    featured: true,

    video:
      "https://www.youtube.com/embed/m8_8tMzmpTg",

    images: [],

    cover:
      "/projects/cmc-data-center/cover.jpg",
  },


  {
    number: "02",
    slug: "film-project-02",
    title: "Film Project 02",
    type: "film",
    category: "FILM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Project description coming soon.",

    video: "",

    images: [],

    cover:
      "/projects/film-project-02/cover.jpg",
  },


  {
    number: "03",
    slug: "film-project-03",
    title: "Film Project 03",
    type: "film",
    category: "FILM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Project description coming soon.",

    video: "",

    images: [],

    cover:
      "/projects/film-project-03/cover.jpg",
  },


  {
    number: "04",
    slug: "film-project-04",
    title: "Film Project 04",
    type: "film",
    category: "FILM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Project description coming soon.",

    video: "",

    images: [],

    cover:
      "/projects/film-project-04/cover.jpg",
  },


  {
    number: "05",
    slug: "film-project-05",
    title: "SPEED UP",
    type: "film",
    category:
      "MUSIC / PERFORMANCE FILM",
    role:
      "DIRECTOR / DOP / CAM OP / EDITOR",

    description:
      "A high-energy rock performance film built around fast guitar shredding, dramatic lighting, and dynamic camera work, capturing the raw intensity of the performance.",

    video:
      "https://www.youtube.com/embed/qw6PQNEVVVk",

    images: [],

    cover:
      "/projects/film-project-05/cover.jpg",
  },


  {
    number: "06",
    slug: "film-project-06",
    title: "U.S. CHICKEN COOKING CONTEST",
    titleLines: [
  "U.S. CHICKEN",
  "COOKING CONTEST",
],
    type: "film",
    category: "EVENT RECAP",
    role:
      "CAM OP / EDITOR",
    description:
  "A dynamic event film capturing culinary demonstrations, chef interactions, and competition highlights from the U.S. Chicken Tailored Seminar & Cooking Contest 2025.",

    video: "https://youtu.be/bML3vhrjsKI?si=xqR6TodlUsp_Wgtb",

    images: [],

    cover:
      "/projects/film-project-06/cover.jpg",
  },


  {
    number: "07",
    slug: "film-project-07",
    title: "Film Project 07",
    type: "film",
    category: "FILM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Project description coming soon.",

    video: "",

    images: [],

    cover:
      "/projects/film-project-07/cover.jpg",
  },


  {
    number: "08",
    slug: "film-project-08",
    title: "THE BARTENDER",
    type: "film",
    category: "PROMOTIONAL FILM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
  "A promotional film for Hướng Nghiệp Á Âu’s Bartending Academy, capturing bartender stories, training, and cocktail craft.",

    video: "https://youtu.be/1kKSqlvHKl8?si=Vcy-deQX0mPCmShU",

    images: [],

    cover:
      "/projects/film-project-08/cover.jpg",
  },


  {
    number: "09",
    slug: "film-project-09",
    title: "Film Project 09",
    type: "film",
    category: "FILM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Project description coming soon.",

    video: "",

    images: [],

    cover:
      "/projects/film-project-09/cover.jpg",
  },


  /* =======================================================
     MOTION — 10 → 12
  ======================================================= */

  {
    number: "10",
    slug: "motion-project-01",
    title: "Motion Project 01",
    type: "motion",
    category: "MOTION DESIGN",
    role:
      "MOTION DESIGNER / EDITOR",

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
    role:
      "MOTION GRAPHICS / EDITOR",

    description:
      "A motion design project for CMC Telecom “GAME ON — One Team, One Goal” campaign, combining football-inspired visuals, dynamic mascots, and energetic stadium graphics into a bold event identity.",

    video: "",

    images: [
      "/projects/motion-project-02/01.gif",
      "/projects/motion-project-02/02.gif",
      "/projects/motion-project-02/03.gif",
      "/projects/motion-project-02/04.gif",
      "/projects/motion-project-02/05.gif",
      "/projects/motion-project-02/06.gif",
    ],

    cover:
      "/projects/motion-project-02/cover.png",
  },


  {
    number: "12",
    slug: "motion-project-03",
    title: "CMC FAMILY DAY",
    type: "motion",
    category: "MOTION DESIGN",
    role:
      "MOTION DESIGNER / EDITOR",

    description:
      "A playful motion piece for CMC Telecom Family Day, celebrating connection and togetherness through colorful mascot visuals.",

    video: "",

    images: [
      "/projects/motion-project-03/01.gif",
      "/projects/motion-project-03/02.gif",
      "/projects/motion-project-03/03.gif",
      "/projects/motion-project-03/04.gif",
    ],

    cover:
      "/projects/motion-project-03/cover.png",
  },


  /* =======================================================
     SHORT-FORM — 13 → 16
  ======================================================= */

  {
    number: "13",
    slug: "short-form-project-01",
    title: "Short-Form Project 01",
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",

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
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",

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
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",

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
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",

    description:
      "Short-form video project description coming soon.",

    video: "",

    images: [],

    cover: "",
  },


  /* =======================================================
     PHOTOGRAPHY — 17 → 19
  ======================================================= */

  {
    number: "17",
    slug:
      "photography-project-01",
    title:
      "CMC TEAMBUILDING 18Y",
    type: "photography",
    category: "PHOTOGRAPHY",
    role: "PHOTOGRAPHER",

    description:
      "A photography series documenting a 3-day team building trip with CMC Telecom in Da Nang, capturing the people, activities, and memorable moments throughout the journey.",

    video: "",

    images:
      TEAMBUILDING_PHOTOS,

    cover:
      "/images/photography/cmc-teambuilding-18y/cover.jpg",
  },


  {
    number: "18",
    slug:
      "photography-project-02",
    title: "PICKLEBALL",
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
    slug:
      "photography-project-03",
    title:
      "Photography Project 03",
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
   HELPERS
========================================================= */

export function getProject(
  slug: string
) {
  return projects.find(
    (project) =>
      project.slug === slug
  );
}


export function getNextProject(
  slug: string
) {
  const currentIndex =
    projects.findIndex(
      (item) =>
        item.slug === slug
    );

  if (currentIndex < 0) {
    return projects[0];
  }

  return projects[
    (currentIndex + 1) %
      projects.length
  ];
}


export function getTitleLines(
  project: Project
) {
  if (
    project.titleLines?.length
  ) {
    return project.titleLines;
  }

  const words =
    project.title
      .trim()
      .split(/\s+/);

  if (words.length <= 2) {
    return [project.title];
  }

  const mid = Math.ceil(
    words.length / 2
  );

  return [
    words
      .slice(0, mid)
      .join(" "),

    words
      .slice(mid)
      .join(" "),
  ];
}