interface PopularPost {
  id: string;
  title: string;
  author: string;
  likes: number;
  comments: number;
}

const popularPosts: PopularPost[] = [
  {
    id: "1",
    title: "Como aprender TypeScript em 7 dias",
    author: "Ana Dev",
    likes: 120,
    comments: 45,
  },
  {
    id: "2",
    title: "Introdução ao NestJS para iniciantes",
    author: "João Code",
    likes: 95,
    comments: 30,
  },
  {
    id: "3",
    title: "Dicas de TailwindCSS para projetos reais",
    author: "Maria UI",
    likes: 80,
    comments: 25,
  },
];

export function CardPopularPosts() {
  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-md">
      <h2 className="text-zinc-100 text-lg font-semibold mb-4">
        🔥 Posts Populares
      </h2>

      <ul className="space-y-4">
        {popularPosts.map((post) => (
          <li
            key={post.id}
            className="hover:bg-[#2a2a2a] rounded-md p-3 transition cursor-pointer"
          >
            <h3 className="text-violet-400 font-semibold text-sm">
              {post.title}
            </h3>
            <p className="text-zinc-400 text-xs">por {post.author}</p>
            <div className="flex gap-4 text-zinc-500 text-xs mt-1">
              <span>❤️ {post.likes} reações</span>
              <span>💬 {post.comments} comentários</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
