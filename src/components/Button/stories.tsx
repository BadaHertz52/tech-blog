import type { Meta, StoryObj } from "@storybook/react";

import Button from "./index";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <h3 className="text-sm font-semibold">Primary</h3>
        <div className="flex gap-md">
          <Button variant="primary">LOGIN</Button>
          <Button variant="primary" disabled>
            LOGIN (Disabled)
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-md">
        <h3 className="text-sm font-semibold">Secondary</h3>
        <div className="flex gap-md">
          <Button variant="secondary">CANCEL</Button>
          <Button variant="secondary" disabled>
            CANCEL (Disabled)
          </Button>
        </div>
      </div>
    </div>
  ),
};
