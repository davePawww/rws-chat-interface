import { EllipsisVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChatInterfaceStore } from '@/store/chat-interface.store';
import type { TMessage } from '@/types/chat-interface.types';

type MessageThreeDotsProps = {
  message: TMessage;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MessageThreeDots({ message, open, setOpen }: MessageThreeDotsProps) {
  const setReplyingTo = useChatInterfaceStore((s) => s.setReplyingTo);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-transparent dark:hover:bg-transparent"
          aria-label="Message options"
        >
          <EllipsisVertical
            size={18}
            className="text-muted-foreground"
            onClick={() => console.log('clicked')}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setReplyingTo(message)}>Reply</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
