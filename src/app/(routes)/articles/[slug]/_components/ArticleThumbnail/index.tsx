import Image from "next/image";

import Skeleton from "@/components/Skeleton";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <figure className="relative aspect-video w-full overflow-hidden rounded-card shadow-md">
      {children}
    </figure>
  );
}

function Loading() {
  return (
    <Wrapper>
      <Skeleton widthTwClass="w-full" heightTwClass="h-full" roundedTwClass="rounded-none" />
    </Wrapper>
  );
}

interface LoadedProps {
  src: string;
  alt: string;
}

function Loaded({ src, alt }: LoadedProps) {
  return (
    <Wrapper>
      <Image src={src} alt={alt} fill priority />
    </Wrapper>
  );
}

const ArticleThumbnail = { Loading, Loaded };

export default ArticleThumbnail;
