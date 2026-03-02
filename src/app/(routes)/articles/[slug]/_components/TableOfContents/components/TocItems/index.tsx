"use client";

import { TocHeading } from "@/types/article";
import { useTocActiveId } from "../../_hooks/useTocActiveId";

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

interface TocItemsProps {
  headings: TocHeading[];
}

export default function TocItems({ headings }: TocItemsProps) {
  const activeId = useTocActiveId();

  const handleScrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {headings.map((heading) => {
        const isActive = activeId === heading.id;

        return (
          <li key={heading.id}>
            <button
              type="button"
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
    </>
  );
}
