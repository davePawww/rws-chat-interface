import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types/chat-interface.types';

type UserAvatarProps = {
  user: User;
};

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar className="size-6.5">
      <AvatarImage src={user.avatar} alt="" className="grayscale" />
      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}
