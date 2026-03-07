import path from "path";

// ============================================
// 클라이언트 라우트 경로
// ============================================

// 페이지 경로
const ARTICLES_PATH = "/articles";

// 라우트 경로
export const ROUTES = {
  home: "/",
  articles: ARTICLES_PATH,
  article: (slug: string) => `${ARTICLES_PATH}/${slug}`,
  category: (category: string) => `${ARTICLES_PATH}?category=${category}`,
} as const;

// ============================================
// 서버 파일 시스템 경로 (Node.js 환경에서만 사용)
// ============================================

/**
 * 프로젝트 루트의 public 디렉토리 절대 경로
 * import.meta.url 기반으로 현재 파일의 위치를 기준으로 계산
 *
 * @example
 * // 현재 파일이 src/constants/paths.ts이므로
 * // "../../public" = src -> src (루트) -> public
 */
export const PUBLIC_DIRECTORY = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "../../public"
);

/**
 * 아티클 데이터 디렉토리 절대 경로
 */
export const ARTICLE_DATA_DIRECTORY = path.join(PUBLIC_DIRECTORY, "articles");
