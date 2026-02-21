// 페이지 경로
const ARTICLES_PATH = "/articles";

// 라우트 경로
export const ROUTES = {
  home: "/",
  articles: ARTICLES_PATH,
  article: (slug: string) => `${ARTICLES_PATH}/${slug}`,
  category: (category: string) => `${ARTICLES_PATH}?category=${category}`,
} as const;
