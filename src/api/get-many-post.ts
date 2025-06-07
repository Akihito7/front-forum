import { api } from "@/services/axios";

interface Post {
  authorId: string
  authorName: string
  content: string
  createdAt: Date
  id: string
  tags: string[]
  title: string
  likes: number;
  updatedAt: Date | null,
  comments: {
    postId: string;
    authorId: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
  }[]
}

export async function getManyPost(): Promise<Post[]> {
  const response = await api.get('/post/many');
  return response.data;
}