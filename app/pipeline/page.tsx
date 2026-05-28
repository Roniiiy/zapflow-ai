"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../src/components/Sidebar";
import AuthGuard from "../../src/components/AuthGuard";

type Lead = {
  id: string;
  name: string;
  phone: string;
  status: string;
  tag?: string | null;
};

const columns = [
  "Novo Lead",
  "Atendimento",
  "Orçamento",
  "Negociação",
  "Fechado",
];

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  async function loadLeads() {
    const response = await fetch("/api/leads");
    const data = await response.json();
    setLeads(data);
  }

  async function moveLead(id: string, status: string) {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    loadLeads();
  }

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#020617] text-white">
        <Sidebar />

        <main className="p-6 pt-20 lg:ml-[260px] lg:p-10">
          <p className="text-sm font-semibold text-cyan-400">
            Gestão Comercial
          </p>

          <h1 className="mt-2 text-4xl font-bold lg:text-5xl">
            Pipeline
          </h1>

          <p className="mt-3 text-slate-400">
            Gerencie o avanço dos leads no funil de vendas.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {columns.map((column) => (
              <div
                key={column}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4"
              >
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-bold">{column}</h2>

                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                    {leads.filter((lead) => lead.status === column).length}
                  </span>
                </div>

                <div className="space-y-4">
                  {leads
                    .filter((lead) => lead.status === column)
                    .map((lead) => (
                      <div
                        key={lead.id}
                        className="rounded-2xl border border-slate-800 bg-[#020617] p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold">{lead.name}</h3>

                            <p className="mt-1 text-sm text-slate-400">
                              {lead.phone}
                            </p>
                          </div>

                          <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-xs text-cyan-300">
                            {lead.tag || "Lead"}
                          </span>
                        </div>

                        <select
                          value={lead.status}
                          onChange={(e) => moveLead(lead.id, e.target.value)}
                          className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm outline-none focus:border-cyan-400"
                        >
                          {columns.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}