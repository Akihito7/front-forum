"use client";

import { followUser } from "@/api/follow-user";
import { unfollowUser } from "@/api/unfollow-user";
import { useMutation } from "@tanstack/react-query";
import { Loader2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ButtonFollowUserProps {
  targetUserId: string;
  currentUserId: string;
  actionType: "follow" | "unfollow";
}

export function ActionFollow({
  targetUserId,
  currentUserId,
  actionType,
}: ButtonFollowUserProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { mutateAsync: followUserMutation } = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      router.refresh();
    },
  });

  const { mutateAsync: unfollowUserMutation } = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      router.refresh();
    },
  });

  async function handleAction() {
    setLoading(true);
    try {
      if (actionType === "follow") {
        await followUserMutation({
          userIsFollowerId: currentUserId,
          userToFollowId: targetUserId,
        });
      } else {
        await unfollowUserMutation({
          currentUserId,
          targetUserId,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  const className =
    actionType === "follow"
      ? "cursor-pointer px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 border-none"
      : "cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-700 hover:bg-zinc-800 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed border-none";

  return (
    <button className={className} onClick={handleAction} disabled={loading}>
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin mx-auto" />
      ) : actionType === "follow" ? (
        "Seguir"
      ) : (
        <>
          <User className="w-4 h-4" />
          Deixar de seguir
        </>
      )}
    </button>
  );
}
