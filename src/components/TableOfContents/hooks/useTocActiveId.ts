"use client";

import { useEffect, useState } from "react";

const HEADER_SELECTORS = "h2, h3, h4";
const OBSERVE_OPTIONS = {
  root: null,
  rootMargin: "-20% 0px -66% 0px", // 뷰포트 상단 20% 영역에서 활성화
  threshold: 0,
};

export const useTocActiveId = () => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll(HEADER_SELECTORS);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      let activeHeading: HTMLElement | null = null;

      // 가장 먼저 보이는 헤딩 찾기 (위에서부터)
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeHeading = entry.target as HTMLElement;
          break;
        }
      }

      if (activeHeading?.id) {
        setActiveId(activeHeading.id);
      }
    }, OBSERVE_OPTIONS);

    headings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return activeId;
};
