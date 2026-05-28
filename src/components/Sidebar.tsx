"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../lib/supabase";

const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Conversas", href: "/conversas" },
  { label: "CRM", href: "/crm" },
  { label: "Pipeline", href: "/pipeline" },
  { label: "Agenda", href: "/agenda" },
  { label: "Automações", href: "/automacoes" },
  { label: "Configurações", href: "/configuracoes" },
];

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-50 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-white lg:hidden"
      >
        ☰
      </button>

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-800 bg-slate-950 p-6 text-white transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        style={{ width: "260px" }}
      >
        <div>
          <h1 className="text-3xl font-bold text-cyan-300">Vokre</h1>

          <p className="mt-2 text-sm text-slate-400">
            Central de vendas com IA
          </p>
        </div>

        <nav className="mt-10 flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
          <p className="text-sm font-semibold text-cyan-300">
            IA configurada
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Atendimento, CRM e automações conectados.
          </p>
        </div>

        <button
          onClick={logout}
          className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
        >
          Sair
        </button>
      </aside>
    </>
  );
}