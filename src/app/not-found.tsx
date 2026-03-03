import ButtonLink from "@/components/ButtonLink";
import EmptyState from "@/components/EmptyState";
import { ROUTES } from "@/constants/paths";

export default function NotFound() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <EmptyState>
        <EmptyState.Icon />
        <EmptyState.Content>
          <p className="text-lg">페이지를 찾을 수 없어요.</p>
        </EmptyState.Content>
        <EmptyState.Actions>
          <ButtonLink href={ROUTES.home} variant="primary">
            홈으로 이동
          </ButtonLink>
        </EmptyState.Actions>
      </EmptyState>
    </div>
  );
}
