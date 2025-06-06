export function CardTipWeekly() {
  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-md">
      <h2 className="text-zinc-100 text-lg font-semibold mb-2">
        💡 Dica da Semana
      </h2>

      <p className="text-zinc-400 text-sm leading-relaxed">
        Use{" "}
        <code className="bg-[#2a2a2a] px-1 py-[2px] rounded text-zinc-200">
          zod
        </code>{" "}
        para validar dados no seu backend com segurança e tipagem automática no
        TypeScript.
      </p>

      <div className="mt-4">
        <a
          href="https://zod.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 text-sm hover:underline"
        >
          🔗 Saiba mais sobre Zod →
        </a>
      </div>
    </div>
  );
}
