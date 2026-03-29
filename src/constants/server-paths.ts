import path from "path";

/**
 * 프로젝트 루트의 public 디렉토리 절대 경로
 * import.meta.url 기반으로 현재 파일의 위치를 기준으로 계산
 */
export const PUBLIC_DIRECTORY = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "../../public"
);

/**
 * 프로젝트 아티클 데이터 디렉토리 절대 경로
 */
export const ARTICLE_DATA_DIRECTORY = path.join(PUBLIC_DIRECTORY, "articles");
