import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import React from "react";
import { Followers, Followings } from "@/api/get-profile";
import Link from "next/link";

interface ModalFollowProps {
  data: Followers | Followings;
  title: string;
  children: React.ReactNode;
}

export function ModalFollow({ data, title, children }: ModalFollowProps) {
  const normalizedData = data.map((item) => ({
    id: item.followId,
    name: "followerName" in item ? item.followerName : item.followingName,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="fixed top-1/2 left-1/2 z-50 w-full max-w-md max-h-[80vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#1e1e1e] p-6 shadow-2xl border border-zinc-800">
        <DialogTitle className="text-white text-xl font-semibold mb-6">
          {title}
        </DialogTitle>

        <div className="flex flex-col gap-4">
          {normalizedData.length > 0 ? (
            normalizedData.map((item) => (
              <Link
                href={`${item.name}`}
                key={item.id}
                className="flex items-center gap-3 hover:bg-zinc-800 p-3 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-violet-700 flex items-center justify-center text-white text-base font-semibold uppercase">
                  {item.name[0]}
                </div>
                <span className="text-white font-medium">{item.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-zinc-400">
              {title === "Seguidores"
                ? "Você ainda não tem nenhum seguidor."
                : "Você ainda não está seguindo ninguém."}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
