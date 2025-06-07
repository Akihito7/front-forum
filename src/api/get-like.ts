import { api } from "@/services/axios";

interface GetLikeProps {
  postId: string;
  authorId: string
}
export async function getLike({ postId, authorId }: GetLikeProps) {
  const response = await api.get(`/like/${postId}/${authorId}`)
  return response.data
}