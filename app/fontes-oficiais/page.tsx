import type { Metadata } from "next";
import { ExternalLink, SearchCheck, ShieldCheck } from "lucide-react";
import { TrustBadge } from "@/components/trust-badge";
import { fontesConfiaveisPrioritarias, fontesOficiaisMonitoradas, formatDate, getFonteMonitoradaTipoLabel } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Fontes oficiais e radar de concursos",
  description: "Portais oficiais monitorados para localizar concursos públicos, editais, autorizações e processos seletivos."
};

export default function FontesOficiaisPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-emerald-700" />
              <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Fontes oficiais e radar de concursos</h1>
            </div>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
              Esta área concentra portais institucionais que podem ser usados para localizar concursos, autorizações, editais e processos seletivos. Um concurso só deve ser marcado como oficial quando a informação vier de órgão público, banca organizadora, diário oficial ou canal institucional confiável.
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
            <strong>{fontesOficiaisMonitoradas.length} fontes cadastradas</strong>
            <p className="mt-1">Atualizadas manualmente nesta fase.</p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="card">
          <h2 className="text-xl font-bold">Critérios de fonte confiável</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            {fontesConfiaveisPrioritarias.map((item) => (
              <li key={item} className="flex gap-2">
                <SearchCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold">Como publicar um concurso no sistema</h2>
          <ol className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>1.</strong> Localizar a informação em fonte institucional.</li>
            <li><strong>2.</strong> Cadastrar o link da fonte, tipo, data de consulta e observação.</li>
            <li><strong>3.</strong> Classificar corretamente: autorizado, previsto, edital publicado, inscrições abertas ou outro status.</li>
            <li><strong>4.</strong> Liberar botão de inscrição somente quando houver URL oficial da banca ou do órgão.</li>
          </ol>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Portais monitorados</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Use estes links para validar concursos antes de publicá-los como informação oficial.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {fontesOficiaisMonitoradas.map((fonte) => (
            <article key={fonte.id} className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center gap-2">
                <TrustBadge value={fonte.confiabilidade} />
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700 dark:bg-slate-950 dark:text-slate-200">{fonte.cobertura}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-950 dark:text-white">{fonte.nome}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{fonte.escopo}</p>
              <dl className="mt-4 grid gap-2 text-sm">
                <div>
                  <dt className="font-semibold">Tipo</dt>
                  <dd className="text-slate-600 dark:text-slate-300">{getFonteMonitoradaTipoLabel(fonte.tipo)}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Última consulta</dt>
                  <dd className="text-slate-600 dark:text-slate-300">{formatDate(fonte.ultimaConsultaEm)}</dd>
                </div>
              </dl>
              <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600 dark:bg-slate-950 dark:text-slate-300">{fonte.observacao}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {fonte.termosSugeridos.map((termo) => (
                  <span key={termo} className="badge">{termo}</span>
                ))}
              </div>
              <a href={fonte.url} target="_blank" rel="noreferrer" className="btn-secondary mt-5 w-full">
                Abrir fonte oficial <ExternalLink className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
        Não faça scraping automático sem verificar regras, permissões, robots.txt, termos de uso e limites da fonte. Quando houver API oficial ou dados abertos, prefira a integração documentada.
      </section>
    </main>
  );
}
