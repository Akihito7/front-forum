import { useRouter } from "next/navigation";

interface CardPostProps {
  authorId: string;
  content: string;
  createdAt: Date;
  id: string;
  tags: string[];
  title: string;
  updatedAt: Date | null;
}

export function CardPost({
  authorId,
  content,
  createdAt,
  id,
  tags,
  title,
  updatedAt,
}: CardPostProps) {
  
  const router = useRouter();

  function handleNavigateToPost() {
    router.push(`/post/${id}`);
  }

  return (
    <div
      className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-md hover:shadow-lg transition"
      onClick={handleNavigateToPost}
    >
      <div className="flex items-center gap-3 mb-4 text-zinc-400 text-sm">
        <img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium text-zinc-200">{authorId}</span>
        <span className="text-zinc-500">{createdAt.toString()}</span>
      </div>

      <h1 className="text-xl text-zinc-100 font-semibold mb-3 hover:underline cursor-pointer">
        {title}
      </h1>

      <div className="flex gap-2 flex-wrap mb-4">
        {tags &&
          tags.length > 0 &&
          tags.map((tag, index) => (
            <span
              className="text-sm text-violet-400 bg-violet-950 px-2 py-1 rounded-md cursor-pointer"
              key={index}
            >
              #{tag}
            </span>
          ))}
      </div>

      <div className="flex items-center gap-4 text-zinc-400 text-sm">
        <span>🔥 20 reações</span>
        <span>💬 12 comentários</span>
      </div>
    </div>
  );
}
