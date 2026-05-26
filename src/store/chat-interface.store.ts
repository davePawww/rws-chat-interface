import { create } from 'zustand';

import type { ChatInterfaceStore, TMessage } from '@/types/chat-interface.types';
import { formatMessageTime } from '@/utils/format-message-time';

export const useChatInterfaceStore = create<ChatInterfaceStore>((set, get) => ({
  messages: [],
  sendNewMessage: (message, replyTo = null) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const newMessage: TMessage = {
      id: crypto.randomUUID(),
      user: currentUser,
      message,
      time: formatMessageTime(new Date()),
      replyTo,
      reactions: null,
    };

    set((s) => ({ messages: [newMessage, ...s.messages] }));
  },
  deleteMessage: (msgId) =>
    set((s) => ({ messages: s.messages.filter((msg) => msg.id !== msgId) })),
  editingMessage: null,
  setEditingMessage: (message) => set({ editingMessage: message }),
  editMessage: (msgId, message) =>
    set((s) => ({
      messages: s.messages.map((msg) => {
        if (msg.id !== msgId) return msg;
        return { ...msg, message };
      }),
    })),
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
  replyingTo: null,
  setReplyingTo: (message) => set({ replyingTo: message }),
  userIsTyping: false,
  setUserIsTyping: (isTyping) => set({ userIsTyping: isTyping }),
}));
