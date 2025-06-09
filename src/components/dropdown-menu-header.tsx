import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropdownMenuHeaderProps {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date | null;
  };
}

export function DropdownMenuHeader({ user }: DropdownMenuHeaderProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="cursor-pointer w-[150px] flex items-center justify-center gap-3 bg-[#2a2a2a] px-4 py-2 rounded-md border border-zinc-700 focus:outline-none focus:ring-0
"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-violet-600 text-white font-bold rounded-full text-sm">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div className="text-zinc-200 text-sm">
            <span className="font-medium text-violet-400">
              @{user.username}
            </span>
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="bg-[#2a2a2a] border border-zinc-700 rounded-md p-2 shadow-lg text-sm text-zinc-200 w-[150px]">
        <DropdownMenu.Item className="hover:bg-zinc-700 cursor-pointer focus:outline-none focus:ring-0 rounded-md">
          <a
            href={`/profile/${user.username}`}
            className="block w-full px-4 py-2"
          >
            Perfil
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item className=" hover:bg-zinc-700 cursor-pointer focus:outline-none focus:ring-0 rounded-md">
          <a
            href={`/settings`}
            className="block w-full px-4 py-2"
          >
            Configurações
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="h-px bg-zinc-600 my-1" />
        <DropdownMenu.Item className="px-4 py-2 hover:bg-zinc-700 cursor-pointer text-red-500 focus:outline-none focus:ring-0 rounded-md">
          Sair
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
