"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Concurso,
  areasAtuacao,
  bancas,
  concursos,
  escolaridades,
  estados,
  regioes,
  statusMeta
} from "@/lib/public-data";
import { ConcursoCard } from "@/components/concurso-card";

type SortKey = "relevancia" | "data" | "salario" | "vagas" | "prazo";

type Filters = {
  q: string;
  status: string;
  regiao: string;
  estado: string;
  municipio: string;
  escolaridade: string;
  area: string;
  salario: string;
  vagas: string;
  banca: string;
  periodo: string;
  prova: string;
  tipo: string;
  modalidade: string;
  ano: string;
  sort: SortKey;
  page: string;
};

const initialFilters: Filters = {
  q: "",
  status: "",
  regiao: "",
  estado: "",
  municipio: "",
  escolaridade: "",
  area: "",
  salario: "",
  vagas: "",
  banca: "",
  periodo: "",
  prova: "",
  tipo: "",
  modalidade: "",
  ano: "",
  sort: "relevancia",
  page: "1"
};

const pageSize = 9;

function includesText(value: string | undefined, query: string) {
  return value?.toLowerCase().includes(query) ?? false;
}

function matchesSalary(value: number | undefined, range: string) {
  if (!range) return true;
  if (value === undefined) return false;
  if (range === "ate-3000") return value <= 3000;
  if (range === "3000-7000") return value >= 3000 && value <= 7000;
  return value > 7000;
}

function matchesVagas(value: number | undefined, range: string) {
  if (!range) return true;
  if (value === undefined) return false;
  if (range === "ate-50") return value <= 50;
  if (range === "50-200") return value >= 50 && value <= 200;
  return value > 200;
}

function matchesDate(value: string | undefined, range: string) {
  if (!range) return true;
  if (!value) return false;
  const date = new Date(`${value}T00:00:00Z`);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / 86400000);
  if (range === "30") return diffDays >= 0 && diffDays <= 30;
  if (range === "60") return diffDays >= 0 && diffDays <= 60;
  return diffDays >= 0 && diffDays <= 90;
}

function readFilters(params: URLSearchParams, initialValues: Partial<Filters>): Filters {
  return {
    ...initialFilters,
    ...initialValues,
    q: params.get("q") ?? initialValues.q ?? "",
    status: params.get("status") ?? initialValues.status ?? "",
    regiao: params.get("regiao") ?? initialValues.regiao ?? "",
    estado: params.get("estado") ?? initialValues.estado ?? "",
    municipio: params.get("municipio") ?? initialValues.municipio ?? "",
    escolaridade: params.get("escolaridade") ?? initialValues.escolaridade ?? "",
    area: params.get("area") ?? initialValues.area ?? "",
    salario: params.get("salario") ?? initialValues.salario ?? "",
    vagas: params.get("vagas") ?? initialValues.vagas ?? "",
    banca: params.get("banca") ?? initialValues.banca ?? "",
    periodo: params.get("periodo") ?? initialValues.periodo ?? "",
    prova: params.get("prova") ?? initialValues.prova ?? "",
    tipo: params.get("tipo") ?? initialValues.tipo ?? "",
    modalidade: params.get("modalidade") ?? initialValues.modalidade ?? "",
    ano: params.get("ano") ?? initialValues.ano ?? "",
    sort: ((params.get("sort") as SortKey | null) ?? initialValues.sort ?? "relevancia"),
    page: params.get("page") ?? initialValues.page ?? "1"
  };
}

