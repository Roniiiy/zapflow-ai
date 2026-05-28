"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../src/components/Sidebar";

type DashboardData = {
  totalLeads: number;
  closedLeads: number;
  totalAppointments: number;
  totalMessages: number;
  conversionRate: string;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  async function loadDashboard() {
    const response = await fetch("/api/dashboard");
    const result = await response.json();
    setData(result);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Sidebar />

      <main className="p-6 pt-20 lg:ml-[260px] lg:p-10">
        <p className="text-sm font-semibold text-cyan-400">
          Visão Geral
        </p>

        <h1 className="mt-2 text-4xl font-bold lg:text-5xl">
          Dashboard
        </h1>

        <p className="mt-3 text-slate-400">
          Acompanhe os principais indicadores do ZapFlow AI em tempo real.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <p className="text-sm text-slate-400">
              Total de Leads
            </p>

            <h2 className="mt-3 text-4xl font-bold text-cyan-300">
              {data?.totalLeads ?? 0}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <p className="text-sm text-slate-400">
              Agendamentos
            </p>

            <h2 className="mt-3 text-4xl font-bold text-cyan-300">
              {data?.totalAppointments ?? 0}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <p className="text-sm text-slate-400">
              Mensagens
            </p>

            <h2 className="mt-3 text-4xl font-bold text-cyan-300">
              {data?.totalMessages ?? 0}
            </h2>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-emerald-300">
              Taxa de Conversão
            </p>

            <h2 className="mt-3 text-4xl font-bold text-emerald-300">
              {data?.conversionRate ?? "0"}%
            </h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <h2 className="text-2xl font-bold">
              Resumo Comercial
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#020617] p-4">
                <span className="text-sm text-slate-300">
                  Leads fechados
                </span>

                <span className="font-semibold text-emerald-300">
                  {data?.closedLeads ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#020617] p-4">
                <span className="text-sm text-slate-300">
                  Leads em aberto
                </span>

                <span className="font-semibold text-cyan-300">
                  {(data?.totalLeads ?? 0) -
                    (data?.closedLeads ?? 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
            <h2 className="text-2xl font-bold text-cyan-300">
              Status do MVP
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Seu SaaS já possui CRM, agenda, pipeline,
              mensagens, automações simuladas,
              configurações, dashboard em tempo real e
              sistema de IA para respostas automáticas.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-slate-900 px-4 py-2 text-xs text-cyan-300">
                CRM
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2 text-xs text-cyan-300">
                WhatsApp IA
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2 text-xs text-cyan-300">
                Pipeline
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2 text-xs text-cyan-300">
                Agenda
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2 text-xs text-cyan-300">
                Automação
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}