import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LGPD",
  description: "Informações sobre direitos dos titulares e tratamento de dados na plataforma pública."
};

export default function LgpdPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 lg:px-6">
      <section className="card space-y-4">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">LGPD</h1>
        <p className="leading-7 text-slate-600 dark:text-slate-300">A plataforma foi reformulada para consulta pública sem área restrita. O tratamento de dados pessoais deve ser limitado ao necessário para navegação, segurança e melhoria do serviço.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">Em produção, recomenda-se manter registro de bases legais, política de retenção, canal do controlador e documentação de serviços externos.</p>
      </section>
    </main>
  );
}
