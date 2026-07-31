import type { Metadata } from "next";
import { CalendarioView } from "@/features/public/calendario-view";

export const metadata: Metadata = {
  title: "Calendário de concursos",
  description: "Calendário público com inscrições, pagamento, provas, gabaritos e resultados de concursos em dados de demonstração."
};

export default function CalendarioPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <CalendarioView />
    </main>
  );
}
