"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { BrandMark } from "@/components/brand-mark";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/concursos", label: "Concursos" },
  { href: "/inscricoes-abertas", label: "Inscrições abertas" },
  { href: "/concursos-previstos", label: "Previstos" },
  { href: "/calendario", label: "Calendário" },
  { href: "/regioes", label: "Regiões" },
  { href: "/conteudos-de-estudo", label: "Estudos" }
];

const secondaryItems = [
  { href: "/orgaos", label: "Órgãos" },
  { href: "/bancas", label: "Bancas" },
  { href: "/fontes-oficiais", label: "Radar oficial" },
  { href: "/provas-anteriores", label: "Provas anteriores" },
  { href: "/noticias", label: "Notícias" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" }
];

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (href: string) =>
    clsx(
      "rounded-lg px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-200",
      pathname === href || (href !== "/" && pathname.startsWith(href))
        ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-100"
        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
    );

  const links = [...navItems, ...secondaryItems];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <BrandMark size="sm" />
          <div className="min-w-0">
            <p className="truncate font-bold text-slate-950 dark:text-white">Organiza Concursos</p>
            <p className="truncate text-xs text-slate-500">Consulta pública de concursos</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={linkClass(item.href)}>{item.label}</Link>)}
          <div className="group relative">
            <button className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900">Mais</button>
            <div className="invisible absolute right-0 top-full grid w-56 gap-1 rounded-lg border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-950">
              {secondaryItems.map((item) => <Link key={item.href} href={item.href} className={linkClass(item.href)}>{item.label}</Link>)}
            </div>
          </div>
        </nav>

        <button className="btn-secondary px-3 xl:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <button
        className={clsx("fixed inset-0 z-40 bg-slate-950/50 xl:hidden", open ? "block" : "hidden")}
        onClick={() => setOpen(false)}
        aria-label="Fechar menu"
      />
      <aside
        className={clsx(
          "fixed right-0 top-0 z-50 h-dvh w-[min(88vw,22rem)] overflow-y-auto border-l border-slate-200 bg-white p-4 shadow-xl transition-transform xl:hidden dark:border-slate-800 dark:bg-slate-950",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BrandMark size="sm" />
            <span className="font-bold">Menu</span>
          </div>
          <button className="btn-secondary px-2" onClick={() => setOpen(false)} aria-label="Fechar menu">
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="grid gap-1">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
}
