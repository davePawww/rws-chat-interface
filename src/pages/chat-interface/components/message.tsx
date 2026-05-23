import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import MessageReactions from '@/pages/chat-interface/components/message-reactions';
import SelectReaction from '@/pages/chat-interface/components/select-reaction';
import UserAvatar from '@/pages/chat-interface/components/user-avatar';
import type { TMessage } from '@/types/chat-interface.types';

type MessageProps = {
  msg: TMessage;
};

export default function Message({ msg }: MessageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <p
        className={cn(
          'text-muted-foreground ml-12 text-xs font-medium',
          msg.user.name === 'Chad CN' ? 'mr-12 text-right' : '',
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
        <div
          className={cn(
            'bg-secondary border-muted-foreground/10 relative max-w-3/5 rounded-4xl border px-3 py-2 shadow-sm',
            msg.user.name === 'Chad CN' ? 'bg-primary text-white' : '',
          )}
        >
          {msg.message}
          {msg.reactions && <MessageReactions reactions={msg.reactions} />}
        </div>
        {isHovered && (
          <div className="flex items-center">
            <SelectReaction messageId={msg.id} />
            <EllipsisVertical size={18} className="text-muted-foreground" />
            <p className="text-muted-foreground text-xs font-medium">{msg.time}</p>
          </div>
        )}
      </div>
    </div>
  );
}
