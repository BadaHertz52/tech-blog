import Image from "next/image";
import Link from "next/link";

import ArticleRecommendButton from "@/app/_components/ArticleRecommendButton";
import BooksImage from "@/assets/images/home/books.webp";
import ComputerImage from "@/assets/images/home/computer.webp";
import DeskBgImage from "@/assets/images/home/desk-bg.webp";
import WelcomeMessageImage from "@/assets/images/home/welcome-message.webp";
import { ROUTES } from "@/constants/paths";

export default function Home() {
  return (
    <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-lg md:px-xl">
      <div className="relative w-full">
        <Image
          src={DeskBgImage}
          alt="데스크 배경"
          priority
          placeholder="blur"
          sizes="(max-width:768px) calc(100vw - 24px * 2), (max-width: 1440px) calc(100vw - 32px * 2), calc(1440px - 32px * 2)"
          className="h-auto w-full rounded-card"
        />
        <div
          className="absolute"
          style={{ width: "54.85%", top: "2.86%", left: "22.57%" }}
        >
          <Image
            src={ComputerImage}
            alt="컴퓨터"
            placeholder="blur"
            sizes="55vw"
            className="h-auto w-full"
          />
        </div>
        <Link
          href={ROUTES.aboutMe}
          style={{
            width: "16.39%",
            top: "29.89%",
            left: "43.54%",
          }}
          className="group absolute"
        >
          <Image
            src={WelcomeMessageImage}
            alt="환영 인사 및 About Me 페이지 이동 메시지"
            placeholder="blur"
            sizes="16vw"
            className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <Link
          href={ROUTES.articles}
          style={{ width: "15.14%", top: "34.63%", right: "15%" }}
          className="group absolute"
        >
          <Image
            src={BooksImage}
            alt="아티클 목록으로 이동"
            placeholder="blur"
            sizes="15vw"
            className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <ArticleRecommendButton />
      </div>
    </div>
  );
}
