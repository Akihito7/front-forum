import { api } from "@/services/axios";


interface GetPostByIdProps {
  postId: string
}

interface Post {
  authorUsername: string
  authorId: string
  content: string
  createdAt: Date
  id: string
  tags: string[]
  title: string
  updatedAt: Date | null
  likes: number;
  comments: {
    id: string;
    authorUsername: string
    postId: string;
    authorId: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
    likedByUser: boolean
    currentUserLikeId: string | null
  }[]
}

export async function getPostById({ postId }: GetPostByIdProps): Promise<Post> {
  const response = await api.get(`/post/${postId}`);
  return response.data;
}