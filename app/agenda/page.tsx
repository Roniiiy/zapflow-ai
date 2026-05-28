"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../src/components/Sidebar";
import AuthGuard from "../../src/components/AuthGuard";

interface Appointment {
  id: string;
  client: string;
  service: string;
  date: string;
  time: string;
  status: string;
}

export default function AgendaPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [client, setClient] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  async function loadAppointments() {
    const response = await fetch("/api/appointments");
    const data = await response.json();
    setAppointments(data);
  }

  async function createAppointment() {
    if (!client || !service || !date || !time) return;

    await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client, service, date, time }),
    });

    setClient("");
    setService("");
    setDate("");
    setTime("");
    loadAppointments();
  }

  async function rescheduleAppointment(id: string) {
    if (!newDate || !newTime) return;

    await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, date: newDate, time: newTime }),
    });

    setEditingId("");
    setNewDate("");
    setNewTime("");
    loadAppointments();
  }

  async function deleteAppointment(id: string) {
    const confirmDelete = confirm(
      "Tem certeza que deseja excluir este agendamento?"
    );

    if (!confirmDelete) return;

    await fetch("/api/appointments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadAppointments();
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const searchLower = search.toLowerCase();

    return (
      appointment.client.toLowerCase().includes(searchLower) ||
      appointment.service.toLowerCase().includes(searchLower) ||
      appointment.date.toLowerCase().includes(searchLower) ||
      appointment.status.toLowerCase().includes(searchLower)
    );
  });

  function exportAppointmentsToCSV() {
    const headers = ["Cliente", "Serviço", "Data", "Horário", "Status"];

    const rows = filteredAppointments.map((appointment) => [
      appointment.client,
      appointment.service,
      appointment.date,
      appointment.time,
      appointment.status,
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
    link.download = "agendamentos-vokre.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#020617] text-white">
        <Sidebar />

        <main className="p-6 pt-20 lg:ml-[260px] lg:p-10">
          <p className="text-sm font-semibold text-cyan-400">
            Gestão de Agenda
          </p>

          <h1 className="mt-2 text-4xl font-bold lg:text-5xl">Agenda</h1>

          <p className="mt-3 text-slate-400">
            Gerencie compromissos, atendimentos e reagendamentos.
          </p>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/60 p-5 lg:p-6">
            <h2 className="mb-6 text-2xl font-bold lg:text-3xl">
              Novo Agendamento
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Cliente"
                className="rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
              />

              <input
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="Serviço"
                className="rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
              />

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
              />
            </div>

            <button
              onClick={createAppointment}
              className="mt-6 w-full rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-black transition hover:bg-cyan-300 md:w-auto"
            >
              Salvar Agendamento
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-4 md:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por cliente, serviço, data ou status..."
              className="flex-1 rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 outline-none focus:border-cyan-400"
            />

            <button
              onClick={exportAppointmentsToCSV}
              className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
            >
              Exportar Agenda CSV
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-400">
            Exibindo {filteredAppointments.length} de {appointments.length}{" "}
            agendamentos.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-2xl font-bold">{appointment.client}</h3>

                  <span className="w-fit rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
                    {appointment.status}
                  </span>
                </div>

                <p className="mt-4 text-slate-300">{appointment.service}</p>

                <div className="mt-6 space-y-2 text-sm text-slate-400">
                  <p>📅 {appointment.date}</p>
                  <p>⏰ {appointment.time}</p>
                </div>

                {editingId === appointment.id ? (
                  <div className="mt-5 space-y-3">
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-[#020617] px-4 py-3 outline-none focus:border-cyan-400"
                    />

                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-[#020617] px-4 py-3 outline-none focus:border-cyan-400"
                    />

                    <button
                      onClick={() => rescheduleAppointment(appointment.id)}
                      className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-black transition hover:bg-cyan-300"
                    >
                      Confirmar Reagendamento
                    </button>

                    <button
                      onClick={() => setEditingId("")}
                      className="w-full rounded-xl border border-slate-700 px-4 py-3 text-slate-300 transition hover:bg-slate-800"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingId(appointment.id)}
                      className="mt-5 w-full rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-cyan-300 transition hover:bg-cyan-400/20"
                    >
                      Reagendar
                    </button>

                    <button
                      onClick={() => deleteAppointment(appointment.id)}
                      className="mt-3 w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 transition hover:bg-red-500/20"
                    >
                      Excluir Agendamento
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}