import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description: "Canal de contato demonstrativo do Organiza Concursos."
};

export default function ContatoPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 lg:px-6">
      <section className="card space-y-4">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Contato</h1>
        <p className="leading-7 text-slate-600 dark:text-slate-300">Esta é uma página demonstrativa. Em produção, informe um canal oficial para solicitações, correções, privacidade e contato editorial.</p>
        <div className="rounded-lg bg-slate-50 p-4 text-sm dark:bg-slate-950">
          <p className="font-bold">Sugestão para produção</p>
          <p className="mt-1 text-slate-600 dark:text-slate-300">contato@organizaconcursos.example</p>
        </div>
      </section>
    </main>
  );
}
