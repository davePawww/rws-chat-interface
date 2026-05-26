import { beforeEach, describe, expect, it } from 'vitest';

import { useChatInterfaceStore } from '@/store/chat-interface.store';
import type { TMessage, User } from '@/types/chat-interface.types';
import { formatMessageTime } from '@/utils/format-message-time';

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
    useChatInterfaceStore.getState().setUser(mockUser);
    expect(useChatInterfaceStore.getState().user?.name).toBe('Majin Bu');
  });

  it('updates the messages state when sendNewMessage is called', () => {
    useChatInterfaceStore.getState().setUser(mockUser);
    useChatInterfaceStore.getState().sendNewMessage(mockMessage.message);

    expect(useChatInterfaceStore.getState().messages[0].message).toBe('Hello, World!');
  });

  it('adds or updates the reaction from a user', () => {
    useChatInterfaceStore.setState({ messages: [mockMessage] });
    useChatInterfaceStore.getState().toggleUserReaction(mockMessage.id, { Dave: '❤️' });

    const [user, emoji] =
      Object.entries(useChatInterfaceStore.getState().messages[0].reactions ?? {})[0] ?? [];

    expect(user).toBe('Dave');
    expect(emoji).toBe('❤️');

    useChatInterfaceStore.getState().toggleUserReaction(mockMessage.id, { Dave: '🎉' });

    const [updatedUser, updatedEmoji] =
      Object.entries(useChatInterfaceStore.getState().messages[0].reactions ?? {})[0] ?? [];

    expect(updatedUser).toBe('Dave');
    expect(updatedEmoji).toBe('🎉');
  });

  it('removes the reaction if it is the same reaction from the same user', () => {
    useChatInterfaceStore.setState({ messages: [{ ...mockMessage, reactions: { Dave: '🎉' } }] });

    const [[user, emoji]] = Object.entries(
      useChatInterfaceStore.getState().messages[0].reactions ?? {},
    );

    expect(user).toBe('Dave');
    expect(emoji).toBe('🎉');

    useChatInterfaceStore.getState().toggleUserReaction(mockMessage.id, { Dave: '🎉' });

    const reactions = useChatInterfaceStore.getState().messages[0].reactions;

    expect(reactions).toBeNull();
  });

  // TODO: edit, delete
  it('sets replyTo in a message when replyingTo has value', () => {
    useChatInterfaceStore.setState({ messages: [mockMessage] });

    useChatInterfaceStore.getState().setReplyingTo(mockMessage);
    useChatInterfaceStore.getState().setUser(mockUser);
    useChatInterfaceStore
      .getState()
      .sendNewMessage('This is a reply', useChatInterfaceStore.getState().replyingTo);

    expect(useChatInterfaceStore.getState().messages[0].message).toBe('This is a reply');
    expect(useChatInterfaceStore.getState().messages[0].replyTo).toBe(mockMessage);
  });

  it('mutates the existing message when editMessage is called', () => {
    useChatInterfaceStore.setState({ messages: [mockMessage] });
    useChatInterfaceStore
      .getState()
      .setEditingMessage(useChatInterfaceStore.getState().messages[0]);
    useChatInterfaceStore.getState().editMessage(mockMessage.id, 'This is an edited message');

    expect(useChatInterfaceStore.getState().messages[0].message).toBe('This is an edited message');
    expect(useChatInterfaceStore.getState().messages).toHaveLength(1);
  });

  it('deletes an existing message with the same id, when deleteMessage is called', () => {
    useChatInterfaceStore.setState({ messages: [mockMessage] });
    useChatInterfaceStore.getState().deleteMessage(mockMessage.id);

    expect(useChatInterfaceStore.getState().messages).toHaveLength(0);
  });
});
