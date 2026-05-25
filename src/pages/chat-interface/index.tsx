import MessageInput from '@/pages/chat-interface/components/message-input';
import MessageList from '@/pages/chat-interface/components/message-list';
import UserDropdown from '@/pages/chat-interface/components/user-dropdown';
import { useChatInterfaceStore } from '@/store/chat-interface.store';

export default function ChatInterfacePage() {
  const editingMessage = useChatInterfaceStore((s) => s.editingMessage);

  return (
    <>
      <UserDropdown />
      <MessageList />
      <MessageInput key={editingMessage?.id ?? 'new'} />
    </>
  );
}
