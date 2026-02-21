import type { Meta, StoryObj } from "@storybook/react";

import SpeechBubble from "./index";

const meta: Meta<typeof SpeechBubble> = {
  title: "Components/SpeechBubble",
  component: SpeechBubble,
  argTypes: {
    tailPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpeechBubble>;

export const AllPositions: Story = {
  name: "All Positions",
  render: () => (
    <div className="flex flex-col gap-8 bg-gray-800 p-12">
      <SpeechBubble tailPosition="top">top</SpeechBubble>
      <SpeechBubble tailPosition="bottom">bottom</SpeechBubble>
      <SpeechBubble tailPosition="left">left</SpeechBubble>
      <SpeechBubble tailPosition="right">right</SpeechBubble>
    </div>
  ),
};
