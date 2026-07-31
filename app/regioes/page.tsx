import type { Metadata } from "next";
import Link from "next/link";
import { concursos, estados, regioes, slugify } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Concursos por regiões e localidades",
  description: "Navegue por concursos em regiões, estados, Distrito Federal, municípios e oportunidades nacionais."
};

export default function RegioesPage() {
  const municipios = Array.from(new Set(concursos.map((item) => item.municipio).filter(Boolean))) as string[];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Regiões e localidades</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Encontre concursos por região, estado, Distrito Federal, município ou abrangência nacional.</p>
      <Section title="Regiões" items={regioes} />
      <Section title="Estados e Distrito Federal" items={estados} />
      <Section title="Municípios" items={municipios} />
    </main>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => <Link key={item} href={`/concursos/${slugify(item)}`} className="card hover:border-emerald-300">{item}</Link>)}
      </div>
    </section>
  );
}
