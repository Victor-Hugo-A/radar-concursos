import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/back-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConcursosExplorer } from "@/features/public/concursos-explorer";
import { anosDisponiveis, concursos, type ConcursoStatus } from "@/lib/public-data";

const recortes: Record<string, { title: string; statuses: ConcursoStatus[] }> = {
  abertos: { title: "Inscrições abertas", statuses: ["inscricoes_abertas"] },
  previstos: { title: "Previstos", statuses: ["solicitado", "em_estudo", "autorizado", "comissao_formada", "banca_definida", "previsto"] },
  finalizados: { title: "Finalizados", statuses: ["finalizado", "resultado_publicado", "prova_realizada"] },
  encerrados: { title: "Inscrições encerradas", statuses: ["inscricoes_encerradas"] },
  andamento: { title: "Em andamento", statuses: ["em_andamento", "prova_proxima"] },
  suspensos: { title: "Suspensos", statuses: ["suspenso"] },
  cancelados: { title: "Cancelados", statuses: ["cancelado"] }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string; recorte: string }> }): Promise<Metadata> {
  const { slug, recorte } = await params;
  const config = recortes[recorte];
  return {
    title: config ? `Concursos ${slug} - ${config.title}` : "Recorte anual de concursos",
    description: config ? `Concursos do ano ${slug}: ${config.title}.` : "Recorte anual de concursos."
  };
}

export default async function RecorteAnoPage({ params }: { params: Promise<{ slug: string; recorte: string }> }) {
  const { slug, recorte } = await params;
  const year = Number(slug);
  const config = recortes[recorte];
  if (!Number.isInteger(year) || !anosDisponiveis.includes(year) || !config) notFound();

  const items = concursos.filter((item) => item.ano === year && config.statuses.includes(item.status));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Concursos", href: "/concursos" }, { label: String(year), href: `/concursos/${year}` }, { label: config.title }]} />
      <div className="mb-5"><BackLink fallbackHref={`/concursos/${year}`} label="Voltar para o ano" /></div>
      <ConcursosExplorer title={`Concursos ${year} - ${config.title}`} initialItems={items} initialValues={{ ano: String(year) }} />
    </main>
  );
}
