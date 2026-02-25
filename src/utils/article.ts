import type { ArticleSort } from "@/types/article";

/**
 * 아티클의 상대 경로 이미지를 절대 경로로 변환합니다.
 * @param slug - 아티클 slug (예: "2025-retrospective")
 * @param imagePath - 상대 경로 (예: "./images/hero.webp")
 * @returns 절대 경로 (예: "/articles/2025-retrospective/images/hero.webp")
 */
export const resolveArticleImagePath = (
  slug: string,
  imagePath: string
): string => {
  // 이미 절대 경로인 경우 그대로 반환
  if (imagePath.startsWith("/")) {
    return imagePath;
  }

  // 상대 경로 -> 절대 경로 변환
  // "./images/hero.webp" -> "/articles/2025-retrospective/images/hero.webp"
  const cleanPath = imagePath.startsWith("./") ? imagePath.slice(2) : imagePath;
  return `/articles/${slug}/${cleanPath}`;
};

/**
 * 값이 유효한 ArticleSort 타입인지 확인하는 타입 가드
 * @param value - 검증할 값
 * @returns value가 ArticleSort 타입이면 true
 */
export const isValidArticleSort = (value: unknown): value is ArticleSort => {
  return value === "newest" || value === "oldest";
};

/**
 * searchParams에서 sort 값을 검증하고 ArticleSort 타입으로 반환
 * @param sort - 검증할 sort 값 (보통 string | undefined)
 * @returns 유효한 ArticleSort 또는 기본값 "newest"
 */
export const parseArticleSort = (sort: unknown): ArticleSort => {
  if (isValidArticleSort(sort)) {
    return sort;
  }
  return "newest"; // 기본값
};
