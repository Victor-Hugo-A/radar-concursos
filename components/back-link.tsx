"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink({ fallbackHref = "/concursos", label = "Voltar" }: { fallbackHref?: string; label?: string }) {
  function goBack(event: React.MouseEvent<HTMLAnchorElement>) {
    if (window.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  }

  return (
    <Link href={fallbackHref} onClick={goBack} className="btn-secondary">
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
