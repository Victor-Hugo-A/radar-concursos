import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClipboardCheck, Lightbulb, Repeat2, Target, type LucideIcon } from "lucide-react";
import { getConcursoBySlug } from "@/lib/public-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const concurso = getConcursoBySlug((await params).slug);
  return {
    title: concurso ? `Plano de estudos - ${concurso.titulo}` : "Plano de estudos",
    description: concurso ? `Conteúdo programático, matérias, cronograma e estratégia demonstrativa para ${concurso.titulo}.` : "Plano de estudos demonstrativo."
  };
}

export default async function EstudosPage({ params }: { params: Promise<{ slug: string }> }) {
  const concurso = getConcursoBySlug((await params).slug);
  if (!concurso) notFound();
  const materias = [...(concurso.conteudoProgramatico ?? [])].sort((a, b) => a.ordemRecomendada - b.ordemRecomendada);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <Link href={`/concursos/${concurso.slug}`} className="text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">Voltar para detalhes do concurso</Link>
      <section className="mt-5 rounded-lg bg-slate-950 p-6 text-white md:p-8">
        <h1 className="text-3xl font-bold">Preparação para {concurso.titulo}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Plano demonstrativo baseado no conteúdo previsto, com ordem sugerida, revisões, simulados e observações de estudo. Recomendações analíticas não substituem o edital oficial.</p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Info icon={Target} title="Estratégia recomendada" text="Comece por matérias de alta recorrência, avance para específicas e reserve blocos semanais para questões." />
        <Info icon={ClipboardCheck} title="Plano semanal" text="5 dias de conteúdo, 1 dia de revisão e 1 simulado curto com correção do caderno de erros." />
        <Info icon={Repeat2} title="Revisões" text="Revisão em 24h, 7 dias e 21 dias para tópicos marcados como recorrentes." />
        <Info icon={Lightbulb} title="Dia da prova" text="Priorize questões conhecidas, controle tempo por bloco e reserve os minutos finais para conferência." />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.42fr]">
        <div className="card">
          <h2 className="text-2xl font-bold">Conteúdo programático organizado</h2>
          <div className="mt-5 grid gap-4">
            {materias.map((materia) => (
              <Link key={materia.slug} href={`/concursos/${concurso.slug}/estudos/${materia.slug}`} className="rounded-lg border border-slate-200 p-4 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:hover:bg-emerald-950">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Ordem sugerida {materia.ordemRecomendada}</p>
                    <h3 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">{materia.nome}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{materia.estrategia}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge">Importância {materia.importancia}</span>
                    <span className="badge">Dificuldade {materia.dificuldade}</span>
                    <span className="badge">{materia.questoesEstimadas ?? "?"} questões</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="grid gap-4">
          <section className="card">
            <h2 className="text-xl font-bold">Cronograma</h2>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
              <li>Semana 1: Português + Raciocínio Lógico</li>
              <li>Semana 2: Informática + Legislação</li>
              <li>Semana 3: Conhecimentos específicos</li>
              <li>Semana 4: Simulados e revisão intensiva</li>
            </ul>
          </section>
          <section className="card">
            <h2 className="text-xl font-bold">Perfil da banca</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Quando a banca estiver definida, compare estilo de cobrança, recorrência e nível das provas anteriores.</p>
          </section>
          <section className="card">
            <h2 className="text-xl font-bold">Observação</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Toda estratégia desta página é estimativa demonstrativa baseada em organização de conteúdo, não informação oficial.</p>
          </section>
        </aside>
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
