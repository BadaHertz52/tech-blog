import Image from "next/image";

import heroImage from "@/assets/images/hero.webp";
import SpeechBubble from "@/components/SpeechBubble";

export default function Home() {
  return (
    <div className="relative w-full">
      <Image
        src={heroImage}
        alt="데스크 셋업"
        priority
        placeholder="blur"
        sizes="(max-width:768px) calc(100vw - 24px *2), (max-width: 1440px) calc(100vw - 32px * 2), calc(1440px - 32px * 2)"
        className="h-auto w-full rounded-card"
      />
      <button
        type="button"
        disabled
        className="absolute left-[20%] top-[34%] -translate-x-1/2 -translate-y-1/2 text-[12px] leading-[1.4] xs:top-[36%] md:top-[36%] md:text-sm [@media(max-width:320px)]:top-[32%]"
      >
        <SpeechBubble tailPosition="bottom">Coming Soon</SpeechBubble>
      </button>
    </div>
  );
}
