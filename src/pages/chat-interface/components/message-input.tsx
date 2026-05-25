import { Send, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useChatInterfaceStore } from '@/store/chat-interface.store';

export default function MessageInput() {
  const editingMessage = useChatInterfaceStore((s) => s.editingMessage);
  const [msgInput, setMsgInput] = useState(editingMessage?.message ?? '');
  const sendNewMessage = useChatInterfaceStore((s) => s.sendNewMessage);
  const replyingTo = useChatInterfaceStore((s) => s.replyingTo);
  const setReplyingTo = useChatInterfaceStore((s) => s.setReplyingTo);
  const setEditingMessage = useChatInterfaceStore((s) => s.setEditingMessage);
  const editMessage = useChatInterfaceStore((s) => s.editMessage);

  // Send button click
  const handleSendBtn = () => {
    if (editingMessage) {
      editMessage(editingMessage.id, msgInput);
      setEditingMessage(null);
    } else {
      sendNewMessage(msgInput, replyingTo);
    }
    setMsgInput('');
    setReplyingTo(null);
  };

  // Send on keydown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (editingMessage) {
        editMessage(editingMessage.id, msgInput);
        setEditingMessage(null);
      } else {
        sendNewMessage(msgInput, replyingTo);
      }
      setMsgInput('');
      setReplyingTo(null);
    }
  };

  return (
    <div className={cn('flex gap-2', replyingTo ? 'mt-10' : 'mt-4')}>
      <div className="bg-background relative w-full">
        <Textarea
          rows={1}
          placeholder="Type your message.."
          className="min-h-8 resize-none overflow-hidden py-1"
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {replyingTo && (
          <div className="absolute -top-7 left-1 flex items-center gap-1">
            <span className="bg-muted text-muted-foreground -z-50 line-clamp-1 rounded-t-xl p-2 text-xs">
              {replyingTo.message}
            </span>
            <X
              size={13}
              className="text-muted-foreground z-10 cursor-pointer"
              onClick={() => setReplyingTo(null)}
              aria-label="Close Reply"
            />
          </div>
        )}
      </div>
      <Button size="icon" aria-label="Send Button" onClick={handleSendBtn}>
        <Send />
      </Button>
    </div>
  );
}
