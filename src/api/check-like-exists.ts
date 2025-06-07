import { api } from "@/services/axios";

interface CheckLikExistsProps {
  postId: string;
  authorId: string
}

interface Data {
  likeExists: boolean
}
export async function checkLikeExists({ postId, authorId }: CheckLikExistsProps): Promise<Data> {
  const response = await api.get(`/like/check-like/${postId}/${authorId}`)
  return response.data
}