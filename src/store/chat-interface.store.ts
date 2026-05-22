import { create } from 'zustand';

import type { ChatInterfaceStore, TMessage } from '@/types/chat-interface.types';
import { formatMessageTime } from '@/utils/format-message-time';
import { users } from '@/utils/users';

const mockMessage: TMessage[] = [
  {
    id: 1,
    user: users[0],
    message: 'Hello there',
    time: formatMessageTime(new Date()),
    replyTo: null,
    reactions: { 'Evil Rabbit': '👍', 'Chad CN': '👍', Dave: '❤️', John: '🎉' },
  },
  {
    id: 2,
    user: users[1],
    message: 'Hi, how you doin? I have been trying to reach out to you for the last year',
    time: formatMessageTime(new Date()),
    replyTo: 1,
    reactions: { 'Evil Rabbit': '👍' },
  },
  {
    id: 3,
    user: users[0],
    message: "s'all good man",
    time: formatMessageTime(new Date()),
    replyTo: 2,
    reactions: null,
  },
];

export const useChatInterfaceStore = create<ChatInterfaceStore>((set) => ({
  messages: mockMessage,
  user: null,
  setUser: (selectedUser) => set({ user: selectedUser }),
  toggleUserReaction: (msgId, newReaction) =>
    set((s) => ({
      messages: s.messages.map((msg) => {
        if (msgId !== msg.id) return msg;

        const [username, emoji] = Object.entries(newReaction)[0];
        const currentReactions = msg.reactions ?? {};

        if (currentReactions[username] === emoji) {
          const { [username]: _, ...remaining } = currentReactions;
          return {
            ...msg,
            reactions: Object.keys(remaining).length > 0 ? remaining : null,
          };
        }

        return {
          ...msg,
          reactions: { ...currentReactions, ...newReaction },
        };
      }),
    })),
}));
