"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import BooksImage from "@/assets/images/home/books.webp";
import ComputerImage from "@/assets/images/home/computer.webp";
import DeskBgImage from "@/assets/images/home/desk-bg.webp";
import WelcomeMessageImage from "@/assets/images/home/welcome-message.webp";
import { ROUTES } from "@/constants/paths";

import ArticleRecommendButton from "../ArticleRecommendButton";

const TOTAL_IMAGES = 4;

export default function HomeDeskScene() {
  const [loadedCount, setLoadedCount] = useState(0);
  const isAllLoaded = loadedCount === TOTAL_IMAGES;

  const handleLoad = () => setLoadedCount((prev) => prev + 1);

  return (
    <div className="relative w-full">
      {!isAllLoaded && (
        <div
          className="w-full animate-pulse rounded-card bg-gray-200"
          style={{ aspectRatio: "4320/2409" }}
        />
      )}
      <div className={isAllLoaded ? "block" : "invisible absolute inset-0"}>
        <Image
          src={DeskBgImage}
          alt="데스크 배경"
          priority
          sizes="(max-width:768px) calc(100vw - 24px * 2), (max-width: 1440px) calc(100vw - 32px * 2), calc(1440px - 32px * 2)"
          className="h-auto w-full rounded-card"
          onLoad={handleLoad}
        />
        <div
          className="absolute"
          style={{ width: "54.85%", top: "2.86%", left: "22.57%" }}
        >
          <Image
            src={ComputerImage}
            alt="컴퓨터"
            sizes="55vw"
            className="h-auto w-full"
            onLoad={handleLoad}

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
            sizes="16vw"
            className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
            onLoad={handleLoad}

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
            sizes="15vw"
            className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
            onLoad={handleLoad}

          />
        </Link>
        <ArticleRecommendButton />
      </div>
    </div>
  );
}
