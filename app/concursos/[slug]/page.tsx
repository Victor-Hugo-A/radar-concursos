import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, FileText, GraduationCap, LinkIcon } from "lucide-react";
import { BackLink } from "@/components/back-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConcursoCard } from "@/components/concurso-card";
import { StatusBadge } from "@/components/status-badge";
import { TrustBadge } from "@/components/trust-badge";
import { ConcursosExplorer } from "@/features/public/concursos-explorer";
import { anosDisponiveis, concursos, etapaPrevisaoMeta, formatCurrency, formatDate, getConcursoBySlug, regioes, salaryRange, slugify } from "@/lib/public-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const concurso = getConcursoBySlug(slug);
  if (concurso) {
    return {
      title: concurso.titulo,
      description: `${concurso.orgao}. Ano ${concurso.ano}. Fonte: ${concurso.fonteVerificada ? "oficial verificada" : "não oficial/demonstração"}.`,
      openGraph: {
        title: concurso.titulo,
        description: concurso.resumo
      }
    };
  }

  const localidade = getLocalidade(slug);
  if (localidade) {
    return {
      title: `Concursos em ${localidade.label}`,
      description: `Consulte concursos públicos cadastrados para ${localidade.label}.`
    };
  }

  return { title: "Concurso não encontrado" };
}

