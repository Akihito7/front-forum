import { api } from "@/services/axios";

interface AddLikeCommentProps {
  commentId: string;
}
export async function addLikeComment({ commentId }: AddLikeCommentProps) {
  const response = await api.post('/like/comment/create', {
    commentId
  })
  return response.data
}