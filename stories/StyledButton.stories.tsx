import type { Meta, StoryObj } from '@storybook/react';
import { StyledButton } from '../components/StyledButton';

const meta = {
  title: 'Components/StyledButton',
  component: StyledButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StyledButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
