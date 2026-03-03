"use client";

import clsx from "clsx";

import { TocHeading } from "@/types/article";
import { useTocActiveId } from "../../_hooks/useTocActiveId";

const getPaddingClass = (level: number) => {
  switch (level) {
    case 1:
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

interface TocListProps {
  headings: TocHeading[];
}

export default function TocList({ headings }: TocListProps) {
  const activeId = useTocActiveId({ headings });

  const handleScrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav>
      <ul className="flex flex-col gap-2 border-l-2 border-slate-100">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;

          return (
            <li key={heading.id} className="-ml-[2px]">
              <button
                type="button"
                onClick={() => handleScrollToHeading(heading.id)}
                className={clsx(
                  "w-full truncate border-l-2 pl-3 text-left text-sm transition-colors duration-200",
                  isActive
                    ? "border-primary-blue font-semibold text-primary-blue"
                    : "border-transparent"
                )}
                aria-label={`섹션: ${heading.text}${isActive ? " (현재 섹션)" : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                <span className={getPaddingClass(heading.level)}>
                  {heading.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
