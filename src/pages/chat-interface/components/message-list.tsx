import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import UserAvatar from '@/pages/chat-interface/components/user-avatar';
import type { User } from '@/types/chat-interface.types';
import { formatMessageTime } from '@/utils/format-message-time';
import { users } from '@/utils/users';

type Message = {
  id: number;
  user: User;
  message: string;
  time: string;
  replyTo: number | null;
  reactions: string | null;
};

const messages: Message[] = [
  {
    id: 1,
    user: users[0],
    message: 'Hello there',
    time: formatMessageTime(new Date()),
    replyTo: null,
    reactions: 'smiley',
  },
  {
    id: 2,
    user: users[1],
    message: 'Hi, how you doin? I have been trying to reach out to you for the last year',
    time: formatMessageTime(new Date()),
    replyTo: 1,
    reactions: null,
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

export default function MessageList() {
  return (
    <div className="flex h-full flex-col-reverse justify-start gap-4">
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} />
      ))}
    </div>
  );
}

type MessageProps = {
  msg: Message;
};

function Message({ msg }: MessageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <p
        className={cn(
          'text-muted-foreground ml-9 text-xs font-medium',
          msg.user.name === 'Chad CN' ? 'mr-9 text-right' : '',
        )}
      >
        {msg.user.name}
      </p>
      <div
        className={cn(
          'flex items-center gap-2',
          msg.user.name === 'Chad CN' ? 'flex-row-reverse' : '',
        )}
      >
        <UserAvatar user={msg.user} />
        <p
          className={cn(
            'bg-secondary max-w-3/5 rounded-md p-2',
            msg.user.name === 'Chad CN' ? 'bg-primary' : '',
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {msg.message}
        </p>
        <EllipsisVertical size={18} className="text-muted-foreground" />
        {isHovered ? <p className="text-muted-foreground text-xs">{msg.time}</p> : ''}
      </div>
    </div>
  );
}
