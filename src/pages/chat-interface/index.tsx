import MessageInput from '@/pages/chat-interface/components/message-input';
import MessageList from '@/pages/chat-interface/components/message-list';
import UserDropdown from '@/pages/chat-interface/components/user-dropdown';
import { useChatInterfaceStore } from '@/store/chat-interface.store';

export default function ChatInterfacePage() {
  const editingMessage = useChatInterfaceStore((s) => s.editingMessage);
  const user = useChatInterfaceStore((s) => s.user);
  const userIsTyping = useChatInterfaceStore((s) => s.userIsTyping);

  return (
    <>
      <UserDropdown />
      <MessageList />
      {userIsTyping && user && (
        <p className="text-muted-foreground text-right text-xs">{user?.name} is typing ...</p>
      )}
      <MessageInput key={editingMessage?.id ?? 'new'} />
    </>
  );
}
