import type { Meta, StoryObj } from "@storybook/react";

import ButtonLink from "./index";

const meta = {
  title: "Components/ButtonLink",
  component: ButtonLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "Navigation URL",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "black", "other"],
      description: "Button style variant",
    },
    children: {
      control: "text",
      description: "Button text",
    },
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  args: {
    href: "/",
    children: "Button Link",
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <ButtonLink href="/articles" variant="primary">
        Primary
      </ButtonLink>
      <ButtonLink href="/about" variant="secondary">
        Secondary
      </ButtonLink>
      <ButtonLink href="/contact" variant="black">
        Black
      </ButtonLink>
    </div>
  ),
};
