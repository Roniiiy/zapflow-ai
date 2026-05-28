"use client";

import { useState } from "react";
import Sidebar from "../../src/components/Sidebar";
import AuthGuard from "../../src/components/AuthGuard";

export default function AutomacoesPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function testAI() {
    if (!message) return;

    setLoading(true);

    try {
      const res = await fetch("/api/ai-preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await res.json();

      setResponse(data.reply);
    } catch (error) {
      console.error(error);

      alert("Erro ao gerar resposta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#020817] text-white">
        <Sidebar />

        <main className="flex-1 p-6 pt-20 lg:ml-[260px] lg:p-10">
          <span className="text-sm font-semibold text-cyan-400">
            Automação IA
          </span>

          <h1 className="mt-2 text-4xl font-bold lg:text-5xl">
            Teste da IA
          </h1>

          <p className="mt-4 text-gray-400">
            Simule respostas automáticas do WhatsApp.
          </p>

          <div className="mt-10 rounded-3xl border border-[#1e293b] bg-[#081028] p-6 lg:p-8">
            <h2 className="mb-6 text-2xl font-bold lg:text-3xl">
              Simular conversa
            </h2>

            <textarea
              placeholder="Digite a mensagem do cliente..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-40 w-full rounded-2xl border border-[#1e293b] bg-[#020817] p-4 outline-none focus:border-cyan-400"
            />

            <button
              onClick={testAI}
              disabled={loading}
              className="mt-6 rounded-2xl bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Gerando..." : "Gerar resposta"}
            </button>

            {response && (
              <div className="mt-8 rounded-2xl border border-[#1e293b] bg-[#020817] p-6">
                <h3 className="mb-4 text-xl font-bold text-cyan-400">
                  Resposta da IA
                </h3>

                <p className="whitespace-pre-line text-gray-300">
                  {response}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}