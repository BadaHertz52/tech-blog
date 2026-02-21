import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/utils/mdx";

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <main>
      <h1 className="sr-only">블로그 포스트 리스트</h1>

      <section>
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
