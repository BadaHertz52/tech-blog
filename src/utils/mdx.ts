import fs from "fs";
import path from "path";
import matter from "gray-matter";

import {
  AdjacentPosts,
  Article,
  ArticleCardData,
  ArticleMeta,
  ArticleSort,
  TocHeading,
} from "@/types/article";

const ARTICLE_DATA_DIRECTORY = path.join(process.cwd(), "public/articles");

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
 * 이전/다음 포스트 반환 (상세 페이지 네비게이션용)
 *
 * article-index.json의 indexMap을 통해 O(1)로 현재 slug 위치를 찾고,
 * slugs 배열로 인접 slug를 바로 접근합니다.
 */
export const getAdjacentArticles = (slug: string): AdjacentPosts => {
  const indexFilePath = path.join(ARTICLE_DATA_DIRECTORY, "article-index.json");

  if (!fs.existsSync(indexFilePath)) {
    throw new Error(
      "article-index.json not found. Run `node scripts/generate-article-index.js` first."
    );
  }

  const { slugs, indexMap } = JSON.parse(
    fs.readFileSync(indexFilePath, "utf-8")
  ) as { slugs: string[]; indexMap: Record<string, number> };

  const currentIndex = indexMap[slug];

  if (currentIndex === undefined) {
    throw new Error(`Article not found: ${slug}`);
  }

  const prevSlug =
    currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : undefined;
  const nextSlug = currentIndex > 0 ? slugs[currentIndex - 1] : undefined;

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

    // 텍스트를 slug화해서 id 생성 (예: "제목1" → "제목1")
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-가-힣]/g, "");

    headings.push({ id, text, level });
  }

  return headings;
};
