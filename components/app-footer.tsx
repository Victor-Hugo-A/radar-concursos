import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

const currentYear = new Date().getFullYear();

export function AppFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark size="sm" />
            <div>
              <p className="font-bold text-slate-950 dark:text-white">Organiza Concursos</p>
              <p className="text-xs text-slate-500">Consulta pública e preparação</p>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6">
            As informações apresentadas possuem caráter informativo. Consulte sempre o edital, o órgão responsável e a banca organizadora antes de realizar sua inscrição.
          </p>
          <p className="mt-3 text-xs text-slate-500">© {currentYear} Organiza Concursos. Não representamos oficialmente órgãos públicos ou bancas organizadoras.</p>
        </div>

        <nav className="grid gap-2">
          <h2 className="text-sm font-bold text-slate-950 dark:text-white">Concursos</h2>
          <Link href="/concursos" className="hover:text-emerald-700 dark:hover:text-emerald-300">Todos os concursos</Link>
          <Link href="/inscricoes-abertas" className="hover:text-emerald-700 dark:hover:text-emerald-300">Inscrições abertas</Link>
          <Link href="/concursos-previstos" className="hover:text-emerald-700 dark:hover:text-emerald-300">Concursos previstos</Link>
          <Link href="/calendario" className="hover:text-emerald-700 dark:hover:text-emerald-300">Calendário</Link>
        </nav>

        <nav className="grid gap-2">
          <h2 className="text-sm font-bold text-slate-950 dark:text-white">Navegação</h2>
          <Link href="/regioes" className="hover:text-emerald-700 dark:hover:text-emerald-300">Regiões</Link>
          <Link href="/orgaos" className="hover:text-emerald-700 dark:hover:text-emerald-300">Órgãos</Link>
          <Link href="/bancas" className="hover:text-emerald-700 dark:hover:text-emerald-300">Bancas</Link>
          <Link href="/conteudos-de-estudo" className="hover:text-emerald-700 dark:hover:text-emerald-300">Conteúdos de estudo</Link>
        </nav>

        <nav className="grid gap-2">
          <h2 className="text-sm font-bold text-slate-950 dark:text-white">Institucional</h2>
          <Link href="/sobre" className="hover:text-emerald-700 dark:hover:text-emerald-300">Sobre o projeto</Link>
          <Link href="/contato" className="hover:text-emerald-700 dark:hover:text-emerald-300">Contato</Link>
          <Link href="/fontes-oficiais" className="hover:text-emerald-700 dark:hover:text-emerald-300">Fontes oficiais</Link>
          <Link href="/politica-de-privacidade" className="hover:text-emerald-700 dark:hover:text-emerald-300">Política de Privacidade</Link>
          <Link href="/termos-de-uso" className="hover:text-emerald-700 dark:hover:text-emerald-300">Termos de Uso</Link>
          <Link href="/politica-de-cookies" className="hover:text-emerald-700 dark:hover:text-emerald-300">Política de Cookies</Link>
        </nav>
      </div>
    </footer>
  );
}
