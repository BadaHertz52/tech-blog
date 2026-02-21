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
