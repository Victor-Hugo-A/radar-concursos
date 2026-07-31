import type { Metadata } from "next";
import Link from "next/link";
import { bancas, concursos } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Bancas organizadoras",
  description: "Consulte perfis de bancas organizadoras, características de cobrança, dicas de preparação e concursos relacionados."
};

export default function BancasPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Bancas organizadoras</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Perfis demonstrativos para entender estilos de cobrança e preparar seus estudos.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bancas.map((banca) => (
          <Link key={banca.slug} href={`/bancas/${banca.slug}`} className="card hover:border-emerald-300">
            <h2 className="text-xl font-bold">{banca.nome}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{banca.descricao}</p>
            <p className="mt-4 text-sm font-semibold">{concursos.filter((item) => item.bancaSlug === banca.slug).length} concursos relacionados</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
