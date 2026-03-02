import Image from "next/image";
import { notFound } from "next/navigation";

import MDXContent from "@/components/MDXContent";
import Tag from "@/components/Tag/Index";
import { CATEGORY_LABELS, CATEGORY_LABELS_COLOR } from "@/constants/article";
import { resolveArticleImagePath } from "@/utils/article";
import {
  getAdjacentArticles,
  getAllArticles,
  getArticleBySlug,
  isValidArticleSlug,
  parseHeadings,
} from "@/utils/mdx";
import ArticleMeta from "./_components/ArticleMeta";
import ArticleNavigation from "./_components/ArticleNavigation";
import TableOfContents from "./_components/TableOfContents";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  if (!isValidArticleSlug(slug)) {
    notFound();
  }

  const article = getArticleBySlug(slug);
  const { prev, next } = getAdjacentArticles(slug);
  const thumbnailUrl = resolveArticleImagePath(slug, article.thumbnail);

  return (
    <article className="flex h-full w-full gap-8">
      <TableOfContents headings={parseHeadings(article.content)} />
      <div className="flex flex-1 flex-col gap-14">
        <figure className="background: rgba(255, 255, 255, 0.002) relative aspect-video w-full overflow-hidden rounded-card shadow-md">
          <Image src={thumbnailUrl} alt={article.title} fill priority />
        </figure>
        <header>
          <div className="flex flex-col gap-6">
            <ul>
              <li>
                <Tag
                  bgClassName={CATEGORY_LABELS_COLOR[article.category].bg}
                  textClassName={CATEGORY_LABELS_COLOR[article.category].text}
                >
                  {CATEGORY_LABELS[article.category]}
                </Tag>
              </li>
            </ul>
            <h1>{article.title}</h1>
            <div className="flex gap-[22px]">
              <ArticleMeta variant="date" value={article.date} />
            </div>
          </div>
        </header>
        <MDXContent source={article.content} />
        <ArticleNavigation prev={prev} next={next} />
      </div>
    </article>
  );
}

export function generateStaticParams() {
  const articles = getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}
