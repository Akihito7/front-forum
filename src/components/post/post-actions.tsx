"use client";

import { useMutation } from "@tanstack/react-query";
import { DialogConfirmation } from "../dialog-confirmation";
import { removePost } from "@/api/remove-post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PostActionsProps {
  postId: string;
}

export function PostActions({ postId }: PostActionsProps) {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: removePost,
    onSuccess: () => {
      toast.success("Post deletado com sucesso.");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleDeletePost() {
    await mutateAsync({ postId });
  }

  return (
    <div className="flex gap-2">
      <a
        href={`/post/edit/${postId}`}
        className="text-sm px-3 py-1 rounded-md border border-zinc-600 text-zinc-300 hover:border-violet-500 hover:text-violet-400 transition"
      >
        Editar
      </a>

      <DialogConfirmation
        onConfirm={handleDeletePost}
        title="Tem certeza que deseja deletar o post?"
      >
        <button className="text-sm px-3 py-1 rounded-md border border-zinc-600 text-zinc-300 hover:border-red-500 hover:text-red-400 transition">
          Deletar
        </button>
      </DialogConfirmation>
    </div>
  );
}
