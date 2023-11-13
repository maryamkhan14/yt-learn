import type { Meta, StoryObj } from "@storybook/react";

import CircularIconOnlyButton from "../CircularIconOnlyButton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Button/CircularIconOnlyButton",
  component: CircularIconOnlyButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof CircularIconOnlyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ButtonWithSrCaption: Story = {
  args: {
    icon: "ri-check-fill",
    srCaption: "ssd",
    buttonStyles: "h-16 w-16 text-5xl text-yellow-300 ",
  },
};
