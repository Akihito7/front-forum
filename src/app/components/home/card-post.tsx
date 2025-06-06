export function CardPost() {
  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-md hover:shadow-lg transition">

      <div className="flex items-center gap-3 mb-4 text-zinc-400 text-sm">
        <img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium text-zinc-200">Akihito</span>
        <span className="text-zinc-500">• 5 de junho</span>
      </div>

      <h1 className="text-xl text-zinc-100 font-semibold mb-3 hover:underline cursor-pointer">
        How to play Riven
      </h1>

      <div className="flex gap-2 flex-wrap mb-4">
        <span className="text-sm text-violet-400 bg-violet-950 px-2 py-1 rounded-md cursor-pointer">
          #lol
        </span>
        <span className="text-sm text-blue-400 bg-blue-950 px-2 py-1 rounded-md cursor-pointer">
          #pc
        </span>
      </div>

      <div className="flex items-center gap-4 text-zinc-400 text-sm">
        <span>🔥 20 reações</span>
        <span>💬 12 comentários</span>
      </div>
    </div>
  );
}
