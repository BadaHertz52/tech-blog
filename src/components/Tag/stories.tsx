import type { Meta } from "@storybook/react";

import { CATEGORY_LABELS, CATEGORY_LABELS_COLOR } from "@/constants/article";
import { ArticleCategory } from "@/types/article";
import Tag from "./index";

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tag>;

export default meta;

// 모든 카테고리 태그 표시
export const AllCategories = {
  render: () => (
    <div className="flex flex-col flex-wrap gap-4">
      {(Object.keys(CATEGORY_LABELS_COLOR) as ArticleCategory[]).map(
        (category) => (
          <Tag
            key={category}
            bgClassName={CATEGORY_LABELS_COLOR[category].bg}
            textClassName={CATEGORY_LABELS_COLOR[category].text}
          >
            {CATEGORY_LABELS[category]}
          </Tag>
        )
      )}
    </div>
  ),
};
