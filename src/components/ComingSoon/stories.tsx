import type { Meta, StoryObj } from "@storybook/react";

import ComingSoon from "./index";

const meta = {
  title: "Components/ComingSoon",
  component: ComingSoon,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<Meta>;

export const Default: Story = {
  render: () => <ComingSoon />,
};
