"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/api/create-post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const createPostSchema = z.object({
  title: z.string().min(8, "O título deve ter no mínimo 8 caracteres"),
  content: z.string().min(64, "O conteúdo deve ter no mínimo 64 caracteres"),
  tags: z.array(z.string().min(1)).min(1, "Adicione ao menos uma tag"),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

export default function CreatePostPage() {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setValue("tags", updatedTags);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setValue("tags", updatedTags);
  };

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      toast.success("Post Criado com sucesso.");
      reset({ content: "", tags: [], title: "" });
      setTags([]);
      router.push("/");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  async function handleCreatePost(data: CreatePostFormData) {
    await mutateAsync(data);
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">Criar novo post</h1>

      <form onSubmit={handleSubmit(handleCreatePost)} className="space-y-6">
        <div>
          <label className="block text-zinc-400 mb-1 font-medium">Título</label>
          <input
            type="text"
            {...register("title")}
            placeholder="Ex: Como usar PostgreSQL com NestJS"
            className="w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.title.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-zinc-400 mb-1 font-medium">
            Conteúdo
          </label>
          <textarea
            {...register("content")}
            placeholder="Digite o conteúdo do post aqui..."
            className="w-full min-h-[200px] bg-[#2a2a2a] text-zinc-100 rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          {errors.content && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.content.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-zinc-400 mb-2 font-medium">Tags</label>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Digite uma tag e clique em adicionar"
              className="flex-1 bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md font-semibold transition"
            >
              Adicionar
            </button>
          </div>

          {errors.tags && (
            <span className="text-red-500 text-sm block mb-2">
              {errors.tags.message}
            </span>
          )}

          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-violet-400 bg-violet-950 px-2 py-1 rounded-md cursor-pointer flex items-center gap-1"
              >
                #{tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-zinc-400 hover:text-red-500 ml-1"
                  type="button"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          Publicar post
        </button>
      </form>
    </div>
  );
}
