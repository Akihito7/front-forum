"use client";

import { sendComment } from "@/api/send-comment";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const answerFormDataSchema = z.object({
  content: z.string().min(12, {
    message: "A resposta deve conter pelo menos 12 caracteres.",
  }),
});

type AnswerFormDataType = z.infer<typeof answerFormDataSchema>;

interface AnswerFormProps {
  postId: string;
  userId: string | undefined;
}

export function AnswerForm({ postId, userId }: AnswerFormProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnswerFormDataType>({
    resolver: zodResolver(answerFormDataSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendComment,
    onSuccess: () => {
      reset({ content: "" });
      router.refresh();
      toast.success("Comentario adicionado.");
    },
    onError: () => {
      toast.error("Erro ao tentar comentar.");
    },
  });

  async function handleSendComment(data: AnswerFormDataType) {
    await mutateAsync({
      ...data,
      postId,
    });
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Deixe sua resposta</h2>

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <>
            <textarea
              {...field}
              className="w-full min-h-[120px] bg-[#2a2a2a] text-zinc-100 rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Escreva sua resposta aqui..."
            />
            {errors.content && (
              <p className="text-sm text-red-500 mt-1">
                {errors.content.message}
              </p>
            )}
          </>
        )}
      />

      <button
        type="button"
        className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md font-medium transition disabled:opacity-25"
        onClick={() => {
          if (!userId)
            return toast.warning("Você precisa logar antes de comentar.");
          handleSubmit(handleSendComment)();
        }}
        disabled={isPending}
      >
        {isPending ? "Enviando..." : "Enviar resposta"}
      </button>
    </section>
  );
}
