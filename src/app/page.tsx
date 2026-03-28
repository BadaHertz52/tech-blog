import Image from "next/image";
import Link from "next/link";

import BooksImage from "@/assets/images/home/books.webp";
import ComputerImage from "@/assets/images/home/computer.webp";
import DeskBgImage from "@/assets/images/home/desk-bg.webp";
import GashaponImage from "@/assets/images/home/gashapon.webp";
import { ROUTES } from "@/constants/paths";

export default function Home() {
  return (
    <div className="relative w-full">
      <Image
        src={DeskBgImage}
        alt="데스크 배경"
        priority
        placeholder="blur"
        sizes="(max-width:768px) calc(100vw - 24px * 2), (max-width: 1440px) calc(100vw - 32px * 2), calc(1440px - 32px * 2)"
        className="h-auto w-full rounded-card"
      />
      <Link
        href={ROUTES.aboutMe}
        style={{ width: "54.85%", top: "2.86%", left: "22.57%" }}
        className="absolute"
      >
        <Image
          src={ComputerImage}
          alt="About Me 페이지로 이동"
          placeholder="blur"
          sizes="55vw"
          className="h-auto w-full"
        />
      </Link>
      <Link
        href={ROUTES.articles}
        style={{ width: "15.14%", top: "31.63%", right: "15%" }}
        className="absolute"
      >
        <Image
          src={BooksImage}
          alt="아티클 목록으로 이동"
          placeholder="blur"
          sizes="15vw"
          className="h-auto w-full"
        />
      </Link>
      <button
        type="button"
        style={{ width: "15.14%", top: "47%", left: "18.5%" }}
        className="absolute"
      >
        <Image
          src={GashaponImage}
          alt="아티클 추천 머신"
          placeholder="blur"
          sizes="15vw"
          className="h-auto w-full"
        />
      </button>
    </div>
  );
}
