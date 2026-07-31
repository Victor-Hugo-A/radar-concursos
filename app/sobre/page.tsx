import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a proposta pública do Organiza Concursos."
};

export default function SobrePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 lg:px-6">
      <section className="card space-y-4">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Sobre o Organiza Concursos</h1>
        <p className="leading-7 text-slate-600 dark:text-slate-300">O Organiza Concursos é uma proposta de plataforma pública para consulta, acompanhamento e preparação para concursos públicos.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">A aplicação foi reformulada para não exigir conta de usuário. O objetivo é facilitar a descoberta de oportunidades e organizar as informações de editais, bancas, órgãos e conteúdos de estudo.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">Os dados atuais são fictícios e servem apenas para validação de layout e estrutura.</p>
      </section>
    </main>
  );
}
