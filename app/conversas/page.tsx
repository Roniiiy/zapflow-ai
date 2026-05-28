"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../src/components/Sidebar";
import AuthGuard from "../../src/components/AuthGuard";

type Message = {
  id: string;
  client: string;
  content: string;
  direction: string;
  createdAt: string;
};

export default function ConversasPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [client, setClient] = useState("Cliente Teste");
  const [content, setContent] = useState("");

  async function loadMessages() {
    const response = await fetch("/api/messages");
    const data = await response.json();
    setMessages(data);
  }

  async function sendMessage(direction: "sent" | "received") {
    if (!client || !content) return;

    await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client, content, direction }),
    });

    if (direction === "received") {
      await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: client,
          phone: "Não informado",
          tag: "Conversa",
          notes: content,
          status: "Novo Lead",
        }),
      });
    }

    setContent("");
    loadMessages();
  }

  async function generateAIResponse() {
    if (!client || !content) return;

    const response = await fetch("/api/ai-preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: content }),
    });

    const data = await response.json();

    await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client,
        content: data.reply,
        direction: "sent",
      }),
    });

    setContent("");
    loadMessages();
  }

  async function deleteMessage(id: string) {
    const confirmDelete = confirm("Deseja excluir esta mensagem?");

    if (!confirmDelete) return;

    await fetch("/api/messages", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadMessages();
  }

  const clients = Array.from(
    new Set(messages.map((message) => message.client))
  );

  const filteredMessages = messages.filter(
    (message) => message.client === client
  );

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#020617] text-white">
        <Sidebar />

        <main className="flex min-h-screen flex-col pt-20 lg:ml-[260px] lg:pt-0">
          <div className="grid flex-1 grid-cols-1 lg:grid-cols-[320px_1fr]">
            <aside className="border-b border-slate-800 bg-slate-950/70 p-5 lg:border-b-0 lg:border-r">
              <h1 className="text-3xl font-bold">Conversas</h1>

              <p className="mt-2 text-sm text-slate-400">
                Histórico simulado do WhatsApp.
              </p>

              <input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Nome do cliente"
                className="mt-6 w-full rounded-xl border border-slate-700 bg-[#020617] px-4 py-3 outline-none focus:border-cyan-400"
              />

              <div className="mt-6 max-h-72 space-y-3 overflow-auto lg:max-h-[calc(100vh-220px)]">
                {clients.map((item) => (
                  <button
                    key={item}
                    onClick={() => setClient(item)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      client === item
                        ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                        : "border-slate-800 bg-[#020617] text-slate-300 hover:border-cyan-400/40"
                    }`}
                  >
                    <p className="font-semibold">{item}</p>

                    <p className="mt-1 text-xs text-slate-500">
                      {messages.filter((msg) => msg.client === item).length}{" "}
                      mensagens
                    </p>
                  </button>
                ))}

                {clients.length === 0 && (
                  <p className="text-sm text-slate-500">
                    Nenhuma conversa criada ainda.
                  </p>
                )}
              </div>
            </aside>

            <section className="flex min-h-[70vh] flex-col lg:h-screen">
              <header className="border-b border-slate-800 p-5">
                <p className="text-sm text-cyan-400">Conversa com</p>

                <h2 className="text-2xl font-bold">
                  {client || "Novo cliente"}
                </h2>
              </header>

              <div className="flex-1 space-y-4 overflow-auto p-5 lg:p-6">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.direction === "sent"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl border p-4 lg:max-w-[70%] ${
                        message.direction === "sent"
                          ? "border-cyan-400/20 bg-cyan-400 text-black"
                          : "border-slate-800 bg-slate-900 text-white"
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm">
                        {message.content}
                      </p>

                      <button
                        onClick={() => deleteMessage(message.id)}
                        className={`mt-3 text-xs ${
                          message.direction === "sent"
                            ? "text-slate-800"
                            : "text-red-300"
                        }`}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}

                {filteredMessages.length === 0 && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 text-slate-400">
                    Nenhuma mensagem nesta conversa ainda.
                  </div>
                )}
              </div>

              <div className="border-t border-slate-800 p-5">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Digite uma mensagem do cliente ou sua resposta..."
                  className="h-24 w-full rounded-2xl border border-slate-700 bg-[#020617] px-4 py-3 outline-none focus:border-cyan-400"
                />

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    onClick={() => sendMessage("received")}
                    className="rounded-xl border border-slate-700 px-5 py-3 text-slate-300 transition hover:bg-slate-800"
                  >
                    Simular recebida
                  </button>

                  <button
                    onClick={() => sendMessage("sent")}
                    className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300"
                  >
                    Enviar resposta
                  </button>

                  <button
                    onClick={generateAIResponse}
                    className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
                  >
                    Gerar resposta IA
                  </button>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Ao simular uma mensagem recebida, um lead é criado
                  automaticamente no CRM.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}