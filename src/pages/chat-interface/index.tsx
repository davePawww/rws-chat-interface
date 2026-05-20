import MessageList from '@/pages/chat-interface/components/message-list';
import UserDropdown from '@/pages/chat-interface/components/user-dropdown';

export default function ChatInterfacePage() {
  return (
    <>
      <UserDropdown />
      <MessageList />
      <div className="mt-auto">Message Input</div>
    </>
  );
}
