import { api } from "@/services/axios";

interface CreatePostProps {
  title: string;
  content: string;
  tags: string[]
}
export async function createPost({ title, content, tags }: CreatePostProps) {
  const response = await api.post('/post/create', {
    title,
    content,
    tags
  })
  return response.data;
}