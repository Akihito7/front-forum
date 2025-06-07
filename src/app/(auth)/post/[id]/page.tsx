import { getPostById } from "@/api/get-post-by-id";

export default async function PostPage({ params }: any) {
  const { id: postId } = await params;

  const post = await getPostById({ postId });

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 space-y-10">
      <article className="space-y-4">
        <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        <div className="text-zinc-400 text-sm">
          Postado por {post.authorId} em {post.createdAt.toString()}
        </div>
        <div className="text-zinc-200 leading-relaxed">{post.content}</div>

        <div className="flex space-x-4 text-sm text-zinc-400">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>

        <div className="flex items-center space-x-1 text-red-500 font-semibold select-none">
          <span>❤️</span>
          <span>{post.likes}</span>
        </div>
      </article>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Respostas</h2>

        {post.comments.map(({ content, likes, authorId }, index) => (
          <div
            key={index}
            className="border border-zinc-800 rounded-md p-4 text-zinc-200 bg-[#1e1e1e]"
          >
            <div className="text-sm text-zinc-400 mb-2">por {authorId}</div>
            <p>{content}</p>

            <div className="mt-3 flex items-center space-x-1 text-red-500 font-semibold select-none">
              <span>❤️</span>
              <span>{likes}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Deixe sua resposta</h2>
        <textarea
          className="w-full min-h-[120px] bg-[#2a2a2a] text-zinc-100 rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Escreva sua resposta aqui..."
        />
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md font-medium transition"
        >
          Enviar resposta
        </button>
      </section>
    </div>
  );
}
