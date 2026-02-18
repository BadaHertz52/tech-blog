import type { Meta, StoryObj } from "@storybook/react";

import Icon from "./index";
import type { IconName } from "./types";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    name: {
      control: "select",
      options: [
        "search",
        "menu",
        "sun",
        "moon",
        "calendar",
        "clock",
        "chevron-right",
        "message-square",
        "home",
        "arrow-up",
        "play-circle",
        "external-link",
        "github",
        "linkedin",
        "bada",
      ] satisfies IconName[],
    },
    width: { control: "number" },
    height: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const ALL_ICONS: IconName[] = [
  "search",
  "menu",
  "sun",
  "moon",
  "calendar",
  "clock",
  "chevron-right",
  "message-square",
  "home",
  "arrow-up",
  "play-circle",
  "external-link",
  "github",
  "linkedin",
  "bada",
];

export const AllIcons: Story = {
  name: "All Icons",
  render: (args) => (
    <div className="flex flex-wrap gap-6 p-4">
      {ALL_ICONS.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon {...args} name={name} />
          <span className="text-xs text-gray-500">{name}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    width: 24,
    height: 24,
  },
};
