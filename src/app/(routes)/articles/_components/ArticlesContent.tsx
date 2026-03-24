import { ReactNode } from "react";

import ArticleCard from "@/components/ArticleCard";
import ButtonLink from "@/components/ButtonLink";
import EmptyState from "@/components/EmptyState";
import { ROUTES } from "@/constants/paths";
import { ArticleCardData } from "@/types/article";

function Wrapper({ children }: { children: ReactNode }) {
  return <section className="relative h-full w-full">{children}</section>;
}

function Grid({ children }: { children: ReactNode }) {
  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{children}</ul>
  );
}

function Loading() {
  return (
    <Wrapper>
      <Grid>
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i}>
            <ArticleCard.Loading />
          </li>
        ))}
      </Grid>
    </Wrapper>
  );
}

interface LoadedProps {
  articleCards: ArticleCardData[];
}

function Loaded({ articleCards }: LoadedProps) {
  return (
    <Wrapper>
      {articleCards.length > 0 ? (
        <Grid>
          {articleCards.map((article) => (
            <li key={article.slug}>
              <ArticleCard.Loaded article={article} />
            </li>
          ))}
        </Grid>
      ) : (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center">
          <EmptyState>
            <EmptyState.Icon name="bada" width={48} />
            <EmptyState.Content>
              <p>검색 결과가 없어요.</p>
              <p>다른 키워드로 시도하거나 전체 글을 둘러보세요.</p>
            </EmptyState.Content>
            <EmptyState.Actions>
              <ButtonLink
                variant="primary"
                href={ROUTES.articles}
                aria-label="전체 글 보러가기"
              >
                전체 글 보러가기
              </ButtonLink>
            </EmptyState.Actions>
          </EmptyState>
        </div>
      )}
    </Wrapper>
  );
}

const ArticlesContent = { Loading, Loaded };

export default ArticlesContent;
