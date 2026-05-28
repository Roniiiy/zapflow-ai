"use client";

import { useState } from "react";
import Sidebar from "../../src/components/Sidebar";

export default function AutomacoesPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  async function testAI() {
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
  }

  return (
    <div className="flex min-h-screen bg-[#020817] text-white">
      <Sidebar />

      <main className="flex-1 p-10 ml-[220px]">
        <span className="text-cyan-400 text-sm font-semibold">
          Automação IA
        </span>

        <h1 className="text-5xl font-bold mt-2">Teste da IA</h1>

        <p className="text-gray-400 mt-4">
          Simule respostas automáticas do WhatsApp.
        </p>

        <div className="mt-10 bg-[#081028] border border-[#1e293b] rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-6">
            Simular conversa
          </h2>

          <textarea
            placeholder="Digite a mensagem do cliente..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-40 bg-[#020817] border border-[#1e293b] rounded-2xl p-4 outline-none focus:border-cyan-400"
          />

          <button
            onClick={testAI}
            className="mt-6 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-8 py-4 rounded-2xl transition"
          >
            Gerar resposta
          </button>

          {response && (
            <div className="mt-8 bg-[#020817] border border-[#1e293b] rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">
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
  );
}