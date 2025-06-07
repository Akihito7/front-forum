"use client";

import { addLikeComment } from "@/api/add-like-comment";
import { checkLikeCommentExists } from "@/api/check-like-comment-exists";
import { getLikeComment } from "@/api/get-like-comment";
import { removeLike } from "@/api/remove-like";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AnswerListProps {
  data: Answer[];
  userId: string | undefined;
}

type Answer = {
  id: string;
  authorUsername: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
};

export function AnswerList({ data, userId }: AnswerListProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: handleAddLikeComment } = useMutation({
    mutationFn: addLikeComment,
    onSuccess: (_, variables) => {
      toast.success("Like adicionado com sucesso");

      queryClient.invalidateQueries({
        queryKey: ["likeExists", variables.commentId, userId],
      });

      router.refresh();
    },
    onError: () => {
      toast.error("Erro ao curtir o comentário");
    },
  });

  const { mutateAsync: handleRemoveLike } = useMutation({
    mutationFn: removeLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likeExists"],
      });
      router.refresh();
    },
    onError: () => {},
  });

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <AnswerItem
          key={item.id}
          answer={item}
          handleAddLikeComment={handleAddLikeComment}
          userId={userId}
          handleRemoveLike={handleRemoveLike}
        />
      ))}
    </div>
  );
}

function AnswerItem({
  answer,
  userId,
  handleAddLikeComment,
  handleRemoveLike,
}: {
  answer: Answer;
  userId: string | undefined;
  handleAddLikeComment: any;
  handleRemoveLike: any;
}) {
  const { data: like } = useQuery({
    queryKey: ["likeExists", answer.id, userId],
    queryFn: () =>
      checkLikeCommentExists({ commentId: answer.id, authorId: userId! }),
    enabled: !!userId,
  });

  const { data: likeData } = useQuery({
    queryKey: ["likeComment", answer.id, userId],
    queryFn: () => getLikeComment({ commentId: answer.id, authorId: userId! }),
    enabled: !!like?.likeExists && !!userId,
  });

  return (
    <div className="border border-zinc-800 rounded-md p-4 text-zinc-200 bg-[#1e1e1e]">
      <div className="text-sm text-zinc-400 mb-2">
        por @{answer.authorUsername}
      </div>
      <p>{answer.content}</p>

      <div className="mt-3 flex items-center space-x-1 text-red-500 font-semibold select-none">
        <Heart
          className={`w-6 h-6 cursor-pointer transition-all ${
            like?.likeExists
              ? "text-red-500 fill-red-500"
              : "text-white fill-transparent"
          }`}
          onClick={async () => {
            if (!userId) {
              toast.warning("Você precisa logar antes de curtir.");
              return;
            }

            if (like && like.likeExists) {
              return await handleRemoveLike({ likeId: likeData.id });
            }
            await handleAddLikeComment({ commentId: answer.id });
          }}
        />
        <span>{answer.likes}</span>
      </div>
    </div>
  );
}
