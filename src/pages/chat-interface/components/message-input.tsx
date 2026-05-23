import { Send } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatInterfaceStore } from '@/store/chat-interface.store';

export default function MessageInput() {
  const [msgInput, setMsgInput] = useState('');
  const sendNewMessage = useChatInterfaceStore((s) => s.sendNewMessage);

  // Send button click
  const handleSendBtn = () => {
    sendNewMessage(msgInput);
    setMsgInput('');
  };

  // Send on keydown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendNewMessage(msgInput);
      setMsgInput('');
    }
  };

  return (
    <div className="mt-4 flex gap-2">
      <Textarea
        rows={1}
        placeholder="Type your message.."
        className="min-h-8 resize-none overflow-hidden py-1"
        value={msgInput}
        onChange={(e) => setMsgInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button size="icon" aria-label="Send Button" onClick={handleSendBtn}>
        <Send />
      </Button>
    </div>
  );
}
