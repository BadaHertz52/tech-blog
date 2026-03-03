import ArticleHeader from "./_components/ArticleHeader";
import ArticleThumbnail from "./_components/ArticleThumbnail";
import TableOfContents from "./_components/TableOfContents";

export default function ArticleDetailLoading() {
  return (
    <>
      <TableOfContents.Loading />
      <div className="flex flex-1 flex-col gap-14">
        <ArticleThumbnail.Loading />
        <ArticleHeader.Loading />
      </div>
    </>
  );
}
