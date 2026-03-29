import Image from "next/image";

import BadaImage from "@/assets/images/bada-3d-half.webp";
import ButtonLink from "@/components/ButtonLink";
import { ROUTES } from "@/constants/paths";

interface ComingSoonProps {
  showHomeButton?: boolean;
}

export default function ComingSoon({
  showHomeButton = true,
}: ComingSoonProps) {
  return (
    <article className="flex h-full w-full flex-col items-center justify-center gap-[22px] rounded-card bg-white px-[40px] pt-[40px]">
      <div className="flex flex-col items-center gap-6">
        <header className="flex flex-wrap justify-center text-center text-[24px] font-bold leading-[1.4] tracking-[-0.5px] text-[#7e7e7e]">
          <span className="whitespace-nowrap">준비 중입니다.</span>
          &nbsp;
          <span className="whitespace-nowrap">곧 만나요!</span>
        </header>
        {showHomeButton && (
          <ButtonLink
            href={ROUTES.home}
            variant="secondary"
            className="text-[#7e7e7e]"
          >
            홈으로 이동하기
          </ButtonLink>
        )}
      </div>
      <Image
        src={BadaImage}
        alt="준비 중인 페이지 캐릭터"
        placeholder="blur"
        className="h-auto w-[60%] max-w-[200px]"
      />
    </article>
  );
}
