import { getPostById } from "@/api/get-post-by-id";
import { AnswerForm } from "@/components/post/answer-form";
import { BackButton } from "@/components/post/back-button";
import { ButtonAddLike } from "@/components/post/button-add-like";
import { CommentList } from "@/components/post/comment-list";
import { PostActions } from "@/components/post/post-actions";
import { PostSkeleton } from "@/components/post/post-skeleton";
import { getUser } from "@/server-actions/get-user";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function PostPage({ params }: any) {
  const user = await getUser();

  const { id: postId } = params;

  const post = await getPostById({ postId });

  const dateFormmated = formatDistanceToNow(post.createdAt, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 space-y-10">
      <BackButton />

      {!post && <PostSkeleton />}

      {post && (
        <>
          <article className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">{post.title}</h1>

              {user && post.authorId === user.id && (
                <PostActions postId={post.id} />
              )}
            </div>

            <div className="text-zinc-400 text-sm">
              Postado por {post.authorUsername} {dateFormmated}
            </div>
            <div className="text-zinc-200 leading-relaxed">{post.content}</div>

            <div className="flex space-x-4 text-sm text-zinc-400">
              {post.tags.map((tag: string) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>

            <div className="flex items-center space-x-1 text-red-500 font-semibold select-none">
              <ButtonAddLike postId={post.id} userId={user?.id} />
              <span>{post.likes}</span>
            </div>
          </article>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Respostas</h2>

            <CommentList data={post.comments} userId={user?.id} />
          </section>
          <AnswerForm postId={post.id} userId={user?.id} />
        </>
      )}
    </div>
  );
}
