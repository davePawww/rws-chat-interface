import { create } from 'zustand';

import type { ChatInterfaceStore } from '@/types/chat-interface.types';

export const useChatInterfaceStore = create<ChatInterfaceStore>((set) => ({
  user: null,
  setUser: (selectedUser) => set({ user: selectedUser }),
}));
