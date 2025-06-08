import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CardPostProps {
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
  id: string;
  tags: string[];
  title: string;
  likes: number;
  updatedAt: Date | null;
  comments: {
    postId: string;
    authorId: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
  }[];
}

export function CardPost({
  createdAt,
  id,
  tags,
  title,
  authorName,
  comments,
  likes,
}: CardPostProps) {
  const router = useRouter();

  function handleNavigateToPost() {
    router.push(`/post/${id}`);
  }

  const dateFormmated = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-md hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-4 text-zinc-400 text-sm">
        <img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
        <a href={`profile/${authorName}`}>
          <span className="font-medium text-zinc-200">@{authorName}</span>
        </a>
        <span className="text-zinc-500">{dateFormmated}</span>
      </div>

      <h1
        className="text-xl text-zinc-100 font-semibold mb-3 hover:underline cursor-pointer"
        onClick={handleNavigateToPost}
      >
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
        <span>
          🔥 {likes} {likes > 1 ? "likes" : "like"}
        </span>
        <span>
          💬 {comments?.length}{" "}
          {comments?.length > 1 ? "comentários" : "comentário"}
        </span>
      </div>
    </div>
  );
}
