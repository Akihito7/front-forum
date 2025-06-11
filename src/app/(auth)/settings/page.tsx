"use client";

import { updatePassword } from "@/api/update-password";
import { updateUser } from "@/api/update-user";
import { getUser } from "@/server-actions/get-user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditFormSkeleton } from "@/components/settings/edit-form-skeleton";
import { BackButton } from "@/components/post/back-button";

const FormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().optional(),
  newPassword: z.string().optional(),
});

type FormDataProps = z.infer<typeof FormSchema>;

export default function EditProfilePage() {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormDataProps>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
      newPassword: "",
    },
  });

  const {
    mutateAsync: mutationUpdateUser,
    isPending: mutationUpdateIsLoading,
  } = useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      toast.success("Informações atualizadas com sucesso.");
      reset({ email: "", name: "", username: "" });
    },
    onError: () => {
      toast.error("Erro ao atualizar informações do perfil.");
    },
  });

  const {
    mutateAsync: mutationUpdatePassword,
    isPending: mutationUpdatePasswordIsLoading,
  } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Senha atualizada com sucesso.");
      reset({ password: "", newPassword: "" });
    },
    onError: () => {
      toast.error(
        "Erro ao atualizar a senha. Verifique se a senha atual está correta."
      );
    },
  });
  async function handleUpdateUser({
    email,
    name,
    username,
    password,
    newPassword,
  }: FormDataProps) {
    try {
      await mutationUpdateUser({ email, name, username });

      if (password && newPassword) {
        await mutationUpdatePassword({ password, newPassword });
      }
    } catch (error) {
    } finally {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  }
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  async function fetchUser() {
    if (user) {
      setValue("email", user.email);
      setValue("name", user.name);
      setValue("username", user.username);
    }
    return user;
  }

  useEffect(() => {
    fetchUser();
  }, [user, isLoading]);

  return (
    <main className="max-w-md mx-auto p-6 bg-[#1e1e1e] rounded-md shadow-lg mt-12 space-y-10">
      <BackButton />
      {isLoading && <EditFormSkeleton />}

      {!isLoading && (
        <>
          <h1 className="text-3xl font-bold text-white mb-6">Editar Perfil</h1>

          <form className="space-y-8" onSubmit={handleSubmit(handleUpdateUser)}>
            <div className="space-y-5">
              <label className="block">
                <span className="text-zinc-300 mb-1 block">Nome completo</span>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="w-full rounded-md bg-[#2a2a2a] border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="Seu nome completo"
                    />
                  )}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="text-zinc-300 mb-1 block">
                  Nome de usuário
                </span>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="w-full rounded-md bg-[#2a2a2a] border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="Seu nome de usuário"
                    />
                  )}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="text-zinc-300 mb-1 block">E-mail</span>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      {...field}
                      className="w-full rounded-md bg-[#2a2a2a] border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="seu@email.com"
                    />
                  )}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Alterar Senha
              </h2>

              <label className="block">
                <span className="text-zinc-300 mb-1 block">Senha atual</span>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      className="w-full rounded-md bg-[#2a2a2a] border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="********"
                    />
                  )}
                />
              </label>

              <label className="block">
                <span className="text-zinc-300 mb-1 block">Nova senha</span>
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      className="w-full rounded-md bg-[#2a2a2a] border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="********"
                    />
                  )}
                />
              </label>

              <p className="text-zinc-500 text-sm">
                Para manter a senha atual, deixe os campos de senha em branco.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 transition text-white font-semibold py-2 rounded-md"
              disabled={
                mutationUpdateIsLoading || mutationUpdatePasswordIsLoading
              }
            >
              Salvar alterações
            </button>
          </form>
        </>
      )}
    </main>
  );
}
