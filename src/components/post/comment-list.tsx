"use client";

import { addLikeComment } from "@/api/add-like-comment";
import { deleteComment } from "@/api/delete-comment";
import { removeLike } from "@/api/remove-like";
import { updateComment } from "@/api/update-comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
          router={router}
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
  router: AppRouterInstance;
}

function CommentItem({
  comment,
  userId,
  handleAddLikeComment,
  handleRemoveLike,
  addLikeIsPending,
  removeLikeIsPending,
  router,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  
  const { mutateAsync: handleUpdateComment } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      toast.success("Comentário atualizado com sucesso.");
    },
  });

  const { mutateAsync: handleDeleteComment } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success("Comentário deletado com sucesso.");
    },
  });

  return (
    <div
      className={`rounded-md p-4 text-zinc-200 bg-[#1e1e1e] border ${
        isEditing
          ? "border-violet-500 outline-2  outline-violet-500"
          : "border-zinc-800"
      } transition`}
    >
      <div className="flex justify-between">
        <div className="text-sm text-zinc-400 mb-2">
          por @{comment.authorUsername}
        </div>
        {userId === comment.authorId && (
          <div className="flex gap-2">
            <span
              onClick={() => {
                if (isEditing) {
                  setContent(comment.content);
                }
                setIsEditing((prev) => !prev);
              }}
              className="cursor-pointer text-sm px-2 py-1 rounded-md border border-zinc-600 text-zinc-300 hover:border-violet-500 hover:text-violet-400 transition"
            >
              {isEditing ? "Cancelar" : "Editar"}
            </span>

            <span
              onClick={async () => {
                await handleDeleteComment({ commentId: comment.id });
                router.refresh();
              }}
              className="cursor-pointer text-sm px-2 py-1 rounded-md border border-zinc-600 text-zinc-300 hover:border-rose-500 hover:text-rose-400 transition"
            >
              Excluir
            </span>

            {isEditing && (
              <span
                onClick={async () => {
                  await handleUpdateComment({ commentId: comment.id, content });
                  setIsEditing(false);
                  router.refresh();
                }}
                className="cursor-pointer text-sm px-2 py-1 rounded-md border border-zinc-600 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400 transition"
              >
                Salvar
              </span>
            )}
          </div>
        )}
      </div>

      <input
        type="text"
        disabled={!isEditing}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className={`w-full py-2 rounded-md text-sm outline-none bg-transparent ${
          isEditing ? "text-zinc-100" : "text-zinc-400 cursor-default"
        }`}
      />

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
