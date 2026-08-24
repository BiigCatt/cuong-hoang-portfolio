export type Project = {
  number: string;
  slug: string;
  title: string;
  year: string;
  category: string;
  role: string;
  description: string;
  video: string;
  images: string[];
  cover: string;
};

export const projects: Project[] = [
  {
  number: "01",
  slug: "cmc-data-center",
  title: "CMC Data Center Maintenance and Servicing",
  year: "2026",
  category: "CORPORATE FILM",
  role: "DIRECTOR / DOP / EDITOR",
  description:
    "Video giới thiệu quy trình bảo trì, bảo dưỡng Data Center.",
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
  slug: "project-02",
  title: "CMC Data Center Maintenance and Servicing",
  year: "2026",
  category: "CORPORATE FILM",
  role: "DIRECTOR / DOP / EDITOR",
  description:
    "Video giới thiệu quy trình bảo trì, bảo dưỡng Data Center.",
  video: "",
  images: [],
  cover: "",
},

  {
    number: "03",
    slug: "project-03",
    title: "CMC Data Center Maintenance and Servicing",
    year: "2026",
    category: "CORPORATE FILM",
    role: "DIRECTOR / DOP / EDITOR",
    description:
      "Video giới thiệu quy trình bảo trì, bảo dưỡng Data Center.",
    video: "",
    images: [],
    cover: "",
  },

  {
    number: "04",
    slug: "project-04",
    title: "CMC Data Center Maintenance and Servicing",
    year: "2026",
    category: "CORPORATE FILM",
    role: "DIRECTOR / DOP / EDITOR",
    description:
      "Video giới thiệu quy trình bảo trì, bảo dưỡng Data Center.",
    video: "",
    images: [],
    cover: "",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}