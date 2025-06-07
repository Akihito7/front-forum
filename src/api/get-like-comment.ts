import { api } from "@/services/axios";

interface GetLikeCommentProps {
  authorId: string;
  commentId: string
}
export async function getLikeComment({ commentId, authorId }: GetLikeCommentProps) {
  const response = await api.get(`/like/comment/${commentId}/${authorId}`)
  return response.data
}