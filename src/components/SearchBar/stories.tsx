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
    searchBarClassName: "w-80vw sm:w-[314px]",
    searchIconWidth: "17.5px",
    value: "",
    placeholder: "Search articles...",
    onSearchClick: () => alert("Search button clicked!"),
  },
};
