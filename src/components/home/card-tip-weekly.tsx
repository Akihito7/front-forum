import { Tip } from "@/api/get-current-tip";

interface CardTipWeeklyProps {
  tip: Tip;
}

export function CardTipWeekly({ tip }: CardTipWeeklyProps) {
  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 shadow-lg transition hover:shadow-xl hover:border-violet-500 duration-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-violet-400 text-sm font-medium uppercase tracking-wider">
          💡 Dica da Semana
        </h2>
        <span className="text-xs text-zinc-500">
          {new Date(tip.createdAt).toLocaleDateString()}
        </span>
      </div>

      <h3 className="text-zinc-100 text-xl font-semibold mb-2">{tip.title}</h3>

      <p className="text-zinc-400 text-sm leading-relaxed mb-4">
        {tip.content}
      </p>

      <a
        href={tip.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm font-medium text-violet-400 hover:text-violet-300 transition"
      >
        🔗 Saiba mais
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
  );
}
