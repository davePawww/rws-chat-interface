import type { Meta, StoryObj } from '@storybook/react-vite';

import App from '@/App';
import { useChatInterfaceStore } from '@/store/chat-interface.store';
import type { TMessage } from '@/types/chat-interface.types';
import { formatMessageTime } from '@/utils/format-message-time';
import { users } from '@/utils/users';

const mockMessages: TMessage[] = [
  {
    id: '8f4c3b1e-9d7a-4c52-8f6d-2a1b7e93c4f1',
    user: users[0],
    message: 'Hello there, Storybook!',
    time: formatMessageTime(new Date()),
    replyTo: null,
    reactions: { [users[1].name]: '❤️' },
  },
  {
    id: 'd2a9f6c8-5b41-47ee-a3d0-91f84c7b2e65',
    user: users[1],
    message: 'Hi there, Chad! What are you up to these days?',
    time: formatMessageTime(new Date()),
    replyTo: {
      id: '8f4c3b1e-9d7a-4c52-8f6d-2a1b7e93c4f1',
      user: users[0],
      message: 'Hello there, Storybook!',
      time: formatMessageTime(new Date()),
      replyTo: null,
      reactions: { [users[1].name]: '❤️' },
    },
    reactions: { [users[1].name]: '❤️', [users[0].name]: '🎉', Dave: '🎉', Luke: '🔥', Tom: '😂' },
  },
];

const meta = {
  title: 'Main Content/Layout',
  component: App,
  args: {
    children: 'Main Content',
  },
  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithMessages: Story = {
  decorators: [
    (Story) => {
      useChatInterfaceStore.setState({
        user: users[0],
        messages: mockMessages,
      });

      return <Story />;
    },
  ],
};
export const Replying: Story = {
  decorators: [
    (Story) => {
      useChatInterfaceStore.setState({
        user: users[0],
        messages: mockMessages,
        replyingTo: {
          id: 'd2a9f6c8-5b41-47ee-a3d0-91f84c7b2e65',
          user: users[1],
          message: 'Hi there, Chad! What are you up to these days?',
          time: formatMessageTime(new Date()),
          replyTo: {
            id: '8f4c3b1e-9d7a-4c52-8f6d-2a1b7e93c4f1',
            user: users[0],
            message: 'Hello there, Storybook!',
            time: formatMessageTime(new Date()),
            replyTo: null,
            reactions: { [users[1].name]: '❤️' },
          },
          reactions: {
            [users[1].name]: '❤️',
            [users[0].name]: '🎉',
            Dave: '🎉',
            Luke: '🔥',
            Tom: '😂',
          },
        },
      });

      return <Story />;
    },
  ],
};
