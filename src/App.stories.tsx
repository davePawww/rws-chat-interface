import type { Meta, StoryObj } from '@storybook/react-vite';

import App from '@/App';
import { useChatInterfaceStore } from '@/store/chat-interface.store';
import type { TMessage } from '@/types/chat-interface.types';
import { formatMessageTime } from '@/utils/format-message-time';
import { users } from '@/utils/users';

const mockMessages: TMessage[] = [
  {
    id: crypto.randomUUID(),
    user: users[0],
    message: 'Hello there, Storybook!',
    time: formatMessageTime(new Date()),
    replyTo: null,
    reactions: { [users[1].name]: '❤️' },
  },
  {
    id: crypto.randomUUID(),
    user: users[1],
    message: 'Hi there, Chad!',
    time: formatMessageTime(new Date()),
    replyTo: null,
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

// WithReplies
