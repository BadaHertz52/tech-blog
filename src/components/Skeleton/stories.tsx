import type { Meta, StoryObj } from "@storybook/react";

import Skeleton from "./index";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <Skeleton
        widthTwClass="w-full"
        heightTwClass="aspect-video"
        roundedTwClass="rounded-card"
      />
    </div>
  ),
};
