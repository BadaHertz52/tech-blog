"use client";

import { useTocActiveId } from "./hooks/useTocActiveId";
import type { TocHeading } from "./types";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const activeId = useTocActiveId();

  if (headings.length === 0) {
    return null;
  }

  const handleScrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getPaddingClass = (level: number) => {
    switch (level) {
      case 1:
        return "pl-0";
      case 2:
        return "pl-0";
      case 3:
        return "pl-4";
      case 4:
        return "pl-8";
      default:
        return "pl-0";
    }
  };

  return (
    <nav
      className="hidden w-80 flex-shrink-0 md:block"
      aria-label="Table of contents"
    >
      <div className="sticky top-32 flex flex-col gap-6 rounded-lg bg-white p-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            On This Page
          </h2>
        </div>

        {/* 목차 목록 */}
        <ul className="flex flex-col gap-2">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;

            return (
              <li key={heading.id}>
                <button
                  onClick={() => handleScrollToHeading(heading.id)}
                  className={`w-full truncate text-left text-sm transition-colors duration-200 ${getPaddingClass(heading.level)} ${
                    isActive
                      ? "border-l-2 border-primary-blue font-semibold text-primary-blue"
                      : "border-l-2 border-transparent text-gray-600 hover:text-text-primary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {heading.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
