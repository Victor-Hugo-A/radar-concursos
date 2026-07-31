import type { Metadata } from "next";
import Link from "next/link";
import { bancas } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Provas anteriores",
  description: "Consulte provas anteriores disponíveis por banca organizadora em dados demonstrativos."
};

export default function ProvasAnterioresPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Provas anteriores</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Lista demonstrativa. Em produção, esta área deverá apontar somente para fontes oficiais ou materiais com permissão de uso.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bancas.map((banca) => (
          <section key={banca.slug} className="card">
            <h2 className="text-xl font-bold">{banca.nome}</h2>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
              {banca.provasAnteriores.map((prova) => <li key={prova}>{prova}</li>)}
            </ul>
            <Link href={`/bancas/${banca.slug}`} className="btn-secondary mt-4">Ver banca</Link>
          </section>
        ))}
      </div>
    </main>
  );
}