export function ConcursosExplorer({ initialItems = concursos, title = "Concursos públicos", initialValues = {} }: { initialItems?: Concurso[]; title?: string; initialValues?: Partial<Filters> }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => readFilters(searchParams, initialValues));

  useEffect(() => {
    const saved = sessionStorage.getItem("concursos:lastScroll");
    if (saved) {
      window.scrollTo({ top: Number(saved), behavior: "instant" });
      sessionStorage.removeItem("concursos:lastScroll");
    }
  }, []);

  const municipios = useMemo(() => Array.from(new Set(concursos.map((item) => item.municipio).filter(Boolean))).sort() as string[], []);
  const anos = useMemo(() => Array.from(new Set(concursos.map((item) => item.ano))).sort((a, b) => b - a), []);

  const filtered = useMemo(() => {
    const query = filters.q.trim().toLowerCase();
    const items = initialItems.filter((concurso) => {
      const textMatch =
        !query ||
        includesText(concurso.titulo, query) ||
        includesText(concurso.orgao, query) ||
        includesText(concurso.banca, query) ||
        includesText(concurso.estado, query) ||
        includesText(concurso.municipio, query) ||
        includesText(concurso.regiao, query) ||
        concurso.cargos.some((cargo) => includesText(cargo, query)) ||
        concurso.escolaridades.some((item) => includesText(item, query)) ||
        concurso.palavrasChave.some((item) => includesText(item, query)) ||
        includesText(concurso.areaAtuacao, query) ||
        String(concurso.ano).includes(query);

      return (
        textMatch &&
        (!filters.status || concurso.status === filters.status) &&
        (!filters.regiao || concurso.regiao === filters.regiao) &&
        (!filters.estado || concurso.estado === filters.estado) &&
        (!filters.municipio || concurso.municipio === filters.municipio) &&
        (!filters.escolaridade || concurso.escolaridades.includes(filters.escolaridade)) &&
        (!filters.area || concurso.areaAtuacao === filters.area) &&
        matchesSalary(concurso.salarioMaximo ?? concurso.salarioMinimo, filters.salario) &&
        matchesVagas(concurso.vagas, filters.vagas) &&
        (!filters.banca || concurso.bancaSlug === filters.banca) &&
        matchesDate(concurso.fimInscricoes, filters.periodo) &&
        matchesDate(concurso.dataProva, filters.prova) &&
        (!filters.tipo || concurso.tipo === filters.tipo) &&
        (!filters.modalidade || concurso.modalidade === filters.modalidade) &&
        (!filters.ano || String(concurso.ano) === filters.ano)
      );
    });

    return [...items].sort((a, b) => {
      if (filters.sort === "salario") return (b.salarioMaximo ?? b.salarioMinimo ?? 0) - (a.salarioMaximo ?? a.salarioMinimo ?? 0);
      if (filters.sort === "vagas") return (b.vagas ?? 0) - (a.vagas ?? 0);
      if (filters.sort === "prazo") return (a.fimInscricoes ?? "9999-12-31").localeCompare(b.fimInscricoes ?? "9999-12-31");
      if (filters.sort === "data") return b.atualizadoEm.localeCompare(a.atualizadoEm);
      return Number(b.fonteVerificada) - Number(a.fonteVerificada) || b.atualizadoEm.localeCompare(a.atualizadoEm);
    });
  }, [filters, initialItems]);

  const page = Math.max(1, Number(filters.page) || 1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const returnHref = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const suggestions = filtered.length === 0 ? concursos.filter((item) => item.estado === filters.estado || item.regiao === filters.regiao || item.escolaridades.includes(filters.escolaridade)).slice(0, 3) : [];

  function update(name: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [name]: value, page: name === "page" ? value : "1" }));
  }

  function applyFilters(event?: FormEvent<HTMLFormElement>, override?: Partial<Filters>) {
    event?.preventDefault();
    const params = new URLSearchParams();
    const nextFilters = { ...filters, ...override };
    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value && !(key === "page" && value === "1") && !(key === "sort" && value === "relevancia")) params.set(key, value);
    });
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  function clearFilters() {
    setFilters(initialFilters);
    router.push(pathname, { scroll: false });
  }

  return (
    <section className="space-y-5">
      <form onSubmit={applyFilters} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-950 dark:text-white">{title}</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Pesquise por concurso, órgão, cargo, banca, localidade, escolaridade, área profissional, ano ou palavra-chave.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button className="btn-primary" type="submit"><Search className="h-4 w-4" />Pesquisar</button>
            <button className="btn-secondary" type="button" onClick={clearFilters}><X className="h-4 w-4" />Limpar filtros</button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-1.5 md:col-span-2 xl:col-span-4">
            <span>Pesquisa detalhada</span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input value={filters.q} onChange={(event) => update("q", event.target.value)} className="pl-9" placeholder="Ex.: IBGE, SEDES, técnico, Distrito Federal, superior" />
            </div>
          </label>

          <Select label="Situação" value={filters.status} onChange={(value) => update("status", value)} options={Object.entries(statusMeta).map(([value, meta]) => ({ value, label: meta.label }))} />
          <Select label="Região" value={filters.regiao} onChange={(value) => update("regiao", value)} options={regioes.map((item) => ({ value: item, label: item }))} />
          <Select label="Estado ou DF" value={filters.estado} onChange={(value) => update("estado", value)} options={estados.map((item) => ({ value: item, label: item }))} />
          <Select label="Município" value={filters.municipio} onChange={(value) => update("municipio", value)} options={municipios.map((item) => ({ value: item, label: item }))} />
          <Select label="Escolaridade" value={filters.escolaridade} onChange={(value) => update("escolaridade", value)} options={escolaridades.map((item) => ({ value: item, label: item }))} />
          <Select label="Área profissional" value={filters.area} onChange={(value) => update("area", value)} options={areasAtuacao.map((item) => ({ value: item, label: item }))} />
          <Select label="Faixa salarial" value={filters.salario} onChange={(value) => update("salario", value)} options={[{ value: "ate-3000", label: "Até R$ 3.000" }, { value: "3000-7000", label: "R$ 3.000 a R$ 7.000" }, { value: "acima-7000", label: "Acima de R$ 7.000" }]} />
          <Select label="Quantidade de vagas" value={filters.vagas} onChange={(value) => update("vagas", value)} options={[{ value: "ate-50", label: "Até 50 vagas" }, { value: "50-200", label: "50 a 200 vagas" }, { value: "mais-200", label: "Mais de 200 vagas" }]} />
          <Select label="Banca organizadora" value={filters.banca} onChange={(value) => update("banca", value)} options={bancas.map((item) => ({ value: item.slug, label: item.nome }))} />
          <Select label="Data de inscrição" value={filters.periodo} onChange={(value) => update("periodo", value)} options={[{ value: "30", label: "Encerra em até 30 dias" }, { value: "60", label: "Encerra em até 60 dias" }, { value: "90", label: "Encerra em até 90 dias" }]} />
          <Select label="Data da prova" value={filters.prova} onChange={(value) => update("prova", value)} options={[{ value: "30", label: "Prova em até 30 dias" }, { value: "60", label: "Prova em até 60 dias" }, { value: "90", label: "Prova em até 90 dias" }]} />
          <Select label="Esfera" value={filters.tipo} onChange={(value) => update("tipo", value)} options={[{ value: "federal", label: "Federal" }, { value: "estadual", label: "Estadual" }, { value: "municipal", label: "Municipal" }, { value: "distrital", label: "Distrital" }]} />
          <Select label="Modalidade" value={filters.modalidade} onChange={(value) => update("modalidade", value)} options={[{ value: "concurso_publico", label: "Concurso público" }, { value: "processo_seletivo_temporario", label: "Processo seletivo temporário" }]} />
          <Select label="Ano" value={filters.ano} onChange={(value) => update("ano", value)} options={anos.map((item) => ({ value: String(item), label: String(item) }))} />
          <Select label="Ordenar por" value={filters.sort} onChange={(value) => update("sort", value as SortKey)} options={[{ value: "relevancia", label: "Relevância" }, { value: "data", label: "Data de atualização" }, { value: "salario", label: "Maior salário" }, { value: "vagas", label: "Mais vagas" }, { value: "prazo", label: "Prazo de inscrição" }]} />
        </div>
      </form>

      <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <span className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" />{filtered.length} resultado(s) encontrado(s)</span>
        <span>Página {page} de {totalPages}</span>
      </div>

      {paged.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paged.map((concurso) => <ConcursoCard key={concurso.id} concurso={concurso} returnHref={returnHref} />)}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-lg font-bold">Nenhum concurso localizado</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Não há registro validado para os termos informados. Ajuste a pesquisa ou limpe os filtros.</p>
          {suggestions.length ? (
            <div className="mt-5 grid gap-3 text-left md:grid-cols-3">
              {suggestions.map((item) => <ConcursoCard key={item.id} concurso={item} returnHref={returnHref} />)}
            </div>
          ) : null}
        </div>
      )}

      {filtered.length > pageSize ? (
        <div className="flex flex-wrap justify-center gap-2">
          <button className="btn-secondary" disabled={page <= 1} onClick={() => { const nextPage = String(page - 1); update("page", nextPage); applyFilters(undefined, { page: nextPage }); }}>Anterior</button>
          <button className="btn-secondary" disabled={page >= totalPages} onClick={() => { const nextPage = String(page + 1); update("page", nextPage); applyFilters(undefined, { page: nextPage }); }}>Próxima</button>
        </div>
      ) : null}
    </section>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) {
  return (
    <label className="space-y-1.5">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Todos</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
