"use client";

import { PostSkeleton } from "@/components/post/post-skeleton";
import { usePost } from "../hooks/use-post";

export default function EditPostPage() {
  const {
    handleAddTag,
    handleRemoveTag,
    handleSubmit,
    handleUpdatePost,
    post,
    postIsLoading,
    register,
    setValue,
    tags,
    setTagInput,
    tagInput,
  } = usePost();

  return (
    <div className="max-w-[800px] mx-auto px-4 py-10">
      {postIsLoading && <PostSkeleton />}

      {!postIsLoading && (
        <>
          <h1 className="text-3xl font-bold text-white mb-6">Editar post</h1>
          <form onSubmit={handleSubmit(handleUpdatePost)} className="space-y-6">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">
                Título
              </label>
              <input
                type="text"
                {...register("title")}
                className="w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-medium">
                Conteúdo
              </label>
              <textarea
                {...register("content")}
                className="w-full min-h-[200px] bg-[#2a2a2a] text-zinc-100 rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-2 font-medium">
                Tags
              </label>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Digite uma nova tag"
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
              Salvar alterações
            </button>
          </form>
        </>
      )}
    </div>
  );
}
