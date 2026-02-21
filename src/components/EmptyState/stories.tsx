import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/components/Button";
import EmptyState from "./index";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<Meta>;

export const NoSearchResults: Story = {
  render: () => (
    <div className="h-96 w-full">
      <EmptyState>
        <EmptyState.Icon name="bada" />
        <EmptyState.Content>
          <p>검색 결과가 없어요.</p>
          <p>다른 키워드로 시도하거나 전체 글을 둘러보세요</p>
        </EmptyState.Content>
        <EmptyState.Actions>
          <Button variant="primary">
            <a href="/articles">전체 글 보러가기</a>
          </Button>
        </EmptyState.Actions>
      </EmptyState>
    </div>
  ),
};
