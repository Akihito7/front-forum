import { api } from "@/services/axios";

interface CheckLikCommentExistsProps {
  commentId: string;
  authorId: string
}

interface Data {
  likeExists: boolean
}
export async function checkLikeCommentExists({ commentId, authorId }: CheckLikCommentExistsProps): Promise<Data> {
  const response = await api.get(`/like/check-like-comment/${commentId}/${authorId}`)
  return response.data
}