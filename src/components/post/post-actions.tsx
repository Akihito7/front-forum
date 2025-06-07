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
        className="text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md font-medium transition"
      >
        Editar
      </a>
      <DialogConfirmation
        onConfirm={handleDeletePost}
        title="Tem certeza que deseja deletar o post?"
      >
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md font-medium transition cursor-pointer">
          Delete
        </button>
      </DialogConfirmation>
    </div>
  );
}
