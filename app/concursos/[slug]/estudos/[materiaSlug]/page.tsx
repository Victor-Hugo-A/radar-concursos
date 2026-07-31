import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckSquare, History, Star, type LucideIcon } from "lucide-react";
import { getConcursoBySlug } from "@/lib/public-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; materiaSlug: string }> }): Promise<Metadata> {
  const { slug, materiaSlug } = await params;
  const concurso = getConcursoBySlug(slug);
  const materia = concurso?.conteudoProgramatico?.find((item) => item.slug === materiaSlug);
  return {
    title: materia && concurso ? `${materia.nome} - ${concurso.titulo}` : "Matéria do edital",
    description: materia ? `Assuntos, checklist, importância e estratégia para ${materia.nome}.` : "Conteúdo programático demonstrativo."
  };
}

export default async function MateriaPage({ params }: { params: Promise<{ slug: string; materiaSlug: string }> }) {
  const { slug, materiaSlug } = await params;
  const concurso = getConcursoBySlug(slug);
  const materia = concurso?.conteudoProgramatico?.find((item) => item.slug === materiaSlug);
  if (!concurso || !materia) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 lg:px-6">
      <Link href={`/concursos/${concurso.slug}/estudos`} className="text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">Voltar para estudos</Link>
      <section className="mt-5 card">
        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{concurso.titulo}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{materia.nome}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{materia.estrategia}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge">Importância {materia.importancia}</span>
          <span className="badge">Dificuldade {materia.dificuldade}</span>
          <span className="badge">Ordem sugerida {materia.ordemRecomendada}</span>
          <span className="badge">{materia.questoesEstimadas ?? "?"} questões estimadas</span>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Info icon={Star} title="Tema recorrente" text="Itens marcados como recorrentes são recomendações analíticas baseadas no tipo de conteúdo e histórico comum de bancas." />
        <Info icon={History} title="Relação com provas anteriores" text="Use provas anteriores da banca para confirmar frequência e nível real de cobrança." />
        <Info icon={CheckSquare} title="Checklist" text="Marque o tema como estudado somente após teoria, questões e revisão curta." />
      </section>

      <section className="mt-6 card">
        <h2 className="text-2xl font-bold">Tópicos e subtópicos</h2>
        <div className="mt-5 grid gap-3">
          {materia.assuntos.map((assunto) => (
            <div key={assunto.titulo} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 h-4 w-4" />
                <span>
                  <span className="font-bold text-slate-950 dark:text-white">{assunto.titulo}</span>
                  {assunto.recorrente ? <span className="ml-2 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-100">Recorrente</span> : null}
                  {assunto.subtitulos?.length ? <span className="mt-2 block text-sm text-slate-600 dark:text-slate-300">{assunto.subtitulos.join(", ")}</span> : null}
                </span>
              </label>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Info({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="card">
      <Icon className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
      <h2 className="mt-3 font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}
