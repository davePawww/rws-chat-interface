export type ChatInterfaceStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export type User = {
  name: string;
  avatar: string;
};
