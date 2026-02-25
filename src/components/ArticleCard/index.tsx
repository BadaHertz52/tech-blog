import Image from "next/image";
import Link from "next/link";

import { CATEGORY_LABELS } from "@/constants/article";
import { ROUTES } from "@/constants/paths";
import { ArticleCardData } from "@/types/article";
import { resolveArticleImagePath } from "@/utils/article";

interface ArticleCardProps {
  article: ArticleCardData;
  className?: string;
}

export default function ArticleCard({
  article,
  className = "",
}: ArticleCardProps) {
  const formattedDate = article.date.replace(/-/g, ".");
  const thumbnailUrl = resolveArticleImagePath(article.slug, article.thumbnail);

  return (
    <Link href={ROUTES.article(article.slug)}>
      <div
        className={`group flex cursor-pointer flex-col gap-5 overflow-hidden ${className}`}
      >
        {/* 썸네일 영역 */}
        <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden rounded-3xl">
          <Image
            src={thumbnailUrl}
            alt={article.title}
            className="rounded-3xl object-cover transition-transform duration-300 group-hover:scale-125"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* 카테고리 배지 */}
          <div className="absolute left-4 top-4 flex items-center">
            <div className="rounded-3xl bg-white/90 px-3 py-1 backdrop-blur-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                {CATEGORY_LABELS[article.category]}
              </span>
            </div>
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-2 overflow-hidden">
          {/* 날짜 */}
          <div className="truncate text-xs font-medium text-gray-500">
            {formattedDate}
          </div>

          {/* 제목 */}
          <h3 className="line-clamp-1 h-7 break-all text-xl font-extrabold text-text-primary">
            {article.title}
          </h3>

          {/* 소개글 */}
          <p className="line-clamp-2 h-9 break-all text-sm text-gray-600">
            {article.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
