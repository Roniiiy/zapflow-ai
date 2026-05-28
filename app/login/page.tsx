"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../src/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      document.cookie = "zapflow_auth=true; path=/; max-age=604800";
      document.cookie = "vokre_auth=true; path=/; max-age=604800";

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] px-6 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/80 p-8">
        <p className="text-sm font-semibold text-cyan-400">Vokre</p>

        <h1 className="mt-2 text-4xl font-bold">Entrar</h1>

        <p className="mt-3 text-slate-400">
          Faça login para acessar sua central.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Não possui conta?{" "}
          <Link href="/cadastro" className="text-cyan-300 hover:text-cyan-200">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}