import { useFeed } from "@/app/(home)/hooks/use-feed";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function ListPost() {
  const { posts, postIsLoading } = useFeed();
  return (
    <div className="w-full rounded-md shadow-lg p-6 transition hover:shadow-xl space-y-4">
      {postIsLoading &&
        [...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-md animate-pulse"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-zinc-700" />
              <div className="h-4 bg-zinc-700 rounded w-24" />
              <div className="h-4 bg-zinc-700 rounded w-16 ml-auto" />
            </div>

            <div className="h-6 bg-zinc-700 rounded w-3/4 mb-3" />

            <div className="flex gap-2 flex-wrap mb-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-5 bg-violet-950 rounded-md w-16" />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="h-4 bg-zinc-700 rounded w-20" />
              <div className="h-4 bg-zinc-700 rounded w-24" />
            </div>
          </div>
        ))}

      {!postIsLoading &&
        posts &&
        posts.length > 0 &&
        posts.map((post: any) => <CardPost key={post.id} {...post} />)}
    </div>
  );
}

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

function CardPost({
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
        <div className="w-10 h-10 rounded-full bg-violet-700 flex items-center justify-center text-white text-base font-semibold uppercase">
          {authorName[0]}
        </div>
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
