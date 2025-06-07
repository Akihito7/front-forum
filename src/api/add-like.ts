import { api } from "@/services/axios";


interface AddLikeProps {
  postId: string;
}
export async function addLike({ postId }: AddLikeProps) {
  const response = await api.post('/like/create', {
    postId
  })
  return response.data
}