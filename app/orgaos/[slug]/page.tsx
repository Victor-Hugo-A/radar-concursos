import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConcursoCard } from "@/components/concurso-card";
import { concursos, getOrgaoBySlug, orgaos } from "@/lib/public-data";

export async function generateStaticParams() {
  return orgaos.map((orgao) => ({ slug: orgao.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const orgao = getOrgaoBySlug((await params).slug);
  return {
    title: orgao ? orgao.nome : "Órgão público",
    description: orgao ? `${orgao.nome}: área de atuação, concursos abertos, previstos, finalizados e histórico de seleções.` : "Perfil de órgão público."
  };
}

export default async function OrgaoPage({ params }: { params: Promise<{ slug: string }> }) {
  const orgao = getOrgaoBySlug((await params).slug);
  if (!orgao) notFound();
  const relacionados = concursos.filter((item) => item.orgaoSlug === orgao.slug);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <section className="card">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">{orgao.nome}</h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{orgao.descricao}</p>
        <p className="mt-3 text-sm font-bold">Área de atuação: {orgao.areaAtuacao}</p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Summary title="Abertos" count={relacionados.filter((item) => item.status === "inscricoes_abertas").length} />
        <Summary title="Previstos" count={relacionados.filter((item) => item.status === "previsto").length} />
        <Summary title="Finalizados" count={relacionados.filter((item) => item.status === "finalizado").length} />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">Histórico de seleções</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {relacionados.map((concurso) => <ConcursoCard key={concurso.id} concurso={concurso} />)}
        </div>
      </section>
    </main>
  );
}

function Summary({ title, count }: { title: string; count: number }) {
  return (
    <div className="card">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-bold">{count}</p>
    </div>
  );
}
