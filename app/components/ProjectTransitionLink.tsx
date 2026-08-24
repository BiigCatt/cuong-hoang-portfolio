"use client";

import { useRouter } from "next/navigation";
import {
  MouseEvent,
  ReactNode,
  useState,
} from "react";

type ProjectTransitionLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function ProjectTransitionLink({
  href,
  className = "",
  children,
}: ProjectTransitionLinkProps) {
  const router = useRouter();

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    if (isTransitioning) return;

    setIsTransitioning(true);

    window.setTimeout(() => {
      router.push(href);
    }, 450);
  };

  return (
    <>
      <a
        href={href}
        className={className}
        onClick={handleClick}
        data-cursor
      >
        {children}
      </a>

      <div
        className={`page-transition ${
          isTransitioning ? "is-active" : ""
        }`}
        aria-hidden="true"
      />
    </>
  );
}