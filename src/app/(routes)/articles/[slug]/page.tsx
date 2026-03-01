import Image from "next/image";

import ButtonLink from "@/components/ButtonLink";
import EmptyState from "@/components/EmptyState";
import MDXContent from "@/components/MDXContent";
import Tag from "@/components/Tag/Index";
import { CATEGORY_LABELS, CATEGORY_LABELS_COLOR } from "@/constants/article";
import { ROUTES } from "@/constants/paths";
import { resolveArticleImagePath } from "@/utils/article";
import { getAllArticles, getArticleBySlug, parseHeadings } from "@/utils/mdx";
import ArticleMeta from "./_components/ArticleMeta";
import ArticleNavigation from "./_components/ArticleNavigation";
import TableOfContents from "./_components/TableOfContents";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <article>
        <EmptyState>
          <EmptyState.Icon />
          <EmptyState.Content>
            <p>요청하신 글을 찾을 수 없어요.</p>
          </EmptyState.Content>
          <EmptyState.Actions>
            <ButtonLink href={ROUTES.articles} variant="primary">
              목록 페이지로 이동
            </ButtonLink>
          </EmptyState.Actions>
        </EmptyState>
      </article>
    );
  }

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
        <ArticleNavigation />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}
