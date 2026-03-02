import clsx from "clsx";
import Link from "next/link";

import { ROUTES } from "@/constants/paths";
import { ArticleCardData } from "@/types/article";

interface NavigationLinkProps {
  href: string;
  header: string;
  title: string;
  isNext?: boolean;
}

function NavigationLink({
  href,
  header,
  title,
  isNext = false,
}: NavigationLinkProps) {
  return (
    <Link href={href}>
      <div className="group flex flex-col gap-3 rounded-card bg-gray-light p-6">
        <div
          className={clsx(
            "text-sm font-medium text-gray-500 group-hover:text-primary-blue",
            isNext && "text-right"
          )}
        >
          {header}
        </div>
        <h3
          className={clsx(
            "overflow-hidden text-ellipsis text-sm font-semibold text-text-primary",
            isNext && "text-right"
          )}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}

interface ArticleNavigationProps {
  prev?: ArticleCardData;
  next?: ArticleCardData;
}

export default function ArticleNavigation({
  prev,
  next,
}: ArticleNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className="grid gap-4 md:grid-cols-2">
      {/* 이전 글 */}
      {prev ? (
        <NavigationLink
          href={ROUTES.article(prev.slug)}
          header="← 이전 글"
          title={prev.title}
        />
      ) : (
        <div />
      )}

      {/* 다음 글 */}
      {next ? (
        <NavigationLink
          href={ROUTES.article(next.slug)}
          header="다음 글 →"
          title={next.title}
          isNext
        />
      ) : (
        <div />
      )}
    </nav>
  );
}
