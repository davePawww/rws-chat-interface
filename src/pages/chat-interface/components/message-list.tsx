import Message from '@/pages/chat-interface/components/message';
import { useChatInterfaceStore } from '@/store/chat-interface.store';

export default function MessageList() {
  const messages = useChatInterfaceStore((s) => s.messages);

  return (
    <div className="flex h-full flex-col-reverse justify-start gap-4">
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} />
      ))}
    </div>
  );
}
