import { api } from "@/services/axios";

interface RemoveLikeProps {
  likeId: string;
}
export async function removeLike({ likeId }: RemoveLikeProps) {
  const response = await api.delete(`/like/delete/${likeId}`)
  return response.data
}