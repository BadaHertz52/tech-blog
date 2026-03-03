"use client";

import { useEffect, useState } from "react";

import type { TocHeading } from "@/types/article";

const OBSERVE_OPTIONS = {
  root: null,
  rootMargin: "0px 0px -66% 0px", // 뷰포트 하단 66% 이상이 보이지 않는 영역
  threshold: 0,
};

const MUTATION_OBSERVER_OPTIONS = {
  childList: true,
  subtree: true,
};

/**
 * Heading 요소를 ID로 찾아서 반환
 */
const getHeadingElements = (headings: TocHeading[]): HTMLElement[] => {
  return headings
    .map((heading) => document.getElementById(heading.id))
    .filter((el): el is HTMLElement => el !== null);
};

/**
 * Viewport 상단에 가장 가까운 heading 찾기
 */
const findTopmostHeading = (
  entries: IntersectionObserverEntry[]
): IntersectionObserverEntry | null => {
  const visibleEntries = entries.filter((entry) => entry.isIntersecting);
  if (visibleEntries.length === 0) return null;

  return visibleEntries.reduce((prev, curr) => {
    const prevTop = ((prev as IntersectionObserverEntry & { __top?: number }).__top ??=
      prev.target.getBoundingClientRect().top);
    const currTop = ((curr as IntersectionObserverEntry & { __top?: number }).__top ??=
      curr.target.getBoundingClientRect().top);
    return currTop < prevTop ? curr : prev;
  });
};

export const useTocActiveId = ({ headings }: { headings: TocHeading[] }) => {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const trySetupObserver = () => {
      const headingElements = getHeadingElements(headings);
      if (headingElements.length === 0) return false;

      intersectionObserver = new IntersectionObserver((entries) => {
        const topmost = findTopmostHeading(entries);
        if (topmost) {
          setActiveId(topmost.target.id);
        }
      }, OBSERVE_OPTIONS);

      headingElements.forEach((el) => intersectionObserver!.observe(el));

      return true;
    };

    // 첫 시도: heading 요소가 이미 있으면 바로 시작
    if (!trySetupObserver()) {
      // heading 요소가 없으면 MutationObserver로 대기
      mutationObserver = new MutationObserver(() => {
        if (trySetupObserver()) {
          mutationObserver?.disconnect();
          mutationObserver = null;
        }
      });

      mutationObserver.observe(document.body, MUTATION_OBSERVER_OPTIONS);
    }

    return () => {
      intersectionObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [headings]);

  return activeId;
};
