import type { Meta, StoryObj } from "@storybook/react";

import { openToast, Toast } from ".";

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
        <button
          type="button"
          onClick={() =>
            openToast({
              variant: "success",
              title: "System Update",
              description: "New features available in dashboard.",
            })
          }
          className="w-fit rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700 hover:bg-blue-200"
        >
          With Title
        </button>
        <button
          type="button"
          onClick={() =>
            openToast({
              variant: "success",
              description: "New features available in dashboard.",
            })
          }
          className="w-fit rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700 hover:bg-blue-200"
        >
          Without Title
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Warning</h2>
        <button
          type="button"
          onClick={() =>
            openToast({
              variant: "warning",
              title: "Action Required",
              description: "Verify your email address.",
            })
          }
          className="w-fit rounded-lg bg-amber-100 px-4 py-2 text-sm text-amber-700 hover:bg-amber-200"
        >
          With Title
        </button>
        <button
          type="button"
          onClick={() =>
            openToast({
              variant: "warning",
              description: "Verify your email address.",
            })
          }
          className="w-fit rounded-lg bg-amber-100 px-4 py-2 text-sm text-amber-700 hover:bg-amber-200"
        >
          Without Title
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Error</h2>
        <button
          type="button"
          onClick={() =>
            openToast({
              variant: "error",
              title: "Action Required",
              description: "Verify your email address.",
            })
          }
          className="w-fit rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
        >
          With Title
        </button>
        <button
          type="button"
          onClick={() =>
            openToast({
              variant: "error",
              description: "Verify your email address.",
            })
          }
          className="w-fit rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
        >
          Without Title
        </button>
      </div>
    </div>
  ),
};

export const Open = {
  render: () => {
    const handleClick = () => {
      openToast({
        variant: "success",
        title: "System Update",
        description: "New features available in dashboard.",
      });
    };
    return (
      <button type="button" onClick={handleClick}>
        Open Toast
      </button>
    );
  },
};
