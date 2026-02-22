import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Dropdown, { type DropdownOption } from "./index";

interface DropdownStoryProps {
  options: DropdownOption[];
  placeholder?: string;
}

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const DropdownWithState = ({ options, placeholder }: DropdownStoryProps) => {
  const [selectedValue, setSelectedValue] = useState("newest");

  return (
    <div className="w-80">
      <Dropdown
        options={options}
        selectedValue={selectedValue}
        onSelect={setSelectedValue}
        placeholder={placeholder}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DropdownWithState {...args} />,
  args: {
    options: [
      { value: "newest", label: "Newest First" },
      { value: "oldest", label: "Oldest First" },
      { value: "popular", label: "Most Popular" },
    ],
    placeholder: "Select option",
  },
};
