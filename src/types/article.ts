/**
 * 블로그 포스트 카테고리
 */
export type ArticleCategory =
  | "troubleshooting"
  | "retrospective" // 회고, 네트워킹등 행상 참여 후기
  | "frontend" // 프론트엔드 관련 공부, 소식 전달
  | "cs" // cs 관련 공부, 소식 전달
  | "project" // 개인 프로젝트, 팀 프로젝트 등 개발 경험 공유
  | "etc";

/**
 * 블로그 포스트 메타데이터 (frontmatter)
 */
export interface ArticleMeta {
  title: string;
  description: string; // 포스트 요약 (20자 이하)
  date: string;
  category: ArticleCategory;
  thumbnail: string;
  slug: string;
  views: number;
}

/**
 * 블로그 포스트 (메타데이터 + 본문)
 */
export interface Article extends ArticleMeta {
  content: string;
}

/**
 * 블로그 리스트 아이템 (썸네일, 제목, 설명 등)
 */
export interface ArticleCardData extends Omit<Article, "content"> {
  readingTime: number;
}

/**
 * 인접한 포스트 (이전/다음)
 */
export interface AdjacentPosts {
  prev: ArticleCardData | null;
  next: ArticleCardData | null;
}

export type ArticleSort = "newest" | "oldest";
