import MessageInput from '@/pages/chat-interface/components/message-input';
import MessageList from '@/pages/chat-interface/components/message-list';
import UserDropdown from '@/pages/chat-interface/components/user-dropdown';

export default function ChatInterfacePage() {
  return (
    <>
      <UserDropdown />
      <MessageList />
      <MessageInput />
    </>
  );
}
