"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CadastroPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(event: React.FormEvent) {
    event.preventDefault();

    if (!name || !company || !email || !password) {
      alert("Preencha todos os campos.");
      return;
    }

    document.cookie = "zapflow_auth=true; path=/";
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] px-6 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/80 p-8">
        <p className="text-sm font-semibold text-cyan-400">ZapFlow AI</p>

        <h1 className="mt-2 text-4xl font-bold">Criar conta</h1>

        <p className="mt-3 text-slate-400">
          Cadastre sua empresa para acessar o painel.
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="w-full rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
          />

          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Nome da empresa"
            className="w-full rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
          />

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
            placeholder="Crie uma senha"
            className="w-full rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
          />

          <button className="w-full rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-black transition hover:bg-cyan-300">
            Criar conta
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Já tem conta?{" "}
          <Link href="/login" className="text-cyan-300 hover:text-cyan-200">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}