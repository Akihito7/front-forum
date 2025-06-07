"use client";

import { addLike } from "@/api/add-like";
import { checkLikeExists } from "@/api/check-like-exists";
import { getLike } from "@/api/get-like";
import { removeLike } from "@/api/remove-like";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useButtonAddLike } from "./hooks/use-button-add-like";

interface ButtonAddLikeProps {
  postId: string;
  userId?: string;
}

export function ButtonAddLike({ postId, userId }: ButtonAddLikeProps) {
  
  const { like, handleAddLike, handleDeleteLike } = useButtonAddLike({
    postId,
    userId,
  });

  return (
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
          await handleDeleteLike();
        } else {
          await handleAddLike({ postId });
        }
      }}
    />
  );
}
