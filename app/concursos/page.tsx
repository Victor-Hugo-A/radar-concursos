import type { Metadata } from "next";
import { ConcursosExplorer } from "@/features/public/concursos-explorer";

export const metadata: Metadata = {
  title: "Concursos públicos",
  description: "Pesquise concursos públicos por órgão, cargo, banca, estado, município, região, escolaridade, salário, vagas e situação."
};

export default async function ConcursosPage({ searchParams }: { searchParams: Promise<{ q?: string; escolaridade?: string }> }) {
  const params = await searchParams;
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <ConcursosExplorer initialValues={{ q: params.q ?? "", escolaridade: params.escolaridade ?? "" }} />
    </main>
  );
}
