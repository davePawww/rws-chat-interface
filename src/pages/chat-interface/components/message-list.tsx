import { useCallback, useEffect, useRef } from 'react';

import Message from '@/pages/chat-interface/components/message';
import { useChatInterfaceStore } from '@/store/chat-interface.store';

export default function MessageList() {
  const messages = useChatInterfaceStore((s) => s.messages);
  const containerRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    isNearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (isNearBottomRef.current) {
      el.scrollTop = 0;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex h-full flex-col-reverse justify-start gap-4 overflow-y-auto"
    >
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} />
      ))}
    </div>
  );
}
