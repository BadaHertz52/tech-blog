import { notFound } from "next/navigation";

import MDXContent from "@/components/MDXContent";
import { resolveArticleImagePath } from "@/utils/article";
import {
  getAdjacentArticles,
  getAllArticles,
  getArticleBySlug,
  isValidArticleSlug,
  parseHeadings,
} from "@/utils/mdx";
import ArticleHeader from "./_components/ArticleHeader";
import ArticleNavigation from "./_components/ArticleNavigation";
import ArticleThumbnail from "./_components/ArticleThumbnail";
import TableOfContents from "./_components/TableOfContents";
import { useArticleStatsTracker } from "./_hooks/useArticleStatsTracker";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  if (!isValidArticleSlug(slug)) {
    notFound();
  }

  useArticleStatsTracker(slug);

  const article = getArticleBySlug(slug);
  const { prev, next } = getAdjacentArticles(slug);
  const thumbnailUrl = resolveArticleImagePath(slug, article.thumbnail);

  const headings = parseHeadings(article.content);

  return (
    <>
      <TableOfContents.Loaded headings={headings} slug={slug} />
      <div className="flex w-full flex-col gap-14 md:flex-1">
        <ArticleThumbnail.Loaded src={thumbnailUrl} alt={article.title} />
        <ArticleHeader.Loaded
          category={article.category}
          title={article.title}
          date={article.date}
        />
        <MDXContent source={article.content} headings={headings} />
        <ArticleNavigation prev={prev} next={next} />
      </div>
    </>
  );
}

export function generateStaticParams() {
  const articles = getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}
