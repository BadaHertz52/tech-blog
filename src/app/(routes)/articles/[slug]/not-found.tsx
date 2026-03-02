import ButtonLink from "@/components/ButtonLink";
import EmptyState from "@/components/EmptyState";
import { ROUTES } from "@/constants/paths";

export default function ArticleNotFound() {
  return (
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
  );
}
