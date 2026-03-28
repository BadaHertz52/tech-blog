const ARTICLES_PATH = "/articles";

/**
 * 프로젝트 라우트
 */
export const ROUTES = {
  home: "/",
  articles: ARTICLES_PATH,
  article: (slug: string) => `${ARTICLES_PATH}/${slug}`,
  category: (category: string) => `${ARTICLES_PATH}?category=${category}`,
  aboutMe: "/about-me",
} as const;
