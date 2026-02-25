import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants/paths";
import { ArticleCardData } from "@/types/article";
import { resolveArticleImagePath } from "@/utils/article";

interface ArticleNavigationProps {
  prev: ArticleCardData | null;
  next: ArticleCardData | null;
}

export default function ArticleNavigation({
  prev,
  next,
}: ArticleNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className="mt-16 grid gap-4 md:grid-cols-2">
      {/* 이전 글 */}
      {prev ? (
        <Link href={ROUTES.article(prev.slug)}>
          <div className="group flex flex-col gap-3 rounded-lg border border-gray-200 p-4 transition-colors duration-200 hover:border-primary-blue hover:bg-blue-50">
            <div className="text-sm font-medium text-gray-500">← 이전 글</div>
            <div className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={resolveArticleImagePath(prev.slug, prev.thumbnail)}
                  alt={prev.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex flex-col justify-center gap-1 overflow-hidden">
                <h3 className="truncate text-sm font-semibold text-text-primary group-hover:text-primary-blue">
                  {prev.title}
                </h3>
                <p className="line-clamp-2 text-xs text-gray-500">
                  {prev.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {/* 다음 글 */}
      {next ? (
        <Link href={ROUTES.article(next.slug)}>
          <div className="group flex flex-col gap-3 rounded-lg border border-gray-200 p-4 transition-colors duration-200 hover:border-primary-blue hover:bg-blue-50">
            <div className="text-right text-sm font-medium text-gray-500">
              다음 글 →
            </div>
            <div className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={resolveArticleImagePath(next.slug, next.thumbnail)}
                  alt={next.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex flex-col justify-center gap-1 overflow-hidden">
                <h3 className="truncate text-sm font-semibold text-text-primary group-hover:text-primary-blue">
                  {next.title}
                </h3>
                <p className="line-clamp-2 text-xs text-gray-500">
                  {next.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
