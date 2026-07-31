"use client";

import Link from "next/link";
import { ExternalLink, MapPin, School, UsersRound } from "lucide-react";
import { Concurso, formatDate, salaryRange } from "@/lib/public-data";
import { StatusBadge } from "@/components/status-badge";
import { TrustBadge } from "@/components/trust-badge";

export function ConcursoCard({ concurso, returnHref }: { concurso: Concurso; returnHref?: string }) {
  const detailHref = returnHref ? `/concursos/${concurso.slug}?returnTo=${encodeURIComponent(returnHref)}` : `/concursos/${concurso.slug}`;
  const firstSource = concurso.fontes[0];
  const officialAction =
    concurso.inscricaoUrl
      ? { href: concurso.inscricaoUrl, label: "Inscrição oficial" }
      : concurso.editalUrl
        ? { href: concurso.editalUrl, label: "Acessar edital" }
        : concurso.siteOficialUrl
          ? { href: concurso.siteOficialUrl, label: "Página oficial" }
          : null;

  function rememberScroll() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("concursos:lastScroll", String(window.scrollY));
    }
  }

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={concurso.status} />
          <TrustBadge value={concurso.confiabilidade} />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-snug text-slate-950 dark:text-white">{concurso.titulo}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{concurso.orgao}</p>
          </div>
          <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            {concurso.vagas ? `${concurso.vagas} vagas` : "Vagas a definir"}
          </div>
        </div>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /><span>{concurso.estado ?? concurso.regiao ?? concurso.abrangencia}</span></div>
        <div className="flex gap-2"><UsersRound className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /><span>{concurso.cargos.slice(0, 2).join(", ")}</span></div>
        <div className="flex gap-2"><School className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /><span>{concurso.escolaridades.join(", ")}</span></div>
        <div><dt className="font-semibold">Banca</dt><dd className="text-slate-600 dark:text-slate-300">{concurso.banca ?? "A definir"}</dd></div>
        <div><dt className="font-semibold">Inscrições</dt><dd className="text-slate-600 dark:text-slate-300">{formatDate(concurso.inicioInscricoes)} até {formatDate(concurso.fimInscricoes)}</dd></div>
        <div><dt className="font-semibold">Prova</dt><dd className="text-slate-600 dark:text-slate-300">{formatDate(concurso.dataProva)}</dd></div>
        <div><dt className="font-semibold">Ano</dt><dd className="text-slate-600 dark:text-slate-300">{concurso.ano}</dd></div>
        <div><dt className="font-semibold">Modalidade</dt><dd className="text-slate-600 dark:text-slate-300">{concurso.modalidade === "processo_seletivo_temporario" ? "Processo seletivo temporário" : "Concurso público"}</dd></div>
        <div className="sm:col-span-2"><dt className="font-semibold">Remuneração</dt><dd className="text-slate-600 dark:text-slate-300">{salaryRange(concurso)}</dd></div>
      </dl>

      <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        <p><strong>Fonte:</strong> {firstSource?.nome ?? "Fonte não informada"}</p>
        <p><strong>Última verificação:</strong> {formatDate(concurso.ultimaVerificacaoEm)}</p>
        <p><strong>Atualizado no sistema:</strong> {formatDate(concurso.atualizadoEm)}</p>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
        <Link href={detailHref} onClick={rememberScroll} className="btn-primary flex-1">Ver detalhes</Link>
        {officialAction ? (
          <a href={officialAction.href} target="_blank" rel="noreferrer" className="btn-secondary flex-1">
            {officialAction.label} <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <span className="inline-flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-500 dark:border-slate-700">
            Link oficial não informado
          </span>
        )}
      </div>
    </article>
  );
}
