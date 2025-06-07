"use client";

import { login } from "@/api/login";
import { setCookie } from "@/server-actions/cookies";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const LoginFormSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
});

type LoginForm = z.infer<typeof LoginFormSchema>;

export default function LoginPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setCookie({ key: "@token", value: data });
      toast.success("Logado com sucesso.");
      router.refresh();
      router.push("/")
    },
    onError: (data: any) => {
      toast.error(data.message);
    },
  });

  async function handleCreateAccount(data: LoginForm) {
    await mutateAsync(data);
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1e1e1e] rounded-md shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">
          Bem-vindo de volta
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleCreateAccount)}
        >
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
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  className={`w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition ${
                    errors.email ? "ring-red-500" : "focus:ring-violet-500"
                  }`}
                  {...field}
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
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition ${
                    errors.password ? "ring-red-500" : "focus:ring-violet-500"
                  }`}
                  {...field}
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
            Entrar
          </button>
        </form>

        <p className="text-center text-zinc-400 text-sm">
          Ainda não tem conta?{" "}
          <a
            href="/register"
            className="text-violet-500 hover:underline cursor-pointer"
          >
            Crie uma aqui
          </a>
        </p>
      </div>
    </div>
  );
}
