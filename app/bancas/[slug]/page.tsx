import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConcursoCard } from "@/components/concurso-card";
import { bancas, concursos, getBancaBySlug } from "@/lib/public-data";

export async function generateStaticParams() {
  return bancas.map((banca) => ({ slug: banca.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const banca = getBancaBySlug((await params).slug);
  return {
    title: banca ? banca.nome : "Banca organizadora",
    description: banca ? `${banca.nome}: estilo das questões, dificuldade, características recorrentes e concursos relacionados.` : "Perfil de banca organizadora."
  };
}

export default async function BancaPage({ params }: { params: Promise<{ slug: string }> }) {
  const banca = getBancaBySlug((await params).slug);
  if (!banca) notFound();
  const relacionados = concursos.filter((item) => item.bancaSlug === banca.slug);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <section className="card">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">{banca.nome}</h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{banca.descricao}</p>
      </section>
      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <Info title="Estilo das questões" items={[banca.estilo]} />
        <Info title="Nível de dificuldade" items={[banca.dificuldade]} />
        <Info title="Características recorrentes" items={banca.caracteristicas} />
        <Info title="Dicas de preparação" items={banca.dicas} />
        <Info title="Provas anteriores disponíveis" items={banca.provasAnteriores} />
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-bold">Concursos relacionados</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {relacionados.map((concurso) => <ConcursoCard key={concurso.id} concurso={concurso} />)}
        </div>
      </section>
    </main>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="card">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}
