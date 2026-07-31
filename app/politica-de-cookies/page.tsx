import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de cookies do Organiza Concursos."
};

export default function PoliticaDeCookiesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 lg:px-6">
      <section className="card space-y-4">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Política de Cookies</h1>
        <p className="leading-7 text-slate-600 dark:text-slate-300">Na estrutura atual, não há conta de usuário e não há necessidade de cookies de acesso restrito. Cookies estritamente necessários podem ser usados para segurança, preferências técnicas e funcionamento básico.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">Caso sejam adicionados cookies de análise, publicidade ou personalização opcional, a aplicação deverá oferecer controles para aceitar, rejeitar ou configurar esses cookies antes do uso.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">Ferramentas externas futuras deverão ser listadas com finalidade, fornecedor, prazo de retenção e forma de desativação.</p>
      </section>
    </main>
  );
}
