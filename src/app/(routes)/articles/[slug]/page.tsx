import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
import ArticleStatsWrapper from "./_components/ArticleStatsWrapper";
import ArticleThumbnail from "./_components/ArticleThumbnail";
import TableOfContents from "./_components/TableOfContents";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const articles = getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isValidArticleSlug(slug)) {
    return {};
  }

  const article = getArticleBySlug(slug);
  const imageUrl = `${process.env.NEXT_PUBLIC_BLOG_URL}${resolveArticleImagePath(
    slug,
    article.thumbnail
  )}`;

  return {
    title: article.title,
    description: article.description,
    keywords: [article.category],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_BLOG_URL}/articles/${slug}`,
      publishedTime: article.date,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  if (!isValidArticleSlug(slug)) {
    notFound();
  }

  const article = getArticleBySlug(slug);
  const { prev, next } = getAdjacentArticles(slug);
  const thumbnailUrl = resolveArticleImagePath(slug, article.thumbnail);

  const headings = parseHeadings(article.content);

  return (
    <>
      <ArticleStatsWrapper slug={slug} />
      <TableOfContents.Loaded headings={headings} slug={slug} />
      <div className="flex w-full flex-col gap-14 md:flex-1">
        <ArticleThumbnail.Loaded src={thumbnailUrl} alt={article.title} />
        <ArticleHeader.Loaded
          category={article.category}
          title={article.title}
          date={article.date}
          slug={slug}
        />
        <MDXContent source={article.content} headings={headings} />
        <ArticleNavigation prev={prev} next={next} />
      </div>
    </>
  );
}
