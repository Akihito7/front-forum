export function CardRules() {
  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-md">
      <h2 className="text-zinc-100 text-lg font-semibold mb-4">
        📜 Regras do Fórum
      </h2>

      <ul className="list-disc list-inside text-zinc-400 text-sm space-y-2 leading-relaxed">
        <li>Seja respeitoso com todos os membros.</li>
        <li>Evite spam ou autopromoção exagerada.</li>
        <li>Use títulos claros e descritivos nos posts.</li>
        <li>Respeite as tags e categorias do fórum.</li>
        <li>Evite conteúdo ofensivo ou discriminatório.</li>
      </ul>
    </div>
  );
}
