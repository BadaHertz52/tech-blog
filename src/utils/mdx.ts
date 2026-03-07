import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { ARTICLE_DATA_DIRECTORY } from "@/constants/paths";
import {
  AdjacentPosts,
  Article,
  ArticleCardData,
  ArticleMeta,
  ArticleSort,
  TocHeading,
} from "@/types/article";
import { generateUUID } from "./id";

/**
 * article-index.json 캐시
 * 모듈 로드 시 한 번만 파일을 읽고 이후에는 캐시된 값 사용
 */
let indexCache: { slugs: string[]; indexMap: Record<string, number> } | null =
  null;

const getIndexCache = (): {
  slugs: string[];
  indexMap: Record<string, number>;
} => {
  if (indexCache) {
    return indexCache;
  }

  const indexFilePath = path.join(ARTICLE_DATA_DIRECTORY, "article-index.json");

  if (!fs.existsSync(indexFilePath)) {
    throw new Error(
      "article-index.json not found. Run `node scripts/generate-article-index.js` first."
    );
  }

  indexCache = JSON.parse(fs.readFileSync(indexFilePath, "utf-8")) as {
    slugs: string[];
    indexMap: Record<string, number>;
  };

  return indexCache;
};

/**
 * 날짜 문자열이 YYYY-MM-DD 형식이고 유효한지 검증
 * @param dateString - 검증할 날짜 문자열
 * @returns 유효한 날짜면 true, 아니면 false
 */
const isValidDate = (dateString: unknown): dateString is string => {
  if (typeof dateString !== "string") {
    return false;
  }

  // YYYY-MM-DD 형식 검증
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }

  // Date 객체로 파싱 후 유효성 검증
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * 모든 MDX 포스트 폴더명 가져오기
 */
const getAllArticlesSlugs = (): string[] => {
  if (!fs.existsSync(ARTICLE_DATA_DIRECTORY)) {
    return [];
  }

  return fs.readdirSync(ARTICLE_DATA_DIRECTORY).filter((file) => {
    const fullPath = path.join(ARTICLE_DATA_DIRECTORY, file);
    const isDirectory = fs.statSync(fullPath).isDirectory();
    const hasMdxFile = fs.existsSync(path.join(fullPath, "index.mdx"));
    return isDirectory && hasMdxFile;
  });
};

/**
 * 단일 포스트 파일 읽기
 */
const readArticleFile = (slug: string): string => {
  const filePath = path.join(ARTICLE_DATA_DIRECTORY, slug, "index.mdx");

  if (!fs.existsSync(filePath)) {
    throw new Error(`Article not found: ${slug}`);
  }

  return fs.readFileSync(filePath, "utf-8");
};

/**
 * 전체 포스트 목록 반환 (리스트 페이지용)
 */
export const getAllArticles = (): ArticleCardData[] => {
  const slugs = getAllArticlesSlugs();

  return slugs.map((slug) => {
    const fileContent = readArticleFile(slug);
    const { data, content } = matter(fileContent);

    const meta = data as ArticleMeta;

    // 날짜 형식 검증
    if (!isValidDate(meta.date)) {
      throw new Error(
        `Invalid date format in "${slug}": "${meta.date}". Expected YYYY-MM-DD format.`
      );
    }

    return {
      ...meta,
    };
  });
};

/**
 * 단일 포스트 반환 (상세 페이지용)
 */
export const getArticleBySlug = (slug: string): Article => {
  const fileContent = readArticleFile(slug);
  const { data, content } = matter(fileContent);

  const meta = data as ArticleMeta;

  // 날짜 형식 검증
  if (!isValidDate(meta.date)) {
    throw new Error(
      `Invalid date format in "${slug}": "${meta.date}". Expected YYYY-MM-DD format.`
    );
  }

  return {
    ...meta,
    content,
  };
};

/**
 * article-index.json에서 slug 존재 여부 확인 (O(1))
 */
export const isValidArticleSlug = (slug: string): boolean => {
  try {
    const { indexMap } = getIndexCache();
    return slug in indexMap;
  } catch {
    return false;
  }
};

/**
 * 이전/다음 포스트 반환 (상세 페이지 네비게이션용)
 *
 * article-index.json의 indexMap을 통해 O(1)로 현재 slug 위치를 찾고,
 * slugs 배열로 인접 slug를 바로 접근합니다.
 */
export const getAdjacentArticles = (slug: string): AdjacentPosts => {
  const { slugs, indexMap } = getIndexCache();
  const currentIndex = indexMap[slug];

  if (currentIndex === undefined) {
    throw new Error(`Article not found: ${slug}`);
  }

  // slugs는 오래된순 정렬: index-1 = 더 오래된(이전글), index+1 = 더 최신(다음글)
  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : undefined;
  const nextSlug =
    currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : undefined;

  return {
    prev: prevSlug ? getArticleBySlug(prevSlug) : undefined,
    next: nextSlug ? getArticleBySlug(nextSlug) : undefined,
  };
};

/**
 * 검색어로 포스트 필터링 (title, description 대상)
 */
export const filterArticlesBySearch = (
  articles: ArticleCardData[],
  search: string
): ArticleCardData[] => {
  if (!search.trim()) {
    return articles;
  }

  const searchLower = search.toLowerCase();

  return articles.filter((article) => {
    const titleMatch = article.title.toLowerCase().includes(searchLower);
    const descriptionMatch = article.description
      .toLowerCase()
      .includes(searchLower);
    return titleMatch || descriptionMatch;
  });
};

/**
 * 포스트 정렬
 * @param articles - 아티클 배열
 * @param sort - 'newest' | 'oldest'
 * @returns 정렬된 아티클 배열
 */
export const sortArticles = (
  articles: ArticleCardData[],
  sort: ArticleSort
): ArticleCardData[] => {
  if (sort === "oldest") {
    return [...articles].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  // 기본값: 'newest'
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

/**
 * MDX 콘텐츠에서 헤딩(h1~h4) 추출
 * @param content - MDX 마크다운 문자열
 * @returns 목차 헤딩 배열
 */
export const parseHeadings = (content: string): TocHeading[] => {
  const headingRegex = /^#{1,4} (.+)$/gm;
  const headings: TocHeading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const fullMatch = match[0]; // "## 제목" 형태
    const text = match[1]; // "제목"
    const level = fullMatch.match(/^#+/)?.[0].length as 1 | 2 | 3 | 4;

    const id = generateUUID();

    headings.push({ id, text, level });
  }

  return headings;
};
