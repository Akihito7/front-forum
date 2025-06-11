import { api } from "@/services/axios";


interface DeleteCommentProps {
  commentId: string;
}
export async function deleteComment({ commentId }: DeleteCommentProps) {
  const response = await api.delete(`/comment/${commentId}`)
  const data = response.data;
  return data;
}