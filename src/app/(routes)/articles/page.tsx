import Link from "next/link";

import { getAllArticles } from "@/utils/mdx";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main>
      <h1>블로그 포스트</h1>

      <section>
        <ul>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/articles/${article.slug}`}>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <small>{article.date}</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
