"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import React from "react";

interface DialogConfirmationProps {
  title?: string;
  children: React.ReactNode;
  onConfirm(): void;
  onDecline?(): void;
}

export function DialogConfirmation({
  children,
  title = "Tem certeza?",
  onConfirm,
  onDecline,
}: DialogConfirmationProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#1e1e1e] p-6 shadow-lg border border-zinc-800">
        <DialogTitle className="text-white text-lg mb-4">{title}</DialogTitle>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={onConfirm}
            >
              Sim
            </button>
          </DialogClose>

          <DialogClose asChild>
            <button
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={onDecline}
            >
              Não
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
