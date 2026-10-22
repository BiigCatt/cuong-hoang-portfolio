/* =========================================================
   SITE CONTENT
   Thông tin chung của trang (tên, liên hệ, mạng xã hội...).
   Sửa ở đây thay vì tìm trong JSX.
========================================================= */

export const SITE = {
  name: "CUONG HOANG",
  year: "2026",
  location: "VIETNAM",
  email: "caocuong749@gmail.com",
} as const;

export const NAV_LINKS = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
] as const;

export const CONTACT_LINKS = [
  {
    label: "EMAIL",
    href: `mailto:${SITE.email}`,
    external: false,
  },
  {
    label: "INSTAGRAM",
    href: "https://www.instagram.com/no.6rt/",
    external: true,
  },
  {
    label: "YOUTUBE",
    href: "https://www.youtube.com/@TheHillsOfficial-ME",
    external: true,
  },
  {
    label: "BEHANCE",
    href: "https://www.behance.net/caocuong749",
    external: true,
  },
] as const;

export const ABOUT_ROLES = [
  "DIRECTOR",
  "DOP",
  "EDITOR",
  "MEDIA PRODUCTION",
  "MOTION DESIGN",
  "PHOTOGRAPHY",
] as const;

/* Ghi chú nhỏ dưới tiêu đề từng nhóm ở trang chủ */
export const CATEGORY_NOTES = {
  film: "STORIES FOR A WIDER TOMORROW",
  "short-form": "SMALL FORMAT. BIG STORIES.",
  photography: "PEOPLE. PLACES. MOMENTS.",
  motion: "IDEAS IN MOTION",
} as const;
