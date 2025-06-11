import { api } from "@/services/axios";

interface UnfollowUserProps {
  targetUserId: string; // o usuário que será deixado de seguir
  currentUserId: string; // o usuário que está executando a ação
}

export async function unfollowUser({ targetUserId, currentUserId }: UnfollowUserProps) {
  const response = await api.delete('follow', {
    data: {
      followerId: currentUserId,
      followingId: targetUserId
    }
  });
  return response.data;
}