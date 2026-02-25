import type { Meta, StoryObj } from "@storybook/react";

import LoadingUI from "./index";

const meta = {
  title: "Components/LoadingUI",
  component: LoadingUI,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LoadingUI>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 로딩 UI
 * - 반응형으로 확인 가능
 */
export const Default: Story = {
  render: () => (
    <div className="flex min-h-screen w-full items-center justify-center bg-white">
      <LoadingUI />
    </div>
  ),
};
