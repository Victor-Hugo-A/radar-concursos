import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, MapPin, School, Search } from "lucide-react";
import { ConcursoCard } from "@/components/concurso-card";
import { atualizacoes, concursos, concursosPendentesValidacao, escolaridades, estados, estudoConteudos, eventosCalendario, formatDate, getCurrentYear, regioes, slugify } from "@/lib/public-data";

export default function HomePage() {
  const abertas = concursos.filter((item) => item.status === "inscricoes_abertas");
  const destaque = concursos.filter((item) => item.destaque);
  const prazoProximo = concursos.filter((item) => item.fimInscricoes).slice(0, 3);
  const maioresVagas = [...concursos].sort((a, b) => (b.vagas ?? 0) - (a.vagas ?? 0)).slice(0, 3);
  const previstos = concursos.filter((item) => item.status === "previsto");
  const recentes = [...concursos].sort((a, b) => b.atualizadoEm.localeCompare(a.atualizadoEm)).slice(0, 3);
  const currentYear = getCurrentYear();
  const anoAtual = concursos.filter((item) => item.ano === currentYear);

  return (
    <main>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-6 lg:py-20">
          <div>
            <span className="inline-flex rounded-md bg-emerald-400/10 px-3 py-1 text-sm font-bold text-emerald-200 ring-1 ring-emerald-300/20">Dados demonstrativos para validação do layout</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">Encontre concursos públicos na sua região e saiba exatamente como se preparar para cada prova.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Acompanhe oportunidades abertas, previstas, encerradas e em andamento. Consulte filtros por localidade, banca, cargo, escolaridade e datas importantes sem precisar criar conta.</p>
          <p className="mt-4 max-w-2xl rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-sm leading-6 text-amber-50">As informações apresentadas possuem caráter informativo. Antes de realizar qualquer inscrição, confirme os dados no edital, no site oficial do órgão e na página da banca organizadora.</p>
            <form action="/concursos" className="mt-8 flex max-w-2xl flex-col gap-3 rounded-lg bg-white p-2 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Pesquisar concursos</span>
                <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input name="q" className="border-0 pl-10 focus:ring-0" placeholder="Órgão, cargo, banca, estado ou palavra-chave" />
              </label>
              <button className="btn-primary px-6">Pesquisar</button>
            </form>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {abertas.slice(0, 1).map((concurso) => <ConcursoCard key={concurso.id} concurso={concurso} />)}
            <div className="grid gap-3 rounded-lg border border-white/10 bg-white/10 p-4">
              <h2 className="text-lg font-bold">Próximas datas importantes</h2>
              {eventosCalendario.slice(0, 3).map((evento) => (
                <div key={evento.id} className="flex items-center justify-between gap-3 rounded-lg bg-white/10 p-3 text-sm">
                  <span>{evento.titulo}</span>
                  <strong>{formatDate(evento.data)}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section title="Concursos com inscrições abertas" href="/inscricoes-abertas">
        {abertas.map((concurso) => <ConcursoCard key={concurso.id} concurso={concurso} />)}
      </Section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Concursos {currentYear}</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Recortes do ano atual por situação, obtidos dinamicamente pela data do sistema.</p>
            </div>
            <Link href={`/concursos/${currentYear}`} className="btn-secondary">Ver ano completo</Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Edital publicado", anoAtual.filter((item) => item.status === "edital_publicado").length],
              ["Inscrições abertas", anoAtual.filter((item) => item.status === "inscricoes_abertas").length],
              ["Provas previstas", anoAtual.filter((item) => item.dataProva).length],
              ["Em andamento", anoAtual.filter((item) => item.status === "em_andamento" || item.status === "prova_proxima").length],
              ["Finalizados", anoAtual.filter((item) => item.status === "finalizado").length],
              ["Suspensos", anoAtual.filter((item) => item.status === "suspenso").length],
              ["Cancelados", anoAtual.filter((item) => item.status === "cancelado").length],
              ["Resultados publicados", anoAtual.filter((item) => item.status === "resultado_publicado").length]
            ].map(([label, count]) => (
              <div key={label} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-bold">{count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="Concursos em destaque" href="/concursos">
        {destaque.map((concurso) => <ConcursoCard key={concurso.id} concurso={concurso} />)}
      </Section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-3 lg:px-6">
        <MiniList title="Prazos próximos" items={prazoProximo.map((item) => ({ href: `/concursos/${item.slug}`, label: item.titulo, meta: `Inscrições até ${formatDate(item.fimInscricoes)}` }))} />
        <MiniList title="Maior número de vagas" items={maioresVagas.map((item) => ({ href: `/concursos/${item.slug}`, label: item.titulo, meta: `${item.vagas ?? 0} vagas` }))} />
        <MiniList title="Adicionados recentemente" items={recentes.map((item) => ({ href: `/concursos/${item.slug}`, label: item.titulo, meta: `Atualizado em ${formatDate(item.atualizadoEm)}` }))} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-2 lg:px-6">
        <div className="card">
          <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-emerald-700" /><h2 className="text-xl font-bold">Buscar por estado ou região</h2></div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {[...regioes, ...estados].map((item) => <Link key={item} href={`/concursos/${slugify(item)}`} className="rounded-lg border border-slate-200 p-3 text-sm font-semibold hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:hover:bg-emerald-950">{item}</Link>)}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2"><School className="h-5 w-5 text-emerald-700" /><h2 className="text-xl font-bold">Buscar por escolaridade</h2></div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {escolaridades.map((item) => <Link key={item} href={`/concursos?escolaridade=${encodeURIComponent(item)}`} className="rounded-lg border border-slate-200 p-3 text-sm font-semibold hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:hover:bg-emerald-950">{item}</Link>)}
          </div>
        </div>
      </section>

      <Section title="Concursos previstos" href="/concursos-previstos">
        {previstos.map((concurso) => <ConcursoCard key={concurso.id} concurso={concurso} />)}
      </Section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="card">
          <h2 className="text-2xl font-bold">Concursos e fontes pendentes de validação</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Os itens abaixo não foram publicados como concursos confirmados. A estrutura está preparada para incluí-los somente após confirmação em fonte oficial.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {concursosPendentesValidacao.map((item) => (
              <div key={item.termo} className="rounded-lg border border-dashed border-slate-300 p-4 dark:border-slate-700">
                <p className="font-bold">{item.termo}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.categoria}</p>
                <p className="mt-2 text-xs text-slate-500">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-2 lg:px-6">
        <div className="card">
          <div className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-emerald-700" /><h2 className="text-xl font-bold">Calendário de concursos</h2></div>
          <div className="mt-5 grid gap-3">
            {eventosCalendario.slice(0, 5).map((evento) => <Link key={evento.id} href="/calendario" className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-950"><span>{evento.titulo}</span><strong>{formatDate(evento.data)}</strong></Link>)}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-700" /><h2 className="text-xl font-bold">Conteúdos de estudo em destaque</h2></div>
          <div className="mt-5 grid gap-3">
            {estudoConteudos.map((item) => <Link key={item} href="/conteudos-de-estudo" className="rounded-lg bg-slate-50 p-3 text-sm font-semibold hover:bg-emerald-50 dark:bg-slate-950 dark:hover:bg-emerald-950">{item}</Link>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="card">
          <h2 className="text-xl font-bold">Últimas atualizações</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {atualizacoes.map((item) => (
              <Link key={item.id} href="/noticias" className="rounded-lg border border-slate-200 p-4 hover:border-emerald-300 dark:border-slate-800">
                <p className="text-sm font-bold">{item.tipo}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.resumo}</p>
                <p className="mt-3 text-xs text-slate-500">{formatDate(item.data)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="rounded-lg bg-emerald-700 p-6 text-white md:p-8">
          <h2 className="text-2xl font-bold">Como utilizar a plataforma</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {["Pesquise oportunidades por localidade, cargo ou banca.", "Leia o resumo e confirme tudo nos links oficiais.", "Use a área de estudos para organizar a preparação por matéria."].map((item, index) => (
              <div key={item} className="rounded-lg bg-white/10 p-4">
                <span className="text-sm font-bold">Passo {index + 1}</span>
                <p className="mt-2 text-sm leading-6 text-emerald-50">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{title}</h2>
        <Link href={href} className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">Ver todos <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{children}</div>
    </section>
  );
}

function MiniList({ title, items }: { title: string; items: { href: string; label: string; meta: string }[] }) {
  return (
    <div className="card">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-lg bg-slate-50 p-3 hover:bg-emerald-50 dark:bg-slate-950 dark:hover:bg-emerald-950">
            <p className="text-sm font-bold">{item.label}</p>
            <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
