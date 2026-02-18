import Image from "next/image";

import heroImage from "@/assets/images/hero.webp";

export default function Home() {
  return (
    <div className="relative w-[87vw]">
      <Image
        src={heroImage}
        alt="데스트 셋업"
        priority
        placeholder="blur"
        sizes="87vw"
        className="h-auto w-full rounded-md"
      />
    </div>
  );
}
