import type { Meta, StoryObj } from "@storybook/react";

import CommingSoon from "./index";

const meta = {
  title: "Components/CommingSoon",
  component: CommingSoon,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<Meta>;

export const Default: Story = {
  render: () => <CommingSoon />,
};
