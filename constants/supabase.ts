// DB 테이블명
export const TABLES = {
  ARTICLE_STATS: 'article_stats',
  USER_ARTICLE_LIKES: 'user_article_likes',
} as const

// RPC 함수명
export const RPC_FUNCTIONS = {
  INCREMENT_VIEW_COUNT: 'increment_view_count',
  INCREMENT_SHARE_COUNT: 'increment_share_count',
  INCREMENT_LIKE_COUNT: 'increment_like_count',
  DECREMENT_LIKE_COUNT: 'decrement_like_count',
} as const