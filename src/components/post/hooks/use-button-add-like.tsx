import { addLike } from "@/api/add-like";
import { checkLikeExists } from "@/api/check-like-exists";
import { getLike } from "@/api/get-like";
import { removeLike } from "@/api/remove-like";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseButtonAddLikeProps {
  postId: string;
  userId: string | undefined;
}
export function useButtonAddLike({ postId, userId }: UseButtonAddLikeProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: handleAddLike } = useMutation({
    mutationFn: addLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["check-like"] });
      router.refresh();
    },
    onError: () => {
      toast.error("Erro ao curtir.");
    },
  });

  async function handleDeleteLike() {
    const like = await getLike({ postId, authorId: userId! });
    mutateAsync({ likeId: like.id });
  }

  const { mutateAsync } = useMutation({
    mutationFn: removeLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["check-like"] });
      router.refresh();
    },
    onError: () => {
      toast.error("Erro ao remover o like.");
    },
  });

  async function checkIfUserAlreadyLikeThisPost() {
    return checkLikeExists({
      postId,
      authorId: userId!,
    });
  }
  const { data: like } = useQuery({
    queryKey: ["check-like"],
    queryFn: checkIfUserAlreadyLikeThisPost,
    enabled: !!userId,
  });

  return {
    handleAddLike,
    handleDeleteLike,
    like,
  };
}
