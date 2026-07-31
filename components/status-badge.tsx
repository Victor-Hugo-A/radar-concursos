import { ConcursoStatus, statusMeta } from "@/lib/public-data";

const toneClasses = {
  emerald: "bg-emerald-50 text-emerald-800 ring-emerald-100 dark:bg-emerald-950 dark:text-emerald-100 dark:ring-emerald-900",
  amber: "bg-amber-50 text-amber-800 ring-amber-100 dark:bg-amber-950 dark:text-amber-100 dark:ring-amber-900",
  sky: "bg-sky-50 text-sky-800 ring-sky-100 dark:bg-sky-950 dark:text-sky-100 dark:ring-sky-900",
  violet: "bg-violet-50 text-violet-800 ring-violet-100 dark:bg-violet-950 dark:text-violet-100 dark:ring-violet-900",
  rose: "bg-rose-50 text-rose-800 ring-rose-100 dark:bg-rose-950 dark:text-rose-100 dark:ring-rose-900",
  slate: "bg-slate-100 text-slate-800 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700"
};

export function StatusBadge({ status }: { status: ConcursoStatus }) {
  const meta = statusMeta[status];
  const Icon = meta.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold ring-1 ${toneClasses[meta.tone as keyof typeof toneClasses]}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {meta.label}
    </span>
  );
}
