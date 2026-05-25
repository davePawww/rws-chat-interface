import type { UUID } from 'crypto';

export type ChatInterfaceStore = {
  messages: TMessage[];
  sendNewMessage: (message: string, replyTo?: TMessage | null) => void;
  user: User | null;
  setUser: (user: User) => void;
  toggleUserReaction: (msgId: string, newReaction: Reaction) => void;
  replyingTo: TMessage | null;
  setReplyingTo: (message: TMessage | null) => void;
};

export type User = {
  name: string;
  avatar: string;
};

export type Emoji = '👍' | '❤️' | '😂' | '😮' | '😢' | '🙏' | '🔥' | '🎉';
export type Reaction = Partial<Record<User['name'], Emoji>>;

export type TMessage = {
  id: UUID;
  user: User;
  message: string;
  time: string;
  replyTo: TMessage | null; // reply to a message
  reactions: Reaction | null;
};
