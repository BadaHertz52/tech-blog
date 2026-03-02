import Skeleton from "@/components/Skeleton";
import Tag from "@/components/Tag/Index";
import { CATEGORY_LABELS, CATEGORY_LABELS_COLOR } from "@/constants/article";
import { ArticleCategory } from "@/types/article";
import ArticleMeta from "./_components/ArticleMeta";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <header>
      <div className="flex flex-col gap-6">{children}</div>
    </header>
  );
}

function Loading() {
  return (
    <Wrapper>
      <Skeleton
        widthTwClass="w-16"
        heightTwClass="h-6"
        roundedTwClass="rounded-full"
      />
      <div className="flex flex-col gap-3">
        <Skeleton
          widthTwClass="w-[250px]"
          heightTwClass="h-6"
          roundedTwClass="rounded-md"
        />
        <Skeleton
          widthTwClass="w-[200px]"
          heightTwClass="h-6"
          roundedTwClass="rounded-md"
        />
      </div>
    </Wrapper>
  );
}

interface LoadedProps {
  category: ArticleCategory;
  title: string;
  date: string;
}

function Loaded({ category, title, date }: LoadedProps) {
  return (
    <Wrapper>
      <ul>
        <li>
          <Tag
            bgClassName={CATEGORY_LABELS_COLOR[category].bg}
            textClassName={CATEGORY_LABELS_COLOR[category].text}
          >
            {CATEGORY_LABELS[category]}
          </Tag>
        </li>
      </ul>
      <h1>{title}</h1>
      <div className="flex gap-[22px]">
        <ArticleMeta variant="date" value={date} />
      </div>
    </Wrapper>
  );
}

const ArticleHeader = { Loading, Loaded };

export default ArticleHeader;
