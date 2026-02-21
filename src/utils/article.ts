import { Article, ArticleCard } from '@/types/article'

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
  if (imagePath.startsWith('/')) {
    return imagePath
  }

  // 상대 경로 -> 절대 경로 변환
  // "./images/hero.webp" -> "/articles/2025-retrospective/images/hero.webp"
  const cleanPath = imagePath.startsWith('./') ? imagePath.slice(2) : imagePath
  return `/articles/${slug}/${cleanPath}`
}

/**
 * 아티클의 썸네일 경로를 로깅합니다.
 * 개발 환경에서 이미지 경로를 확인할 때 사용합니다.
 */
export const logThumbnailPath = (article: Article | ArticleCard): void => {
  if (process.env.NODE_ENV === 'development') {
    const absolutePath = resolveArticleImagePath(
      article.slug,
      article.thumbnail
    )
    console.log(`📸 [${article.slug}] thumbnail: ${absolutePath}`)
  }
}

/**
 * 아티클 목록과 함께 썸네일 경로를 로깅합니다.
 */
export const logArticleThumbnails = (articles: ArticleCard[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log('📚 Article Thumbnails:')
    articles.forEach((article) => {
      logThumbnailPath(article)
    })
  }
}
