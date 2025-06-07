"use client";

import { Heart } from "lucide-react";
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
