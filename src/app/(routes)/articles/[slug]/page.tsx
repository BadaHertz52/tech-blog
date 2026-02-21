import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

import { getAllArticles, getArticleBySlug } from "@/utils/mdx";
import { resolveArticleImagePath } from "@/utils/article";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <article>
        <p>Article not found</p>
      </article>
    );
  }

  const thumbnailUrl = article.thumbnail
    ? resolveArticleImagePath(slug, article.thumbnail)
    : null;

  return (
    <article className="h-full w-full">
      <header>
        {/* 썸네일 */}
        {thumbnailUrl && (
          <figure>
            <Image
              src={thumbnailUrl}
              alt={article.title}
              width={1200}
              height={600}
              priority
            />
          </figure>
        )}

        {/* 제목 */}
        <h1>{article.title}</h1>

        {/* 메타 정보 */}
        <div>
          <span>{article.date}</span>
          <span>{article.category}</span>
          <span>{article.views} views</span>
        </div>
      </header>

      {/* 본문 - MDX 렌더링 */}
      <section>
        <MDXRemote source={article.content} />
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  const articles = getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}
