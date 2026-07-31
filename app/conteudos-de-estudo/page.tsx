import type { Metadata } from "next";
import Link from "next/link";
import { concursos, estudoConteudos } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Conteúdos de estudo",
  description: "Guias públicos de preparação para concursos, ciclos de estudo, revisões, simulados e análise de banca."
};

export default function ConteudosDeEstudoPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Conteúdos de estudo</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Materiais demonstrativos para organizar a preparação sem substituir o edital oficial.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {estudoConteudos.map((item) => <article key={item} className="card"><h2 className="text-xl font-bold">{item}</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Conteúdo preparado para orientar ciclos, revisões e simulados de forma geral.</p></article>)}
      </div>
      <section className="mt-8">
        <h2 className="text-2xl font-bold">Planos por concurso</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {concursos.map((concurso) => <Link key={concurso.slug} href={`/concursos/${concurso.slug}/estudos`} className="card hover:border-emerald-300">{concurso.titulo}</Link>)}
        </div>
      </section>
    </main>
  );
}
