import { api } from "@/services/axios";

interface UpdatePostProps {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

export async function updatePost({ id, title, content, tags }: UpdatePostProps) {
  const response = await api.put(`/post/${id}`, {
    title,
    content,
    tags
  })

  return response.data;
}