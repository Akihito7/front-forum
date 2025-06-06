const popularTags = [
  "JavaScript",
  "React",
  "TypeScript",
  "NestJS",
  "TailwindCSS",
  "Node.js",
  "GraphQL",
];

export function CardPopularTags() {
  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-md">
      <h2 className="text-zinc-100 text-lg font-semibold mb-4">
        🏷 Tags Populares
      </h2>

      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag) => (
          <span
            key={tag}
            className="bg-violet-600 text-zinc-100 text-xs font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-violet-500 transition"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
