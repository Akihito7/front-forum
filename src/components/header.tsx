import { getUser } from "@/server-actions/get-user";
import { DropdownMenuHeader } from "./dropdown-menu-header";

export async function Header() {
  const user = await getUser();

  return (
    <header className="bg-[#1e1e1e] border-b border-[#2a2a2a]">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-violet-400 font-bold text-2xl select-none cursor-default">
          <a href="/">by@akihito7</a>
        </div>

        <div className="flex-1 max-w-md mx-6">
          <input
            type="search"
            placeholder="Pesquisar posts, tags, usuários..."
            className="w-full bg-[#2a2a2a] text-zinc-200 placeholder:text-zinc-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          />
        </div>

        {!user ? (
          <div className="flex space-x-4">
            <a
              href="/login"
              className="text-sm font-medium text-zinc-400 hover:text-violet-400 transition px-4 py-2 rounded-md border border-zinc-700 hover:border-violet-500 cursor-pointer"
            >
              Logar
            </a>
            <a
              href="/register"
              className="text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 transition px-4 py-2 rounded-md cursor-pointer"
            >
              Criar Conta
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <a
              href="/post/create"
              className="text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 transition px-4 py-2 rounded-md"
            >
              Criar Post
            </a>
            <DropdownMenuHeader user={user} />
          </div>
        )}
      </div>
    </header>
  );
}
