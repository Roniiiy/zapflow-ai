"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    if (!email || !password) {
      alert("Preencha e-mail e senha.");
      return;
    }

    document.cookie = "zapflow_auth=true; path=/";
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/80 p-8">
        <p className="text-sm font-semibold text-cyan-400">
          ZapFlow AI
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Entrar
        </h1>

        <p className="mt-3 text-slate-400">
          Acesse o painel do seu funcionário IA.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            className="w-full rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            className="w-full rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
          />

          <button className="w-full rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-black transition hover:bg-cyan-300">
            Entrar no sistema
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Versão MVP local — autenticação real será adicionada depois.
        </p>
      </div>
    </div>
  );
}