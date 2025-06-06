"use client";

import { useState } from "react";

export default function EditProfilePage() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Perfil atualizado!");
  }

  return (
    <main className="max-w-md mx-auto p-6 bg-[#1e1e1e] rounded-md shadow-lg mt-12">
      <h1 className="text-3xl font-bold text-white mb-6">Editar Perfil</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-5">
          <label className="block">
            <span className="text-zinc-300 mb-1 block">Nome completo</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md bg-[#2a2a2a] border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Seu nome completo"
              required
            />
          </label>

          <label className="block">
            <span className="text-zinc-300 mb-1 block">Nome de usuário</span>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-md bg-[#2a2a2a] border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Seu username"
              required
            />
          </label>

          <label className="block">
            <span className="text-zinc-300 mb-1 block">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md bg-[#2a2a2a] border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="seu@email.com"
              required
            />
          </label>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Alterar Senha</h2>

          <label className="block">
            <span className="text-zinc-300 mb-1 block">Senha atual</span>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full rounded-md bg-[#2a2a2a] border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="********"
            />
          </label>

          <label className="block">
            <span className="text-zinc-300 mb-1 block">Nova senha</span>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full rounded-md bg-[#2a2a2a] border border-zinc-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="********"
            />
          </label>

          <p className="text-zinc-500 text-sm">
            Para manter a senha atual, deixe os campos em branco.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 transition text-white font-semibold py-2 rounded-md"
        >
          Salvar alterações
        </button>
      </form>
    </main>
  );
}
