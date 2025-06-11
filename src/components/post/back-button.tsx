"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 text-violet-400 hover:text-violet-300 transition cursor-pointer"
      aria-label="Voltar"
      type="button"
    >
      <ArrowLeft className="w-5 h-5" />
      Voltar
    </button>
  );
}
