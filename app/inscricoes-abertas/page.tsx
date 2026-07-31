import type { Metadata } from "next";
import { ConcursosExplorer } from "@/features/public/concursos-explorer";
import { concursos } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Concursos com inscrições abertas",
  description: "Veja concursos públicos de demonstração com inscrições abertas e filtre por localidade, banca, cargo, escolaridade e datas."
};

export default function InscricoesAbertasPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <ConcursosExplorer title="Concursos com inscrições abertas" initialItems={concursos.filter((item) => item.status === "inscricoes_abertas")} initialValues={{ status: "inscricoes_abertas" }} />
    </main>
  );
}
