import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import UserAvatar from '@/pages/chat-interface/components/user-avatar';
import { useChatInterfaceStore } from '@/store/chat-interface.store';
import { users } from '@/utils/users';

export default function UserDropdown() {
  const user = useChatInterfaceStore((s) => s.user);
  const setUser = useChatInterfaceStore((s) => s.setUser);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-36" size="lg" variant="outline">
          {user ? (
            <>
              <UserAvatar user={user} />
              {user.name}
            </>
          ) : (
            <>
              Select User <ChevronDown />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          {users.map((user) => (
            <DropdownMenuItem key={user.name} onSelect={() => setUser(user)}>
              <Item size="xs" className="w-full p-2">
                <ItemMedia>
                  <UserAvatar user={user} />
                </ItemMedia>
                <ItemContent className="gap-0">
                  <ItemTitle>{user.name}</ItemTitle>
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
