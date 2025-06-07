import { api } from "@/services/axios";

interface SendCommentProps {
  postId: string;
  content: string;
}

export async function sendComment({ postId, content }: SendCommentProps) {
  const response = await api.post('/comment/create', {
    postId,
    content
  })
  return response.data;
}