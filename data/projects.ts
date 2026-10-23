export type ProjectType =
  | "film"
  | "motion"
  | "short-form"
  | "photography";
export type Project = {
  number: string;
  slug: string;
  title: string;
  titleLines?: string[]
  type: ProjectType;
  category: string;
  role: string;
  description: string;
  featured?: boolean;
  video?: string;
  images: string[];
  cover: string;

  /** Ảnh bìa dự phòng, dùng khi file `cover` chưa có / tải lỗi. */
  coverFallback?: string;

  /** Ngắt dòng riêng cho tiêu đề ở card trang chủ (không ảnh hưởng trang detail). */
  cardTitle?: {
    lines: string[];
    /** Chiều cao tối thiểu (px) để các card cùng hàng thẳng hàng. */
    minHeight?: number;
  };

  /** Mô tả chia sẵn từng dòng (dòng đầu được tô riêng) — dùng ở trang motion. */
  descriptionLines?: string[];

  /** Class bổ sung cho <main> của trang detail (override style riêng). */
  detailClassName?: string;
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
   SHORT-FORM ASSETS

   Mỗi project short-form có 1 ảnh bìa + 4 ảnh nhỏ, nằm trong:
     public/projects/<slug>/
       cover.jpg   (ảnh bìa ở trang chủ)
       01.jpg ... 04.jpg  (4 ảnh nhỏ dưới video)

   CHỈ CẦN BỎ ẢNH VÀO THƯ MỤC, không phải sửa code.
   Chưa có ảnh thì tự dùng ảnh/khung hình YouTube thay thế.
========================================================= */
const SHORT_FORM_IMAGE_COUNT = 4;

function shortFormAssets(
  slug: string,
  youtubeId?: string
) {
  return {
    cover: `/projects/${slug}/cover.jpg`,
    coverFallback: youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      : "",
    images: Array.from(
      { length: SHORT_FORM_IMAGE_COUNT },
      (_, index) =>
        `/projects/${slug}/${String(
          index + 1
        ).padStart(2, "0")}.jpg`
    ),
  };
}
/* =========================================================
   PROJECTS
========================================================= */
export const projects: Project[] = [
  /* =======================================================
     FILM — 01 → 09
     QUY TẮC CHUNG:
     public/projects/<slug>/
       cover.jpg
       01.webp / 01.jpg
       02.webp / 02.jpg
       03.webp / 03.jpg
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
      "CMC DC",
      "Maintenance and Servicing",
    ],
    type: "film",
    category: "CORPORATE FILM",
    role:
      "DIRECTOR / DOP / CAM OP / EDITOR",
    description:
      "Video giới thiệu quy trình bảo trì, bảo dưỡng Data Center.",
    featured: true,
    video:
      "https://youtu.be/3iAe5tBNQ2E",
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
    title: "SUNNY SUMMER CAMP",
    titleLines: [
      "SUNNY SUMMER",
      "CAMP",
    ],
    cardTitle: {
      lines: ["SUNNY", "SUMMER CAMP"],
      minHeight: 110,
    },
    type: "film",
    category: "FILM",
    role:
      "CAM OP / EDITOR",
   description:
  "A lively summer camp film capturing hands-on cooking, creative workshops, and technology activities designed for young participants.",
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
    title: "DIM SUM WORKSHOP",
    type: "film",
    titleLines: [
      "DIM SUM",
      "WORKSHOP",
    ],
    cardTitle: {
      lines: ["DIM SUM", "WORKSHOP"],
    },
    category: "WORKSHOP RECAP",
    role:
      "CAM OP / DOP / EDITOR",
    description:
  "An event film capturing a hands-on dim sum workshop, from live chef demonstrations to practical techniques and participant experiences.",
    video: "https://youtu.be/AB1QL43m6nI",
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
      "/projects/motion-project-02/01.webp",
      "/projects/motion-project-02/02.webp",
      "/projects/motion-project-02/03.webp",
      "/projects/motion-project-02/04.webp",
      "/projects/motion-project-02/05.webp",
      "/projects/motion-project-02/06.webp",
    ],
    cover:
      "/projects/motion-project-02/cover.png",
    descriptionLines: [
      "A motion design project for CMC Telecom’s “GAME ON” campaign,",
      "combining football-inspired visuals, dynamic mascots,",
      "and energetic stadium graphics. Together,",
      "these elements create a bold event identity inspired by",
      "the spirit of “One Team — One Goal.”",
    ],
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
      "/projects/motion-project-03/01.webp",
      "/projects/motion-project-03/02.webp",
      "/projects/motion-project-03/03.webp",
      "/projects/motion-project-03/04.webp",
    ],
    cover:
      "/projects/motion-project-03/cover.png",
    detailClassName: "motion03-project",
  },
  /* =======================================================
     SHORT-FORM — 13 → 19, 23 → 27 (tổng 12 project)
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
    video:
      "https://www.youtube.com/shorts/BngrJmlrfC8",
    ...shortFormAssets(
      "short-form-project-01",
      "BngrJmlrfC8"
    ),
  },
  {
  number: "28",
  slug: "short-form-project-13",
  title: "Short-Form Project 13",
  type: "short-form",
  category: "SHORT-FORM",
  role: "DIRECTOR / DOP / EDITOR",
  description: "Short-form video project description coming soon.",
  video: "https://www.youtube.com/shorts/VHrqpE9BLKQ",
  ...shortFormAssets(
    "short-form-project-13",
    "VHrqpE9BLKQ"
  ),
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
    video:
      "https://www.youtube.com/shorts/R4IAgGwdVSM",
    ...shortFormAssets(
      "short-form-project-03",
      "R4IAgGwdVSM"
    ),
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
    video:
      "https://www.youtube.com/shorts/hZtI5ofqVlQ",
    ...shortFormAssets(
      "short-form-project-04",
      "hZtI5ofqVlQ"
    ),
  },

  {
    number: "17",
    slug: "short-form-project-05",
    title: "Short-Form Project 05",
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Short-form video project description coming soon.",
    video:
      "https://www.youtube.com/shorts/mYV_ZXsUHJo",
    ...shortFormAssets(
      "short-form-project-05",
      "mYV_ZXsUHJo"
    ),
  },
  {
    number: "18",
    slug: "short-form-project-06",
    title: "Short-Form Project 06",
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Short-form video project description coming soon.",
    video:
      "https://www.youtube.com/shorts/T8izqP7HZQw",
    ...shortFormAssets(
      "short-form-project-06",
      "T8izqP7HZQw"
    ),
  },
 {
    number: "14",
    slug: "short-form-project-02",
    title: "KỸ THUẬT LATTE ART",
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Video ghi lại buổi học pha cà phê bằng máy, từ cách sử dụng thiết bị đến thực hành đánh sữa và tạo hình latte art.",
    video: "https://www.youtube.com/embed/queb9H8BSbo",
    ...shortFormAssets(
      "short-form-project-02",
      "queb9H8BSbo"
    ),
  },
  {
    number: "23",
    slug: "short-form-project-08",
    title: "Short-Form Project 08",
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Short-form video project description coming soon.",
    video:
      "https://www.youtube.com/shorts/tEcdJlDG3-E",
    ...shortFormAssets(
      "short-form-project-08",
      "tEcdJlDG3-E"
    ),
  },
  
  {
    number: "24",
    slug: "short-form-project-09",
    title: "Short-Form Project 09",
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Short-form video project description coming soon.",
    video: "",
    ...shortFormAssets("short-form-project-09"),
  },
  {
    number: "25",
    slug: "short-form-project-10",
    title: "Short-Form Project 10",
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Short-form video project description coming soon.",
    video: "",
    ...shortFormAssets("short-form-project-10"),
  },
  {
    number: "19",
    slug: "short-form-project-07",
    title: "Short-Form Project 07",
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Short-form video project description coming soon.",
    video:
      "https://www.youtube.com/shorts/1E_LmFxso1I",
    ...shortFormAssets(
      "short-form-project-07",
      "1E_LmFxso1I"
    ),
  },
  {
    number: "26",
    slug: "short-form-project-11",
    title: "Short-Form Project 11",
    type: "short-form",
    category: "SHORT-FORM",
    role:
      "DIRECTOR / DOP / EDITOR",
    description:
      "Short-form video project description coming soon.",
    video: "",
    ...shortFormAssets("short-form-project-11"),
  },
  
   
  /* =======================================================
     PHOTOGRAPHY — 20 → 22
  ======================================================= */
  {
    number: "20",
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
    number: "21",
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
    number: "22",
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
/** Danh sách project theo loại (film / motion / short-form / photography). */
export function getProjectsByType(
  type: ProjectType
) {
  return projects.filter(
    (project) =>
      project.type === type
  );
}

/** Project kế tiếp trong CÙNG loại, xoay vòng. */
export function getNextProjectOfType(
  project: Project
) {
  const group =
    getProjectsByType(
      project.type
    );
  const index = group.findIndex(
    (item) =>
      item.slug === project.slug
  );
  return (
    group[
      (index + 1) % group.length
    ] ?? project
  );
}

/** Project kế tiếp trong TOÀN BỘ danh sách, xoay vòng. */
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
