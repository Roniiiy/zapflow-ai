"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../src/components/Sidebar";

export default function ConfiguracoesPage() {
  const [companyName, setCompanyName] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [address, setAddress] = useState("");
  const [services, setServices] = useState("");
  const [autoMessage, setAutoMessage] = useState("");
  const [saved, setSaved] = useState(false);

  async function loadSettings() {
    const response = await fetch("/api/settings");
    const data = await response.json();

    if (data) {
      setCompanyName(data.companyName);
      setBusinessHours(data.businessHours);
      setAddress(data.address);
      setServices(data.services);
      setAutoMessage(data.autoMessage);
    }
  }

  async function saveSettings() {
    await fetch("/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName,
        businessHours,
        address,
        services,
        autoMessage,
      }),
    });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Sidebar />

      <main className="p-6 pt-20 lg:ml-[260px] lg:p-10">
        <p className="text-sm font-semibold text-cyan-400">
          Preferências do Sistema
        </p>

        <h1 className="mt-2 text-4xl font-bold lg:text-5xl">
          Configurações
        </h1>

        <p className="mt-3 text-slate-400">
          Configure as informações usadas pela IA no atendimento.
        </p>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/70 p-5 lg:p-6">
          <h2 className="mb-6 text-2xl font-bold lg:text-3xl">
            Dados da Empresa
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Nome da empresa"
              className="rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
            />

            <input
              value={businessHours}
              onChange={(e) => setBusinessHours(e.target.value)}
              placeholder="Horário de funcionamento"
              className="rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
            />

            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Endereço"
              className="rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
            />

            <input
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder="Serviços oferecidos"
              className="rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
            />
          </div>

          <textarea
            value={autoMessage}
            onChange={(e) => setAutoMessage(e.target.value)}
            placeholder="Mensagem automática inicial"
            className="mt-4 min-h-36 w-full rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
          />

          <button
            onClick={saveSettings}
            className="mt-6 w-full rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-black transition hover:bg-cyan-300 md:w-auto"
          >
            Salvar Configurações
          </button>

          {saved && (
            <p className="mt-4 text-sm text-emerald-400">
              Configurações salvas com sucesso.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}