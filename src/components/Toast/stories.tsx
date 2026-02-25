import type { Meta, StoryObj } from "@storybook/react";

import Toast from "./index";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-4">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Success</h2>
        <Toast
          variant="success"
          title="System Update"
          description="New features available in dashboard."
        />
        <Toast
          variant="success"
          description="New features available in dashboard."
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Warning</h2>
        <Toast
          variant="warning"
          title="Action Required"
          description="Verify your email address."
        />
        <Toast variant="warning" description="Verify your email address." />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Error</h2>
        <Toast
          variant="error"
          title="Action Required"
          description="Verify your email address."
        />
        <Toast variant="error" description="Verify your email address." />
      </div>
    </div>
  ),
};
