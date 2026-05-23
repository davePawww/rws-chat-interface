import { Badge } from '@/components/ui/badge';
import type { Reaction } from '@/types/chat-interface.types';

type MessageReactionsProps = {
  reactions: Reaction;
};

export default function MessageReactions({ reactions }: MessageReactionsProps) {
  const reactionCount = Object.keys(reactions).length;

  return (
    <Badge variant="outline" className="bg-background absolute right-2 -bottom-2.5">
      {[...new Set(Object.values(reactions))].slice(0, 3).map((emoji) => (
        <span key={emoji} className="text-[9px]">
          {emoji}
        </span>
      ))}
      {reactionCount > 1 && (
        <span className="text-muted-foreground text-xs font-medium">+{reactionCount}</span>
      )}
    </Badge>
  );
}
