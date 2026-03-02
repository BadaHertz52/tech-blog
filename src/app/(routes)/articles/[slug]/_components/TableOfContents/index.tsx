import { ReactNode } from "react";

import Skeleton from "@/components/Skeleton";
import { TocHeading } from "@/types/article";
import TocList from "./components/TocList";

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="hidden w-[300px] flex-shrink-0 md:block">
      <div className="sticky top-32 flex flex-col gap-6 rounded-lg bg-white p-4">
        {children}
      </div>
    </div>
  );
}

function Loading() {
  return (
    <Panel>
      <Skeleton widthTwClass="w-full" heightTwClass="h-[300px]" />
    </Panel>
  );
}

interface LoadedProps {
  headings: TocHeading[];
}

function Loaded({ headings }: LoadedProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <Panel>
      <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
        On This Page
      </p>
      <TocList headings={headings} />
    </Panel>
  );
}

const TableOfContents = { Loading, Loaded };

export default TableOfContents;
