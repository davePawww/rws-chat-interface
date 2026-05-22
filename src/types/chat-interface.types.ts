export type ChatInterfaceStore = {
  messages: TMessage[];
  user: User | null;
  setUser: (user: User) => void;
  toggleUserReaction: (msgId: number, newReaction: Reaction) => void;
};

export type User = {
  name: string;
  avatar: string;
};

export type Emoji = '👍' | '❤️' | '😂' | '😮' | '😢' | '🙏' | '🔥' | '🎉';
export type Reaction = Partial<Record<User['name'], Emoji>>;

export type TMessage = {
  id: number;
  user: User;
  message: string;
  time: string;
  replyTo: number | null;
  reactions: Reaction | null;
};
