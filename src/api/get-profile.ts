import { api } from "@/services/axios";

interface GetProfileProps {
  username: string
}

interface Data {
  user: {
    id: string
    name: string
    username: string
    email: string
    createdAt: Date;
    updatedAt: Date;
    totalPosts: number
    totalComments: number;
    followersOfUser: Followers,
    usersIamFollowing: Followings,
  },
  posts: {
    id: string
    authorId: string
    title: string
    content: string
    tags: string[],
    createdAt: Date
    updatedAt: Date
    totalLikes: number
    totalComments: number

  }[],
  comment: {
    postTitle: string
    id: string
    authorId: string
    content: string
    postId: string
    createdAt: Date
    updatedAt: Date,
    likes: number
  }[]
}

export type Followers = {
  followId: string;
  followerId: string
  followerName: string;
  followedAt: Date | undefined
}[]

export type Followings = {
  followId: string
  followingId: string;
  followingName: string;
  followedAt: Date | undefined
}[]

export async function getProfile({ username }: GetProfileProps): Promise<Data> {
  const response = await api.get(`/user/profile/${username}`)
  const data = response.data;
  return data
}