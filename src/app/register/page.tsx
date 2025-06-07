"use client";

import { createAccount } from "@/api/create-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const CreateAccountFormSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

type CreateAccountForm = z.infer<typeof CreateAccountFormSchema>;

export default function RegisterPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountForm>({
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(CreateAccountFormSchema),
  });

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      toast.success("Conta criada com sucesso.");
      router.push("/login");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  async function handleCreateAccount(data: CreateAccountForm) {
    await mutateAsync(data);
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1e1e1e] rounded-md shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">
          Criar Conta
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleCreateAccount)}
        >
          <div>
            <label
              htmlFor="fullName"
              className="block text-zinc-400 mb-1 font-medium"
            >
              Nome completo
            </label>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="fullName"
                  placeholder="Seu nome"
                  className={`w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition ${
                    errors.fullName ? "ring-red-500" : "focus:ring-violet-500"
                  }`}
                />
              )}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-zinc-400 mb-1 font-medium"
            >
              Nome de usuário
            </label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="username"
                  placeholder="Seu usuário"
                  className={`w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition ${
                    errors.username ? "ring-red-500" : "focus:ring-violet-500"
                  }`}
                />
              )}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-zinc-400 mb-1 font-medium"
            >
              E-mail
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  className={`w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition ${
                    errors.email ? "ring-red-500" : "focus:ring-violet-500"
                  }`}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-zinc-400 mb-1 font-medium"
            >
              Senha
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition ${
                    errors.password ? "ring-red-500" : "focus:ring-violet-500"
                  }`}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-md font-semibold transition"
          >
            Criar Conta
          </button>
        </form>

        <p className="text-center text-zinc-400 text-sm">
          Já tem conta?{" "}
          <a
            href="/login"
            className="text-violet-500 hover:underline cursor-pointer"
          >
            Entre aqui
          </a>
        </p>
      </div>
    </div>
  );
}
