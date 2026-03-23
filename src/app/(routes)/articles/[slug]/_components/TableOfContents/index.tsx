import { ReactNode } from "react";

import ShareButton from "@/components/ShareButton";
import Skeleton from "@/components/Skeleton";
import { incrementShareCount } from "@/services/supabase/actions";
import { TocHeading } from "@/types/article";
import TocList from "./components/TocList";

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="hidden w-[300px] flex-shrink-0 text-gray-medium md:block">
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
  slug: string;
}

function Loaded({ headings, slug }: LoadedProps) {
  const handleTrackShare = async () => {
    try {
      await incrementShareCount(slug);
    } catch (error) {
      console.error("[Article Stats] Error tracking share:", error);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <Panel>
      <div className="flex flex-col gap-8">
        <p className="text-sm font-bold uppercase tracking-wider">
          On This Page
        </p>
        <TocList headings={headings} />
      </div>
      <div className="mt-8 flex flex-col gap-4 border-t-[2px] border-gray-light pt-8">
        <p className="text-sm text-gray-medium">Share this post</p>
        <ShareButton
          buttonClassName="rounded-full w-8 h-8 bg-bg-white-anti-gray"
          onCopySuccess={handleTrackShare}
        />
      </div>
    </Panel>
  );
}

const TableOfContents = { Loading, Loaded };

export default TableOfContents;
