import type { Meta, StoryObj } from "@storybook/react";

import ShareButton from "./index";

const meta = {
  title: "Components/ShareButton",
  component: ShareButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof ShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    linkIconName: "link2",
    iconClassName: "h-auto w-[16px] text-gray-600",
  },
};

export const WithExternalLinkIcon: Story = {
  args: {
    linkIconName: "external-link",
    iconClassName: "h-auto w-[16px] text-gray-600",
  },
};
