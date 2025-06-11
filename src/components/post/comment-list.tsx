"use client";

import { addLikeComment } from "@/api/add-like-comment";
import { removeLike } from "@/api/remove-like";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CommentListProps {
  data: Comment[];
  userId: string | undefined;
}

type Comment = {
  id: string;
  authorUsername: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
  likedByUser: boolean;
  currentUserLikeId: string | null;
};

export function CommentList({ data, userId }: CommentListProps) {
  const router = useRouter();

  const { mutateAsync: handleAddLikeComment, isPending: addLikeIsPending } =
    useMutation({
      mutationFn: addLikeComment,
      onSuccess: () => {
        toast.success("Like adicionado com sucesso");

        router.refresh();
      },
      onError: () => {
        toast.error("Erro ao curtir o comentário");
      },
    });

  const { mutateAsync: handleRemoveLike, isPending: removeLikeIsPending } =
    useMutation({
      mutationFn: removeLike,
      onSuccess: () => {
        router.refresh();
      },
      onError: () => {
        toast.error("Erro ao remover comentário");
      },
    });

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <CommentItem
          key={item.id}
          comment={item}
          handleAddLikeComment={handleAddLikeComment}
          userId={userId}
          handleRemoveLike={handleRemoveLike}
          addLikeIsPending={addLikeIsPending}
          removeLikeIsPending={removeLikeIsPending}
        />
      ))}
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
  userId: string | undefined;
  handleAddLikeComment: ({ commentId }: { commentId: string }) => Promise<void>;
  handleRemoveLike: ({ likeId }: { likeId: string }) => Promise<void>;
  addLikeIsPending: boolean;
  removeLikeIsPending: boolean;
}

function CommentItem({
  comment,
  userId,
  handleAddLikeComment,
  handleRemoveLike,
  addLikeIsPending,
  removeLikeIsPending,
}: CommentItemProps) {
  return (
    <div className="border border-zinc-800 rounded-md p-4 text-zinc-200 bg-[#1e1e1e]">
      <div className="flex justify-between">
        <div className="text-sm text-zinc-400 mb-2">
          por @{comment.authorUsername}
        </div>
        {userId === comment.authorId && (
          <div className="flex gap-2">
            <span className="cursor-pointer text-sm px-2 py-1 rounded-md border border-zinc-600 text-zinc-300 hover:border-violet-500 hover:text-violet-400 transition">
              Editar
            </span>

            <span className="cursor-pointer text-sm px-2 py-1 rounded-md border border-zinc-600 text-zinc-300 hover:border-rose-500 hover:text-rose-400 transition">
              Excluir
            </span>
          </div>
        )}
      </div>

      <p>{comment.content}</p>

      <div className="mt-3 flex items-center space-x-1 text-red-500 font-semibold select-none">
        <button
          onClick={async () => {
            if (!userId) {
              toast.warning("Você precisa logar antes de curtir.");
              return;
            }

            if (comment.currentUserLikeId) {
              return await handleRemoveLike({
                likeId: comment.currentUserLikeId,
              });
            }
            await handleAddLikeComment({ commentId: comment.id });
          }}
          disabled={addLikeIsPending || removeLikeIsPending}
        >
          <Heart
            className={`w-6 h-6 cursor-pointer transition-all ${
              comment.likedByUser
                ? "text-red-500 fill-red-500"
                : "text-white fill-transparent"
            }`}
          />
        </button>
        <span>{comment.likes}</span>
      </div>
    </div>
  );
}
