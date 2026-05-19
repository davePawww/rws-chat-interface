import UserDropdown from '@/pages/chat-interface/components/user-dropdown';

export default function ChatInterfacePage() {
  return (
    <>
      <UserDropdown />
      <div className="flex h-full flex-col-reverse justify-start">
        <p className="self-end">Message 1</p>
        <p>Message 2</p>
        <p className="self-end">Message 3</p>
      </div>
      <div className="mt-auto">Message Input</div>
    </>
  );
}
