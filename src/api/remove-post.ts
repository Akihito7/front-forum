import { api } from "@/services/axios";

interface RemovePostProps {
  postId: string;
}

export async function removePost({ postId }: RemovePostProps) {
  const response = await api.delete(`/post/delete/${postId}`);
  return response.data;
} 