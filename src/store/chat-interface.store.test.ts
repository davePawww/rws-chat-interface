import { beforeEach, describe, expect, it } from 'vitest';

import { useChatInterfaceStore } from '@/store/chat-interface.store';
import type { TMessage, User } from '@/types/chat-interface.types';
import { formatMessageTime } from '@/utils/format-message-time';

/**
 * TODO: Test the following:
 * toggleUserReaction
 */

const mockUser: User = {
  name: 'Majin Bu',
  avatar: 'https://avatars.githubusercontent.com/u/5580297?v=4',
};

const mockMessage: TMessage = {
  id: crypto.randomUUID(),
  user: mockUser,
  message: 'Hello, World!',
  time: formatMessageTime(new Date()),
  replyTo: null,
  reactions: null,
};

describe('Chat Interface Store', () => {
  beforeEach(() => {
    useChatInterfaceStore.setState({
      user: null,
      messages: [],
    });
  });

  it('sets the correct user when setUser is called', () => {
    useChatInterfaceStore.setState({ user: mockUser });
    expect(useChatInterfaceStore.getState().user?.name).toBe('Majin Bu');
  });

  it('updates the messages state when sendNewMessage is called', () => {
    useChatInterfaceStore.setState({ messages: [mockMessage] });

    expect(useChatInterfaceStore.getState().messages[0].message).toBe('Hello, World!');
  });

  it('adds or updates the reaction from a user', () => {
    mockMessage.reactions = { Dave: '❤️' };
    useChatInterfaceStore.setState({ messages: [mockMessage] });

    const [user, emoji] =
      Object.entries(useChatInterfaceStore.getState().messages[0].reactions ?? {})[0] ?? [];

    expect(user).toBe('Dave');
    expect(emoji).toBe('❤️');

    mockMessage.reactions = { Dave: '🎉' };
    useChatInterfaceStore.setState({ messages: [mockMessage] });

    const [updatedUser, updatedEmoji] =
      Object.entries(useChatInterfaceStore.getState().messages[0].reactions ?? {})[0] ?? [];

    expect(updatedUser).toBe('Dave');
    expect(updatedEmoji).toBe('🎉');
  });

  it('removes the reaction if it is the same reaction from the same user', () => {});
});
