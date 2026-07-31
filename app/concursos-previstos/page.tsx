import type { Metadata } from "next";
import { ConcursosExplorer } from "@/features/public/concursos-explorer";
import { concursos } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Concursos previstos",
  description: "Acompanhe concursos previstos em dados de demonstração e prepare-se antes da publicação do edital."
};

export default function ConcursosPrevistosPage() {
  const plannedStatuses = ["solicitado", "em_estudo", "autorizado", "comissao_formada", "banca_definida", "previsto"];
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <ConcursosExplorer title="Concursos previstos" initialItems={concursos.filter((item) => plannedStatuses.includes(item.status))} />
    </main>
  );
}
