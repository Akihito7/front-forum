"use client";

import { addLike } from "@/api/add-like";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ButtonAddLikeProps {
  postId: string;
}

export function ButtonAddLike({ postId }: ButtonAddLikeProps) {
  const router = useRouter();

  const { mutateAsync: handleAddLike } = useMutation({
    mutationFn: addLike,
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      toast.error("Erro ao curtir.");
    },
  });

  return (
    <span className="cursor-pointer" onClick={() => handleAddLike({ postId })}>
      ❤️
    </span>
  );
}
