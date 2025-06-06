export function CardGreetings() {
  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-md">
      <h2 className="text-zinc-100 text-xl font-semibold mb-2">
        👋 Bem-vindo(a) ao Fórum!
      </h2>
      <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
        Este é um espaço para compartilhar conhecimento, tirar dúvidas e conversar sobre programação, tecnologia e muito mais.
      </p>

      <div className="flex flex-col gap-2">
        <a
          href="#"
          className="text-sm text-violet-400 hover:underline transition"
        >
          📝 Criar seu primeiro post
        </a>
        <a
          href="#"
          className="text-sm text-blue-400 hover:underline transition"
        >
          💡 Ver posts recentes
        </a>
      </div>
    </div>
  );
}
