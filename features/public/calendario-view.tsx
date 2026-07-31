"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { concursos, eventosCalendario, formatDate, regioes } from "@/lib/public-data";

export function CalendarioView() {
  const [concursoSlug, setConcursoSlug] = useState("");
  const [regiao, setRegiao] = useState("");
  const [month, setMonth] = useState("");

  const filtered = useMemo(() => {
    return eventosCalendario.filter((evento) => {
      const concurso = concursos.find((item) => item.slug === evento.concursoSlug);
      return (
        (!concursoSlug || evento.concursoSlug === concursoSlug) &&
        (!regiao || concurso?.regiao === regiao) &&
        (!month || evento.data.startsWith(month))
      );
    });
  }, [concursoSlug, month, regiao]);

  return (
    <section className="space-y-5">
      <div className="card">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Calendário de concursos</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Acompanhe inscrições, pagamento, locais de prova, gabaritos e resultados em dados de demonstração.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <label className="space-y-1.5">
            <span>Concurso</span>
            <select value={concursoSlug} onChange={(event) => setConcursoSlug(event.target.value)}>
              <option value="">Todos</option>
              {concursos.map((item) => <option key={item.slug} value={item.slug}>{item.titulo}</option>)}
            </select>
          </label>
          <label className="space-y-1.5">
            <span>Região</span>
            <select value={regiao} onChange={(event) => setRegiao(event.target.value)}>
              <option value="">Todas</option>
              {regioes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="space-y-1.5">
            <span>Mês</span>
            <input type="month" value={month} onChange={(event) => setMonth(event.target.value)} />
          </label>
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.length ? filtered.map((evento) => {
          const concurso = concursos.find((item) => item.slug === evento.concursoSlug);
          return (
            <article key={evento.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{evento.titulo}</p>
                  <h2 className="mt-1 font-bold text-slate-950 dark:text-white">{concurso?.titulo}</h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{concurso?.regiao ?? "Nacional"}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-lg font-bold">{formatDate(evento.data)}</p>
                  <Link href={`/concursos/${evento.concursoSlug}`} className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Ver concurso</Link>
                </div>
              </div>
            </article>
          );
        }) : <p className="rounded-lg border border-dashed border-slate-300 p-6 text-sm">Nenhum evento encontrado para os filtros selecionados.</p>}
      </div>
    </section>
  );
}
