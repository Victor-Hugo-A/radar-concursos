import type { Metadata } from "next";
import Link from "next/link";
import { concursos, orgaos } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Órgãos públicos",
  description: "Consulte órgãos públicos, áreas de atuação, concursos abertos, previstos, finalizados e histórico de seleções."
};

export default function OrgaosPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Órgãos públicos</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Páginas públicas demonstrativas para navegar por órgão responsável.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {orgaos.map((orgao) => (
          <Link key={orgao.slug} href={`/orgaos/${orgao.slug}`} className="card hover:border-emerald-300">
            <h2 className="text-xl font-bold">{orgao.nome}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{orgao.descricao}</p>
            <p className="mt-4 text-sm font-semibold">{concursos.filter((item) => item.orgaoSlug === orgao.slug).length} concursos no histórico demonstrativo</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
