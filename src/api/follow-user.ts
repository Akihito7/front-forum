import { api } from "@/services/axios";

interface FollowUserProps {
  userToFollowId: string;
  userIsFollowerId: string;
}

export async function followUser({ userToFollowId, userIsFollowerId }: FollowUserProps) {
  const response = await api.post('follow', {
    followerId: userIsFollowerId,
    followingId: userToFollowId
  });
  return response.data;
}