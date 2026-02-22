import { useState } from "react";
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
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <SearchBar
        {...args}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    );
  },
  args: {
    searchBarClassName: "w-[80vw] sm:w-[314px]",
    searchIconWidth: "17.5px",
    placeholder: "Search articles...",
    onSearchClick: () => alert("Search button clicked!"),
  },
};
