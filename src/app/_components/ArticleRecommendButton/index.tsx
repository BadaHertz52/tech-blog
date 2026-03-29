"use client";

import Image from "next/image";

import GashaponImage from "@/assets/images/home/gashapon.webp";
import { openArticleRecommendModal } from "./_components/ArticleRecommendModal";

export default function ArticleRecommendButton() {
  return (
    <button
      type="button"
      style={{ width: "15.14%", top: "47%", left: "18.5%" }}
      className="group absolute"
      onClick={openArticleRecommendModal}
    >
      <Image
        src={GashaponImage}
        alt="아티클 추천 머신"
        placeholder="blur"
        sizes="15vw"
        className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
      />
    </button>
  );
}
