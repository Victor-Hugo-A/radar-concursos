"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { X } from "lucide-react";

type Toast = { id: number; type: "success" | "error" | "info" | "warning"; message: string };
type ToastContextType = { notify: (type: Toast["type"], message: string) => void };

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value = useMemo(
    () => ({
      notify(type: Toast["type"], message: string) {
        const id = Date.now();
        setToasts((current) => [...current, { id, type, message }]);
        window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 4000);
      }
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-[min(92vw,360px)] flex-col gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold capitalize">{toast.type}</p>
                <p className="text-slate-600 dark:text-slate-300">{toast.message}</p>
              </div>
              <button onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))} aria-label="Fechar aviso">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast deve ser usado dentro de ToastProvider.");
  return context;
}
