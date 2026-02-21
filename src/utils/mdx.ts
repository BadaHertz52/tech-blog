import fs from "fs";
import path from "path";
import matter from "gray-matter";

import {
  AdjacentPosts,
  Article,
  ArticleCardData,
  ArticleMeta,
  ArticleSort,
} from "@/types/article";

const ARTICLE_DATA_DIRECTORY = path.join(process.cwd(), "public/articles");

/**
 * 읽기 시간 계산 (분 단위)
 * 일반적으로 분당 200 단어 기준
 */
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;

  return Math.ceil(wordCount / wordsPerMinute);
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
export const getAllArticles = async (): Promise<ArticleCardData[]> => {
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
      readingTime: calculateReadingTime(content),
    };
  });
};

/**
 * 단일 포스트 반환 (상세 페이지용)
 */
export const getArticleBySlug = async (slug: string): Promise<Article> => {
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
 */
export const getAdjacentArticles = async (
  slug: string
): Promise<AdjacentPosts> => {
  const articles = await getAllArticles();
  const currentIndex = articles.findIndex((article) => article.slug === slug);

  if (currentIndex === -1) {
    throw new Error(`Article not found: ${slug}`);
  }

  return {
    prev: currentIndex > 0 ? articles[currentIndex - 1] : null,
    next:
      currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
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
