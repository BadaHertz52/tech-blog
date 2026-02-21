import fs from "fs";
import path from "path";
import matter from "gray-matter";

import {
  AdjacentPosts,
  Article,
  ArticleCard,
  ArticleMeta,
} from "@/types/article";

const ARTICLE_DATA_DIRECTORY = path.join(process.cwd(), "data/articles");

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
 * 모든 MDX 포스트 파일명 가져오기
 */
const getAllArticlesSlugs = (): string[] => {
  if (!fs.existsSync(ARTICLE_DATA_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(ARTICLE_DATA_DIRECTORY)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
};

/**
 * 단일 포스트 파일 읽기
 */
const readArticleFile = (slug: string): string => {
  const filePath = path.join(ARTICLE_DATA_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Article not found: ${slug}`);
  }

  return fs.readFileSync(filePath, "utf-8");
};

/**
 * 전체 포스트 목록 반환 (리스트 페이지용)
 * 최신순 정렬
 */
export const getAllArticles = (): ArticleCard[] => {
  const slugs = getAllArticlesSlugs();

  const posts = slugs.map((slug) => {
    const fileContent = readArticleFile(slug);
    const { data, content } = matter(fileContent);

    return {
      ...(data as ArticleMeta),
      readingTime: calculateReadingTime(content),
    };
  });

  // 날짜 기준 최신순 정렬
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

/**
 * 단일 포스트 반환 (상세 페이지용)
 */
export const getArticleBySlug = (slug: string): Article => {
  const fileContent = readArticleFile(slug);
  const { data, content } = matter(fileContent);

  return {
    ...(data as ArticleMeta),
    content,
  };
};

/**
 * 이전/다음 포스트 반환 (상세 페이지 네비게이션용)
 */
export const getAdjacentArticles = (slug: string): AdjacentPosts => {
  const articles = getAllArticles();
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
 * 카테고리별 포스트 필터링
 */
export const getArticlesByCategory = (category: string): ArticleCard[] => {
  return getAllArticles().filter((article) => article.category === category);
};
