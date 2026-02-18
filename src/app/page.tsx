import Image from "next/image";

import heroImage from "@/assets/images/hero.webp";
import SpeechBubble from "@/components/SpeechBubble";

export default function Home() {
  return (
    <div className="relative file:w-full">
      <Image
        src={heroImage}
        alt="데스트 셋업"
        priority
        placeholder="blur"
        sizes="100%"
        className="h-auto w-full rounded-md"
      />
      <button
        type="button"
        disabled
        className="xs:top-[36%] absolute left-[20%] top-[34%] translate-x-[-50%] translate-y-[-50%] text-[12px] leading-[1.4] md:top-[36%] md:text-sm [@media(max-width:320px)]:top-[32%]"
      >
        <SpeechBubble tailPosition="bottom">Coming Soon</SpeechBubble>
      </button>
    </div>
  );
}
