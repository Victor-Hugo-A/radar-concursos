import type { Metadata } from "next";
import "./globals.css";
import { AppFooter } from "@/components/app-footer";
import { PublicHeader } from "@/components/public-header";
import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.organizaconcursos.example"),
  title: {
    default: "Organiza Concursos - Concursos públicos, editais e preparação",
    template: "%s | Organiza Concursos"
  },
  description: "Encontre concursos públicos por região, órgão, banca, escolaridade e situação. Consulte calendário, atualizações e conteúdos de preparação.",
  openGraph: {
    title: "Organiza Concursos",
    description: "Consulta pública de concursos, editais, calendários e preparação para provas.",
    type: "website",
    locale: "pt_BR"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ToastProvider>
          <PublicHeader />
          <div className="min-h-screen">{children}</div>
          <AppFooter />
        </ToastProvider>
      </body>
    </html>
  );
}
