"use client";
export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1e1e1e] rounded-md shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">
          Criar Conta
        </h1>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="name"
              className="block text-zinc-400 mb-1 font-medium"
            >
              Nome completo
            </label>
            <input
              type="text"
              id="name"
              placeholder="Seu nome"
              required
              className="w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-zinc-400 mb-1 font-medium"
            >
              Nome de usuário
            </label>
            <input
              type="text"
              id="username"
              placeholder="Seu usuário"
              required
              className="w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-zinc-400 mb-1 font-medium"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              required
              className="w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-zinc-400 mb-1 font-medium"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              className="w-full bg-[#2a2a2a] text-zinc-100 rounded-md px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
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
