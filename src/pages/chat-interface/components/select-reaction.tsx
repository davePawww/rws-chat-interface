import { SmilePlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useChatInterfaceStore } from '@/store/chat-interface.store';
import type { Emoji } from '@/types/chat-interface.types';

const EMOJI_LIST: Emoji[] = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🔥', '🎉'];

type SelectReactionProps = {
  messageId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SelectReaction({ messageId, open, setOpen }: SelectReactionProps) {
  const user = useChatInterfaceStore((s) => s.user);
  const toggleUserReaction = useChatInterfaceStore((s) => s.toggleUserReaction);

  const handleReaction = (emoji: Emoji) => {
    toggleUserReaction(messageId, { [user!.name]: emoji });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="border-muted-foreground/20 text-muted-foreground size-5 rounded-full border"
          variant="secondary"
          aria-label="Select reaction"
        >
          <SmilePlus />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-row">
        {EMOJI_LIST.map((emoji, idx) => (
          <Button
            key={idx}
            variant="ghost"
            size="icon-xs"
            className="cursor-pointer"
            onClick={() => handleReaction(emoji)}
          >
            {emoji}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
