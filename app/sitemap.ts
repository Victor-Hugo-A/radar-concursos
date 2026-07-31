import type { MetadataRoute } from "next";
import { anosDisponiveis, bancas, concursos, estados, orgaos, regioes, slugify } from "@/lib/public-data";

const baseUrl = "https://www.organizaconcursos.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/concursos",
    "/inscricoes-abertas",
    "/concursos-previstos",
    "/calendario",
    "/regioes",
    "/orgaos",
    "/bancas",
    "/conteudos-de-estudo",
    "/provas-anteriores",
    "/noticias",
    "/sobre",
    "/contato",
    "/fontes-oficiais",
    "/politica-de-privacidade",
    "/termos-de-uso",
    "/politica-de-cookies",
    "/lgpd"
  ];

  const concursoRoutes = concursos.flatMap((concurso) => [
    `/concursos/${concurso.slug}`,
    `/concursos/${concurso.slug}/estudos`,
    ...(concurso.conteudoProgramatico ?? []).map((materia) => `/concursos/${concurso.slug}/estudos/${materia.slug}`)
  ]);

  const locationRoutes = [...regioes, ...estados].map((item) => `/concursos/${slugify(item)}`);
  const yearRoutes = anosDisponiveis.flatMap((ano) => [`/concursos/${ano}`, `/concursos/${ano}/abertos`, `/concursos/${ano}/previstos`, `/concursos/${ano}/finalizados`]);
  const bancaRoutes = bancas.map((banca) => `/bancas/${banca.slug}`);
  const orgaoRoutes = orgaos.map((orgao) => `/orgaos/${orgao.slug}`);

  return [...staticRoutes, ...concursoRoutes, ...locationRoutes, ...yearRoutes, ...bancaRoutes, ...orgaoRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