export default async function ConcursoDetalhePage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ returnTo?: string }> }) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const concurso = getConcursoBySlug(slug);
  const returnTo = query.returnTo ?? "/concursos";

  const year = Number(slug);
  if (!concurso && Number.isInteger(year) && anosDisponiveis.includes(year)) {
    const items = concursos.filter((item) => item.ano === year);
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Concursos", href: "/concursos" }, { label: String(year) }]} />
        <div className="mb-5 flex flex-wrap gap-2">
          <BackLink fallbackHref="/concursos" label="Voltar para concursos" />
          <Link href={`/concursos/${year}/abertos`} className="btn-secondary">Abertos</Link>
          <Link href={`/concursos/${year}/previstos`} className="btn-secondary">Previstos</Link>
          <Link href={`/concursos/${year}/finalizados`} className="btn-secondary">Finalizados</Link>
        </div>
        <ConcursosExplorer title={`Concursos ${year}`} initialItems={items} initialValues={{ ano: String(year) }} />
      </main>
    );
  }

  if (!concurso) {
    const localidade = getLocalidade(slug);
    if (!localidade) notFound();

    const items = concursos.filter((item) => item.regiao === localidade.label || item.estado === localidade.label || item.municipio === localidade.label || item.abrangencia === localidade.label);
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Concursos", href: "/concursos" }, { label: localidade.label }]} />
        <BackLink fallbackHref="/regioes" label="Voltar para regiões" />
        <h1 className="mt-5 text-3xl font-bold text-slate-950 dark:text-white">Concursos em {localidade.label}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Listagem pública com dados cadastrados para navegação por localidade.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.length ? items.map((item) => <ConcursoCard key={item.id} concurso={item} returnHref={`/concursos/${slug}`} />) : <p className="rounded-lg border border-dashed border-slate-300 p-6 text-sm">Nenhum concurso encontrado para esta localidade.</p>}
        </div>
      </main>
    );
  }

  const relacionados = concursos
    .filter((item) => item.slug !== concurso.slug && (item.estado === concurso.estado || item.orgaoSlug === concurso.orgaoSlug || item.bancaSlug === concurso.bancaSlug))
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Concursos", href: returnTo }, ...(concurso.estado ? [{ label: concurso.estado, href: `/concursos/${slugify(concurso.estado)}` }] : []), { label: concurso.orgao }]} />
      <div className="mb-5 flex flex-wrap gap-2">
        <BackLink fallbackHref={returnTo} label="Voltar para resultados" />
        {concurso.estado ? <Link href={`/concursos/${slugify(concurso.estado)}`} className="btn-secondary">Mesmo estado</Link> : null}
        <Link href={`/orgaos/${concurso.orgaoSlug}`} className="btn-secondary">Mesmo órgão</Link>
        {concurso.bancaSlug ? <Link href={`/bancas/${concurso.bancaSlug}`} className="btn-secondary">Mesma banca</Link> : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.4fr]">
        <article className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={concurso.status} />
              <TrustBadge value={concurso.confiabilidade} />
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-950 dark:text-white md:text-4xl">{concurso.titulo}</h1>
            <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{concurso.resumo}</p>
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
              As informações apresentadas possuem caráter informativo. Antes de realizar qualquer inscrição, confirme os dados no edital, no site oficial do órgão e na página da banca organizadora.
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Info title="Órgão" value={concurso.orgao} />
            <Info title="Banca organizadora" value={concurso.banca ?? "A definir"} />
            <Info title="Abrangência" value={concurso.abrangencia} />
            <Info title="Localidade" value={[concurso.municipio, concurso.estado, concurso.regiao].filter(Boolean).join(" - ") || "Nacional"} />
            <Info title="Ano" value={String(concurso.ano)} />
            <Info title="Modalidade" value={concurso.modalidade === "processo_seletivo_temporario" ? "Processo seletivo temporário" : "Concurso público"} />
            <Info title="Vagas" value={`${concurso.vagas ?? "A definir"}${concurso.cadastroReserva ? " + cadastro reserva" : ""}`} />
            <Info title="Escolaridade" value={concurso.escolaridades.join(", ")} />
            <Info title="Jornada" value={concurso.jornada ?? "Não informado"} />
            <Info title="Remuneração" value={salaryRange(concurso)} />
            <Info title="Taxa de inscrição" value={formatCurrency(concurso.taxaInscricao)} />
            <Info title="Inscrições" value={`${formatDate(concurso.inicioInscricoes)} até ${formatDate(concurso.fimInscricoes)}`} />
            <Info title="Pagamento" value={formatDate(concurso.dataLimitePagamento)} />
            <Info title="Prova prevista" value={formatDate(concurso.dataProva)} />
            <Info title="Última verificação" value={formatDate(concurso.ultimaVerificacaoEm)} />
            <Info title="Atualizado no sistema" value={formatDate(concurso.atualizadoEm)} />
          </section>

          {concurso.etapaPrevisao ? (
            <section className="card">
              <h2 className="text-2xl font-bold">Concurso previsto</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Etapa atual: <strong>{etapaPrevisaoMeta[concurso.etapaPrevisao]}</strong>.</p>
              <p className="mt-2 rounded-lg bg-sky-50 p-3 text-sm text-sky-900 dark:bg-sky-950 dark:text-sky-100">Este concurso ainda não possui edital publicado. As informações apresentadas são baseadas apenas no registro interno de demonstração e podem sofrer alterações.</p>
            </section>
          ) : null}

          <section className="card">
            <h2 className="text-2xl font-bold">Cargos disponíveis</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {concurso.cargos.map((cargo) => <span key={cargo} className="badge">{cargo}</span>)}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <List title="Requisitos" items={concurso.requisitos ?? ["Requisitos não informados."]} />
            <List title="Etapas da seleção" items={concurso.etapas ?? ["Etapas não informadas."]} />
          </section>

          <section className="card">
            <h2 className="text-2xl font-bold">Linha do tempo</h2>
            <ol className="mt-5 grid gap-4">
              {concurso.historico.map((evento) => (
                <li key={`${evento.data}-${evento.etapa}`} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{formatDate(evento.data)} • {evento.etapa}</p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{evento.descricao}</p>
                      <p className="mt-2 text-xs text-slate-500">Fonte: {evento.fonte}</p>
                    </div>
                    <TrustBadge value={evento.confiabilidade} />
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </article>

        <aside className="space-y-4">
          <section className="card">
            <h2 className="text-lg font-bold">Origem e fontes</h2>
            <div className="mt-4 grid gap-3">
              {concurso.fontes.map((fonte) => (
                <div key={`${fonte.nome}-${fonte.tipo}`} className="rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-950">
                  <p className="font-bold">{fonte.nome}</p>
                  <p className="text-slate-600 dark:text-slate-300">Tipo: {fonte.tipo.replaceAll("_", " ")}</p>
                  <p className="text-slate-600 dark:text-slate-300">Consultado em: {formatDate(fonte.consultadoEm)}</p>
                  {fonte.observacao ? <p className="mt-1 text-xs text-slate-500">{fonte.observacao}</p> : null}
                  {fonte.url ? <a href={fonte.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm font-bold text-emerald-700">Abrir fonte <ExternalLink className="ml-1 h-4 w-4" /></a> : null}
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2 className="text-lg font-bold">Links oficiais</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Antes de se inscrever, você deve ser direcionado apenas para site oficial do órgão ou da banca.</p>
            <div className="mt-4 grid gap-2">
              <OfficialLink href={concurso.siteOficialUrl} label="Site oficial do órgão" />
              <OfficialLink href={concurso.bancaOficialUrl} label="Site oficial da banca" />
              <OfficialLink href={concurso.editalUrl} label="Edital" />
              <OfficialLink href={concurso.inscricaoUrl} label="Inscrição oficial" primary />
              <OfficialLink href={concurso.comunicadosUrl} label="Comunicados e retificações" />
            </div>
          </section>

          <section className="card">
            <div className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-emerald-700" /><h2 className="text-lg font-bold">Preparação</h2></div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Veja matérias, assuntos, estratégia e cronograma demonstrativo para este concurso.</p>
            <Link href={`/concursos/${concurso.slug}/estudos`} className="btn-primary mt-4 w-full">Acessar conteúdo de estudo</Link>
          </section>
        </aside>
      </div>

      {relacionados.length ? (
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Concursos relacionados</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relacionados.map((item) => <ConcursoCard key={item.id} concurso={item} returnHref={returnTo} />)}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <dt className="text-sm font-bold text-slate-950 dark:text-white">{title}</dt>
      <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">{value}</dd>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="card">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
        {items.map((item) => <li key={item} className="flex gap-2"><FileText className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />{item}</li>)}
      </ul>
    </section>
  );
}

function OfficialLink({ href, label, primary }: { href?: string; label: string; primary?: boolean }) {
  if (!href) {
    return <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-500 dark:border-slate-700"><LinkIcon className="h-4 w-4" />Não informado: {label}</span>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={primary ? "btn-primary" : "btn-secondary"}>
      {label} <ExternalLink className="h-4 w-4" />
    </a>
  );
}

function getLocalidade(slug: string) {
  const locations = [
    ...regioes.map((label) => ({ label, slug: slugify(label) })),
    ...Array.from(new Set(concursos.flatMap((item) => [item.estado, item.municipio].filter(Boolean) as string[]))).map((label) => ({ label, slug: slugify(label) }))
  ];
  return locations.find((item) => item.slug === slug);
}
