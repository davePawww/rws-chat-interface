import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function MessageInput() {
  return (
    <div className="mt-4 flex gap-2">
      <Textarea
        rows={1}
        placeholder="Type your message.."
        className="min-h-8 resize-none overflow-hidden py-1"
      />
      <Button size="icon" aria-label="Send Button">
        <Send />
      </Button>
    </div>
  );
}
