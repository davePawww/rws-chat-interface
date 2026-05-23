import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import SelectReaction from '@/pages/chat-interface/components/select-reaction';
import UserAvatar from '@/pages/chat-interface/components/user-avatar';
import type { TMessage } from '@/types/chat-interface.types';

type MessageProps = {
  msg: TMessage;
};

export default function Message({ msg }: MessageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const reactionCount = msg.reactions ? Object.keys(msg.reactions).length : 0;

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
          {msg.reactions && (
            <span
              className={cn(
                'bg-secondary absolute right-2 -bottom-2.5 flex items-end gap-0.5 rounded-full border px-1.5',
                reactionCount <= 1 && 'py-0.5',
              )}
            >
              {[...new Set(Object.values(msg.reactions))].slice(0, 3).map((emoji) => (
                <p key={emoji} className="text-[9px]">
                  {emoji}
                </p>
              ))}
              {reactionCount > 1 && (
                <p className="text-muted-foreground pl-1 text-xs">{reactionCount}</p>
              )}
            </span>
          )}
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
