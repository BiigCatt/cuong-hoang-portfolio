"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type ShortFormStripProps = {
  /** Ảnh của project (public/projects/<slug>/01.jpg ...). */
  images: string[];
  /** Dùng khi chưa có ảnh nào của project (khung hình YouTube). */
  fallbackImages?: string[];
  title: string;
};

/* Hàng ảnh xem trước dưới video: các ảnh chia đều chiều ngang trang.
   Ảnh nào chưa có / tải lỗi thì tự ẩn; chưa có ảnh nào thì dùng
   fallbackImages. */
export default function ShortFormStrip({
  images,
  fallbackImages = [],
  title,
}: ShortFormStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [failed, setFailed] = useState<string[]>([]);

  const own = images.filter((src) => !failed.includes(src));
  const shown =
    own.length > 0
      ? own
      : fallbackImages.filter((src) => !failed.includes(src));

  /* Ảnh lỗi trước khi trang "tỉnh dậy" (hydrate) thì onError bị lỡ,
     nên kiểm tra lại một lần khi component vừa hiện. */
  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const broken = Array.from(
      track.querySelectorAll<HTMLImageElement>("img")
    )
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.getAttribute("src") ?? "");

    if (broken.length > 0) {
      setFailed((current) => [...current, ...broken]);
    }
  }, []);

  if (shown.length === 0) return null;

  return (
    <section
      className="shortform-strip"
      aria-label={`${title} — ảnh xem trước`}
    >
      <div
        className="shortform-strip-track"
        ref={trackRef}
        style={{ "--strip-count": shown.length } as CSSProperties}
      >
        {shown.map((src) => (
          <div className="shortform-strip-item" key={src}>
            <img
              src={src}
              alt=""
              loading="lazy"
              onError={() =>
                setFailed((current) => [...current, src])
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
