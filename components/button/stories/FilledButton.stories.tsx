import type { Meta, StoryObj } from "@storybook/react";

import FilledButton from "../FilledButton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Button/FilledButton",
  component: FilledButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof FilledButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ButtonWithIconAndText: Story = {
  args: {
    icon: "ri-add-fill",
    text: "I must tell you",
    buttonStyles: "bg-slate-100 text-green-600",
    fillStyles: "text-slate-100 bg-red-100",
    textStyles: "text-slate-900",
  },
};
