import { ReactNode } from "react";

import Skeleton from "@/components/Skeleton";
import { TocHeading } from "@/types/article";
import TocItems from "./components/TocItems";

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="hidden w-[300px] flex-shrink-0 md:block">
      <div className="sticky top-32 flex flex-col gap-6 rounded-lg bg-white p-4">
        {children}
      </div>
    </div>
  );
}

function List({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col gap-2">{children}</ul>;
}

function Loading() {
  return (
    <Panel>
      <Skeleton widthTwClass="w-24" heightTwClass="h-3" />
      <List>
        <li>
          <Skeleton widthTwClass="w-3/4" heightTwClass="h-3" />
        </li>
        <li>
          <Skeleton widthTwClass="w-2/3" heightTwClass="h-3" className="pl-4" />
        </li>
        <li>
          <Skeleton widthTwClass="w-1/2" heightTwClass="h-3" className="pl-4" />
        </li>
      </List>
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
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
        On This Page
      </h2>
      <List>
        <TocItems headings={headings} />
      </List>
    </Panel>
  );
}

const TableOfContents = { Loading, Loaded };

export default TableOfContents;
