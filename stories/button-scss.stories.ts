import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ButtonScss } from '@/registry/scss-components/ButtonScss/button-scss';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'SCSS/Button',
  component: ButtonScss,
} satisfies Meta<typeof ButtonScss>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {}
