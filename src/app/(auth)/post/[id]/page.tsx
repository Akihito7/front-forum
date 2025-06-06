export default function PostPage() {
  const post = {
    title: "Como melhorar performance de uma API REST?",
    author: "Akihito",
    date: "5 de junho",
    content:
      "Estou com uma API feita em NestJS e gostaria de saber quais são boas práticas para melhorar a performance dela, especialmente com muitas requisições simultâneas.",
    tags: ["nestjs", "performance", "backend"],
    likes: 15,
  };

  const respostas = [
    {
      id: 1,
      author: "Dev_1",
      text: "Você pode usar cache com Redis, limitar o uso de memória e otimizar as queries do banco. Além disso, o uso de filas como Bull pode ajudar no processamento assíncrono.",
      likes: 5,
    },
    {
      id: 2,
      author: "Dev_2",
      text: "Para melhorar a performance, também recomendo analisar os índices do banco e usar pooling de conexões.",
      likes: 3,
    },
    {
      id: 3,
      author: "Dev_3",
      text: "Outra dica é monitorar métricas com Prometheus e usar balanceamento de carga.",
      likes: 8,
    },
  ];

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 space-y-10">
      <article className="space-y-4">
        <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        <div className="text-zinc-400 text-sm">
          Postado por {post.author} em {post.date}
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

        {respostas.map(({ id, author, text, likes }) => (
          <div
            key={id}
            className="border border-zinc-800 rounded-md p-4 text-zinc-200 bg-[#1e1e1e]"
          >
            <div className="text-sm text-zinc-400 mb-2">por {author}</div>
            <p>{text}</p>

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
