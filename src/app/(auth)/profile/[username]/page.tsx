interface Post {
  id: string;
  title: string;
  createdAt: string;
  likes: number;
  comments: number;
}

interface Answer {
  id: string;
  questionTitle: string;
  createdAt: string;
  excerpt: string;
}

interface UserProfileProps {
  name: string;
  username: string;
  bio?: string;
  githubAvatarUrl?: string;
  githubProfileUrl?: string;
  stats: {
    postsCount: number;
  };
  posts: Post[];
  answers: Answer[];
}

export default function ProfilePage({
  user = {
    name: "Akihito",
    username: "akihito7",
    bio: "Desenvolvedor fullstack, amante de tecnologia e café ☕",
    githubAvatarUrl: "https://github.com/akihito7.png",
    githubProfileUrl: "https://github.com/akihito7",
    stats: {
      postsCount: 42,
    },
    posts: [
      {
        id: "1",
        title: "Como melhorar performance de APIs REST",
        createdAt: "2025-06-01",
        likes: 24,
        comments: 8,
      },
      {
        id: "2",
        title: "Guia de autenticação JWT para iniciantes",
        createdAt: "2025-05-25",
        likes: 35,
        comments: 12,
      },
    ],
    answers: [
      {
        id: "101",
        questionTitle: "Quais são boas práticas para autenticação segura?",
        createdAt: "2025-06-03",
        excerpt:
          "Uma boa prática é sempre usar tokens JWT com expiração curta e armazenar refresh tokens...",
      },
      {
        id: "102",
        questionTitle: "Como otimizar consultas SQL complexas?",
        createdAt: "2025-05-20",
        excerpt:
          "Utilize índices corretamente, evite SELECT * e analise o plano de execução...",
      },
    ],
  },
}: {
  user?: UserProfileProps;
}) {
  return (
    <main className="max-w-6xl mx-auto p-6 grid grid-cols-[2fr_1fr] gap-10">
      <section className="space-y-10">
        <header className="flex items-center space-x-8 bg-[#1e1e1e] rounded-md p-6 shadow-lg">
          {user.githubAvatarUrl ? (
            <a href={user.githubProfileUrl} target="_blank" rel="noreferrer">
              <img
                src={user.githubAvatarUrl}
                alt={`${user.name} GitHub avatar`}
                className="w-28 h-28 rounded-full border-4 border-violet-600"
              />
            </a>
          ) : (
            <div className="w-28 h-28 rounded-full bg-violet-700 flex items-center justify-center text-white text-5xl font-bold">
              {user.name[0]}
            </div>
          )}

          <div>
            <h1 className="text-4xl font-bold text-white">{user.name}</h1>
            <p className="text-violet-400 text-xl mb-2">@{user.username}</p>
            {user.bio && (
              <p className="max-w-xl text-zinc-400 leading-relaxed">
                {user.bio}
              </p>
            )}

            <div className="flex space-x-8 mt-6 text-zinc-300">
              <div>
                <strong className="text-white">{user.stats.postsCount}</strong>{" "}
                Posts
              </div>
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Posts recentes
          </h2>
          <ul className="space-y-4">
            {user.posts.length > 0 ? (
              user.posts.map((post) => (
                <li
                  key={post.id}
                  className="bg-[#1e1e1e] p-4 rounded-md shadow hover:shadow-xl transition"
                >
                  <a
                    href={`/post/${post.id}`}
                    className="text-violet-400 font-semibold text-lg hover:underline"
                  >
                    {post.title}
                  </a>
                  <div className="text-zinc-400 text-sm mt-1 flex gap-4">
                    <span>
                      Publicado em{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span>❤️ {post.likes} likes</span>
                    <span>💬 {post.comments} comentários</span>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-zinc-500">Nenhum post ainda.</p>
            )}
          </ul>
        </section>
      </section>

      <aside className="space-y-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Respostas recentes
        </h2>
        {user.answers.length > 0 ? (
          <ul className="space-y-4">
            {user.answers.map((answer) => (
              <li
                key={answer.id}
                className="bg-[#1e1e1e] p-4 rounded-md shadow hover:shadow-xl transition"
              >
                <a
                  href={`/post/${answer.id}`}
                  className="text-violet-400 font-semibold hover:underline"
                >
                  {answer.questionTitle}
                </a>
                <p className="text-zinc-400 text-sm mt-1 line-clamp-3">
                  {answer.excerpt}
                </p>
                <div className="text-zinc-500 text-xs mt-2">
                  Respondido em{" "}
                  {new Date(answer.createdAt).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-500">Nenhuma resposta recente.</p>
        )}
      </aside>
    </main>
  );
}
