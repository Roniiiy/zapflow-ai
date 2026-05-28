import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_40%)]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300">
            Funcionário IA para WhatsApp
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-black leading-tight lg:text-7xl">
            Automatize atendimento, CRM e vendas no WhatsApp com IA
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
            O ZapFlow AI centraliza atendimento, funil de vendas,
            agendamentos e automações em uma única plataforma moderna.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/login"
              className="rounded-2xl bg-cyan-400 px-8 py-5 font-semibold text-black transition hover:bg-cyan-300"
            >
              Entrar no sistema
            </Link>

            <a
              href="#features"
              className="rounded-2xl border border-slate-700 px-8 py-5 text-slate-300 transition hover:bg-slate-900"
            >
              Conhecer recursos
            </a>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div className="text-center">
          <p className="text-sm font-semibold text-cyan-400">
            Recursos principais
          </p>

          <h2 className="mt-4 text-4xl font-bold lg:text-5xl">
            Tudo que sua empresa precisa
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "CRM Inteligente",
              description:
                "Gerencie leads, clientes e oportunidades em tempo real.",
            },
            {
              title: "WhatsApp com IA",
              description:
                "Automatize respostas e acelere atendimentos.",
            },
            {
              title: "Pipeline Comercial",
              description:
                "Acompanhe cada etapa do funil de vendas.",
            },
            {
              title: "Agenda Integrada",
              description:
                "Controle compromissos e reagendamentos.",
            },
            {
              title: "Dashboard em Tempo Real",
              description:
                "Visualize métricas estratégicas do negócio.",
            },
            {
              title: "Automações",
              description:
                "Economize tempo eliminando tarefas repetitivas.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8"
            >
              <h3 className="text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-950/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-cyan-400">
              Atendimento inteligente
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Seu negócio funcionando 24 horas
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              O ZapFlow AI responde clientes automaticamente,
              organiza leads e ajuda sua empresa a vender mais,
              mesmo enquanto você dorme.
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8">
            <div className="space-y-5">
              <div className="rounded-2xl bg-slate-950 p-4">
                <p className="text-sm text-slate-300">
                  Cliente: Qual o valor?
                </p>
              </div>

              <div className="ml-auto max-w-sm rounded-2xl bg-cyan-400 p-4 text-black">
                <p className="text-sm">
                  Olá! Os valores variam conforme o serviço
                  desejado. Posso te explicar melhor 😊
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4">
                <p className="text-sm text-slate-300">
                  Cliente: Quero agendar
                </p>
              </div>

              <div className="ml-auto max-w-sm rounded-2xl bg-cyan-400 p-4 text-black">
                <p className="text-sm">
                  Claro! Me informe o melhor horário para você.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-sm font-semibold text-cyan-400">
          Comece agora
        </p>

        <h2 className="mt-4 text-4xl font-bold lg:text-5xl">
          Transforme seu WhatsApp em uma máquina de vendas
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-400">
          Centralize atendimento, automações e vendas em um
          único sistema moderno.
        </p>

        <Link
          href="/login"
          className="mt-10 inline-flex rounded-2xl bg-cyan-400 px-8 py-5 font-semibold text-black transition hover:bg-cyan-300"
        >
          Acessar plataforma
        </Link>
      </section>
    </main>
  );
}