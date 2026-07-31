import { PrismaClient } from "@prisma/client";
import { bancas, concursos, eventosCalendario, orgaos } from "../lib/public-data";

const prisma = new PrismaClient() as unknown as Record<string, any>;

async function main() {
  console.log("Seed público de demonstração. Execute apenas após gerar migrations do novo schema.");

  for (const orgao of orgaos) {
    await prisma.orgao.upsert({
      where: { slug: orgao.slug },
      update: orgao,
      create: orgao
    });
  }

  for (const banca of bancas) {
    await prisma.banca.upsert({
      where: { slug: banca.slug },
      update: {
        nome: banca.nome,
        descricao: banca.descricao,
        estiloQuestoes: banca.estilo,
        nivelDificuldade: banca.dificuldade,
        caracteristicas: banca.caracteristicas,
        dicasPreparacao: banca.dicas
      },
      create: {
        slug: banca.slug,
        nome: banca.nome,
        descricao: banca.descricao,
        estiloQuestoes: banca.estilo,
        nivelDificuldade: banca.dificuldade,
        caracteristicas: banca.caracteristicas,
        dicasPreparacao: banca.dicas
      }
    });
  }

  for (const concurso of concursos) {
    const orgao = await prisma.orgao.findUnique({ where: { slug: concurso.orgaoSlug } });
    const banca = concurso.bancaSlug ? await prisma.banca.findUnique({ where: { slug: concurso.bancaSlug } }) : null;

    await prisma.concurso.upsert({
      where: { slug: concurso.slug },
      update: {
        titulo: concurso.titulo,
        status: concurso.status.toUpperCase(),
        atualizadoEm: new Date(`${concurso.atualizadoEm}T00:00:00Z`)
      },
      create: {
        slug: concurso.slug,
        titulo: concurso.titulo,
        ano: concurso.ano,
        tipo: concurso.tipo.toUpperCase(),
        modalidade: concurso.modalidade.toUpperCase(),
        abrangencia: concurso.abrangencia,
        status: concurso.status.toUpperCase(),
        etapaPrevisao: concurso.etapaPrevisao,
        confiabilidade: concurso.confiabilidade.toUpperCase(),
        fonteVerificada: concurso.fonteVerificada,
        origemDados: concurso.origemDados,
        ultimaVerificacaoEm: new Date(`${concurso.ultimaVerificacaoEm}T00:00:00Z`),
        regiao: concurso.regiao,
        estado: concurso.estado,
        municipio: concurso.municipio,
        areaAtuacao: concurso.areaAtuacao,
        vagas: concurso.vagas,
        cadastroReserva: concurso.cadastroReserva ?? false,
        salarioMinimo: concurso.salarioMinimo,
        salarioMaximo: concurso.salarioMaximo,
        jornada: concurso.jornada,
        inicioInscricoes: concurso.inicioInscricoes ? new Date(`${concurso.inicioInscricoes}T00:00:00Z`) : undefined,
        fimInscricoes: concurso.fimInscricoes ? new Date(`${concurso.fimInscricoes}T00:00:00Z`) : undefined,
        dataLimitePagamento: concurso.dataLimitePagamento ? new Date(`${concurso.dataLimitePagamento}T00:00:00Z`) : undefined,
        dataProva: concurso.dataProva ? new Date(`${concurso.dataProva}T00:00:00Z`) : undefined,
        taxaInscricao: concurso.taxaInscricao,
        resumo: concurso.resumo,
        requisitos: concurso.requisitos ?? [],
        etapas: concurso.etapas ?? [],
        destaque: concurso.destaque ?? false,
        orgaoId: orgao.id,
        bancaId: banca?.id
      }
    });

    const created = await prisma.concurso.findUnique({ where: { slug: concurso.slug } });
    for (const fonte of concurso.fontes) {
      await prisma.fonteConcurso.create({
        data: {
          concursoId: created.id,
          nome: fonte.nome,
          url: fonte.url,
          tipo: fonte.tipo.toUpperCase(),
          consultadoEm: new Date(`${fonte.consultadoEm}T00:00:00Z`),
          observacao: fonte.observacao
        }
      });
    }
  }

  for (const evento of eventosCalendario) {
    const concurso = await prisma.concurso.findUnique({ where: { slug: evento.concursoSlug } });
    if (!concurso) continue;
    await prisma.dataImportante.create({
      data: {
        concursoId: concurso.id,
        titulo: evento.titulo,
        tipo: evento.tipo.toUpperCase(),
        data: new Date(`${evento.data}T00:00:00Z`)
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await (prisma as any).$disconnect();
  });
