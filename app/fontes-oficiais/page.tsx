import type { Metadata } from "next";
import { fontesConfiaveisPrioritarias } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Fontes oficiais e validação",
  description: "Arquitetura preparada para validação de concursos em fontes oficiais, sem scraping automático."
};

export default function FontesOficiaisPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 lg:px-6">
      <section className="card">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Fontes oficiais e validação</h1>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">A publicação de concursos reais deve priorizar órgãos públicos, bancas organizadoras, diários oficiais e portais institucionais. A estrutura atual não executa coleta automática nem scraping.</p>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-bold">Fontes priorizadas</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            {fontesConfiaveisPrioritarias.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold">Preparado para futura implementação</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Coleta por API quando houver fonte oficial disponível.</li>
            <li>Importação manual com campos obrigatórios de fonte e data de consulta.</li>
            <li>Painel administrativo separado da navegação pública.</li>
            <li>Rotina de atualização com validação antes da publicação.</li>
            <li>Bloqueio de publicação quando não houver fonte confiável.</li>
          </ul>
        </div>
      </section>
      <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
        Não implemente coleta automatizada por scraping sem verificar previamente regras, limitações, robots.txt, termos de uso e permissões do site de origem.
      </section>
    </main>
  );
}
