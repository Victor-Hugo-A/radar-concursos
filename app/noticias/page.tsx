import type { Metadata } from "next";
import Link from "next/link";
import { atualizacoes, formatDate, getConcursoTitle } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Notícias e atualizações",
  description: "Atualizações importantes de concursos: edital, retificação, prorrogação, prova, gabarito, resultado, suspensão e cancelamento."
};

export default function NoticiasPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 lg:px-6">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Notícias e atualizações</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Esta área lista apenas registros demonstrativos. Rumores não são apresentados como informação confirmada.</p>
      <div className="mt-6 grid gap-4">
        {atualizacoes.map((item) => (
          <article key={item.id} className="card">
            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{item.tipo} • {formatDate(item.data)}</p>
            <h2 className="mt-2 text-xl font-bold">{getConcursoTitle(item.concursoSlug)}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.resumo}</p>
            <p className="mt-3 text-sm text-slate-500">Fonte: {item.fonte}</p>
            {item.url ? <a href={item.url} target="_blank" rel="noreferrer" className="btn-secondary mt-4">Abrir comunicado oficial</a> : <Link href={`/concursos/${item.concursoSlug}`} className="btn-secondary mt-4">Ver concurso relacionado</Link>}
          </article>
        ))}
      </div>
    </main>
  );
}
