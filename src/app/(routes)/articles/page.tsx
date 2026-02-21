import { parseArticleSort } from "@/utils/article";
import {
  filterArticlesBySearch,
  getAllArticles,
  sortArticles,
} from "@/utils/mdx";
import ArticlesContent from "./_components/ArticlesContent";
import ArticlesControls from "./_components/ArticlesControls";

interface ArticlesPageProps {
  searchParams: Promise<{ search?: string; sort?: string }>;
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params = await searchParams;
  const currentSearch = params.search || "";
  const currentSort = parseArticleSort(params.sort);

  const allArticles = await getAllArticles();
  const filteredArticles = filterArticlesBySearch(allArticles, currentSearch);
  const sortedArticles = sortArticles(filteredArticles, currentSort);

  return (
    <>
      <h1 className="sr-only">블로그 아티클 리스트</h1>

      <ArticlesControls
        currentSearch={currentSearch}
        currentSort={currentSort}
      />
      <ArticlesContent articleCards={sortedArticles} />
    </>
  );
}
