/* =========================================================
   VIDEO HELPERS
   Dùng chung cho FilmProjectLayout và ShortFormProjectLayout.
========================================================= */

/**
 * Chuẩn hoá link video về dạng nhúng được.
 *
 *   https://youtu.be/ID                -> https://www.youtube.com/embed/ID
 *   https://www.youtube.com/watch?v=ID -> https://www.youtube.com/embed/ID
 *   https://www.youtube.com/shorts/ID  -> https://www.youtube.com/embed/ID
 *   https://www.youtube.com/embed/ID   -> giữ nguyên
 *   /projects/<slug>/video.mp4         -> giữ nguyên (file local)
 */
export function normalizeVideoSrc(src?: string): string {
  if (!src) return "";

  const value = src.trim();

  try {
    const url = new URL(value);

    /* youtu.be/VIDEO_ID */
    if (url.hostname === "youtu.be" || url.hostname === "www.youtu.be") {
      const videoId = url.pathname.replace(/^\/+/, "").split("/")[0];

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    /* youtube.com/... */
    if (url.hostname.includes("youtube.com")) {
      /* đã là embed */
      if (url.pathname.startsWith("/embed/")) {
        return value;
      }

      /* youtube.com/watch?v=VIDEO_ID */
      const videoId = url.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      /* youtube.com/shorts/VIDEO_ID */
      const shortsMatch = url.pathname.match(/^\/shorts\/([^/?]+)/);

      if (shortsMatch?.[1]) {
        return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      }
    }
  } catch {
    /* Đường dẫn local (không phải URL đầy đủ) -> trả lại nguyên gốc. */
  }

  return value;
}

/** File video local (mp4 / webm / ogg) thay vì link nhúng. */
export function isLocalVideoSrc(src: string): boolean {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}
