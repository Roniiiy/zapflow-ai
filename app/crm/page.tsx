"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../src/components/Sidebar";

type Lead = {
  id: string;
  name: string;
  phone: string;
  status: string;
  tag?: string | null;
  notes?: string | null;
};

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tag, setTag] = useState("WhatsApp");
  const [notes, setNotes] = useState("");
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");

  async function loadLeads() {
    const response = await fetch("/api/leads");
    const data = await response.json();
    setLeads(data);
  }

  async function createLead(event: React.FormEvent) {
    event.preventDefault();

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, tag, notes, status: "Novo Lead" }),
    });

    setName("");
    setPhone("");
    setTag("WhatsApp");
    setNotes("");
    loadLeads();
  }

  async function updateLead(event: React.FormEvent) {
    event.preventDefault();

    if (!editingLead) return;

    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingLead),
    });

    setEditingLead(null);
    loadLeads();
  }

  async function deleteLead(id: string) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este lead?");
    if (!confirmDelete) return;

    await fetch("/api/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadLeads();
  }

  const filteredLeads = leads.filter((lead) => {
    const searchLower = search.toLowerCase();

    return (
      lead.name.toLowerCase().includes(searchLower) ||
      lead.phone.toLowerCase().includes(searchLower) ||
      lead.status.toLowerCase().includes(searchLower) ||
      (lead.tag || "").toLowerCase().includes(searchLower)
    );
  });

  function exportLeadsToCSV() {
    const headers = ["Nome", "Telefone", "Status", "Tag", "Observações"];

    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.phone,
      lead.status,
      lead.tag || "",
      lead.notes || "",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((item) => `"${item}"`).join(";"))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "leads-zapflow.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <section className="min-h-screen p-6 pt-20 lg:ml-[260px] lg:p-8">
        <header className="mb-8">
          <p className="text-sm font-medium text-cyan-300">
            Gestão de Clientes
          </p>

          <h1 className="mt-2 text-4xl font-bold lg:text-5xl">
            CRM
          </h1>

          <p className="mt-2 text-slate-400">
            Cadastre, edite, busque, exporte e gerencie leads reais.
          </p>
        </header>

        <form
          onSubmit={createLead}
          className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 lg:p-6"
        >
          <h2 className="mb-5 text-2xl font-semibold">Novo Lead</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nome do cliente"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Telefone"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />

            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Origem ou tag"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />

            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Observações"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          <button className="mt-5 w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 md:w-auto">
            Salvar Lead
          </button>
        </form>

        {editingLead && (
          <form
            onSubmit={updateLead}
            className="mb-8 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-5 lg:p-6"
          >
            <h2 className="mb-5 text-2xl font-semibold text-cyan-300">
              Editar Lead
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                value={editingLead.name}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, name: e.target.value })
                }
                placeholder="Nome do cliente"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
              />

              <input
                value={editingLead.phone}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, phone: e.target.value })
                }
                placeholder="Telefone"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
              />

              <input
                value={editingLead.tag || ""}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, tag: e.target.value })
                }
                placeholder="Origem ou tag"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
              />

              <input
                value={editingLead.notes || ""}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, notes: e.target.value })
                }
                placeholder="Observações"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 md:flex-row">
              <button className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950">
                Salvar Alterações
              </button>

              <button
                type="button"
                onClick={() => setEditingLead(null)}
                className="rounded-xl border border-slate-700 px-6 py-3 text-slate-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, telefone, tag ou status..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-cyan-400"
          />

          <button
            onClick={exportLeadsToCSV}
            className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
          >
            Exportar Leads CSV
          </button>
        </div>

        <div className="mb-4 text-sm text-slate-400">
          Exibindo {filteredLeads.length} de {leads.length} leads.
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{lead.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">{lead.phone}</p>
                </div>

                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                  {lead.tag}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm text-slate-500">Status</p>

                <div className="mt-2 inline-block rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                  {lead.status}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm text-slate-500">Observações</p>

                <p className="mt-2 text-sm text-slate-300">
                  {lead.notes || "Sem observações."}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setEditingLead(lead)}
                  className="flex-1 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
                >
                  Editar
                </button>

                <button
                  onClick={() => deleteLead(lead.id)}
                  className="flex-1 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}