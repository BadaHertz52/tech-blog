import type { Meta, StoryObj } from "@storybook/react";

import SearchBar from "./index";

const meta = {
  title: "Components/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchBarWidth: "200px",
    searchIconWidth: "17.5px",
    value: "",
    handleChange: () => {},
    placeholder: "Search articles...",
  },
};
