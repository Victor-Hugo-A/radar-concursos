import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso da plataforma pública Organiza Concursos."
};

export default function TermosDeUsoPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 lg:px-6">
      <section className="card space-y-4">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Termos de Uso</h1>
        <p className="leading-7 text-slate-600 dark:text-slate-300">O Organiza Concursos apresenta informações públicas e demonstrativas sobre concursos, bancas, órgãos, calendário e preparação.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">As informações exibidas possuem caráter informativo. Antes de realizar inscrição, consulte sempre edital, órgão responsável e banca organizadora em fontes oficiais.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">A plataforma não representa oficialmente órgãos públicos, bancas organizadoras ou instituições governamentais.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">Dados de exemplo não devem ser usados para decisões reais de inscrição ou preparação.</p>
      </section>
    </main>
  );
}
