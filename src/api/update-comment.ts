import { api } from "@/services/axios";


interface UpdateCommentProps {
  commentId: string;
  content: string
}
export async function updateComment({ commentId, content }: UpdateCommentProps) {
  const response = await api.put(`/comment/${commentId}`, {
    content
  })
  const data = response.data;
  return data;
}