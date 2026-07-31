# Organiza Concursos

Plataforma publica para consulta, acompanhamento e preparacao para concursos publicos.

O projeto deixou de ser uma area privada de organizacao de estudos com login e passou a ser uma experiencia publica, sem cadastro de usuarios, sem sessoes e sem rotas privadas. A proposta atual e permitir que qualquer pessoa consulte concursos por situacao, localidade, orgao, banca, escolaridade, area profissional e ano.

> As informacoes exibidas possuem carater informativo. Antes de realizar qualquer inscricao, confirme os dados no edital, no site oficial do orgao responsavel e na pagina oficial da banca organizadora.

## Estado Atual dos Dados

Nesta etapa, os concursos exibidos pela aplicacao sao dados estaticos de demonstracao mantidos em `lib/public-data.ts`.

Isso significa que:

- os dados atuais nao sao obtidos automaticamente de APIs;
- nao ha scraping de sites externos;
- nenhum concurso demonstrativo deve ser interpretado como informacao oficial;
- concursos sem fonte validada sao marcados visualmente como `Dado de demonstracao`, `Informacao em analise`, `Concurso previsto` ou `Aguardando confirmacao`;
- a estrutura ja esta preparada para futura migracao para banco de dados, painel administrativo ou integracao com fontes oficiais.

Somente utilize a indicacao `Fonte oficial verificada` quando a informacao tiver sido confirmada diretamente em canal institucional confiavel, como orgao publico, banca organizadora, Diario Oficial ou portal governamental.

## Funcionalidades

- Pagina inicial publica com chamada, pesquisa e secoes de concursos.
- Listagem de concursos com busca detalhada e filtros combinados.
- Filtros por situacao, localidade, escolaridade, area, banca, salario, vagas, inscricao, prova, tipo, modalidade e ano.
- Ordenacao por relevancia, data, salario, vagas e prazo de inscricao.
- Cards responsivos com status, fonte, ultima verificacao e ultima atualizacao.
- Paginas proprias para concursos com URL amigavel.
- Area de estudos por concurso e por materia.
- Paginas publicas para bancas organizadoras e orgaos.
- Calendario de datas importantes.
- Noticias e atualizacoes.
- Paginas por localidade e por ano.
- Rotas de transparencia, LGPD, politica de privacidade, termos de uso e politica de cookies.
- Breadcrumbs e botao de voltar em paginas internas.
- Preservacao de pesquisa, filtros, ordenacao, paginacao e posicao aproximada de rolagem ao voltar da pagina de detalhes.
- Sitemap e robots para SEO.

## Rotas Principais

```text
/                         Pagina inicial
/concursos                Busca e listagem de concursos
/concursos/[slug]         Detalhes do concurso ou pagina por localidade/ano
/concursos/[slug]/estudos Area de preparacao do concurso
/concursos/[slug]/estudos/[materiaSlug]
/concursos/[ano]/abertos
/concursos/[ano]/previstos
/concursos/[ano]/finalizados
/inscricoes-abertas
/concursos-previstos
/calendario
/regioes
/orgaos
/orgaos/[slug]
/bancas
/bancas/[slug]
/conteudos-de-estudo
/provas-anteriores
/noticias
/fontes-oficiais
/sobre
/contato
/politica-de-privacidade
/politica-de-cookies
/termos-de-uso
/lgpd
```

Nao existem mais rotas publicas de login, cadastro, perfil ou painel privado.

## Tecnologias

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL preparado para uso futuro
- Zod
- Lucide React
- date-fns

Observacao: algumas dependencias antigas ainda podem existir no `package.json` por historico do projeto. Elas nao significam que a autenticacao publica esteja ativa.

## Estrutura de Pastas

```text
app/                 Rotas publicas, metadados, sitemap e robots
components/          Componentes reutilizaveis de layout, cards, badges e navegacao
features/public/     Experiencias publicas mais completas, como busca e calendario
lib/                 Dados publicos, Prisma, ambiente e utilidades
prisma/              Schema Prisma e seed preparado para futura persistencia
public/              Arquivos publicos
```

## Configuracao Local

Instale as dependencias:

```bash
npm install
```

Crie o arquivo de ambiente:

```powershell
Copy-Item .env.example .env
```

No Linux/macOS:

```bash
cp .env.example .env
```

Variaveis atuais:

```env
DATABASE_URL=
APP_URL=http://localhost:3000
```

`DATABASE_URL` e usada pelo Prisma quando voce for gerar client, rodar migrations, seed ou integrar dados persistidos. A aplicacao publica atual usa dados demonstrativos estaticos em `lib/public-data.ts`.

## Rodar em Desenvolvimento

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Prisma e Banco de Dados

O schema Prisma foi adaptado para o novo dominio publico da aplicacao. Ele esta preparado para representar:

- concursos;
- orgaos;
- bancas;
- cargos;
- localidades;
- editais;
- links oficiais;
- fontes;
- conteudos programaticos;
- materias;
- assuntos;
- atualizacoes;
- datas importantes;
- provas anteriores.

A aplicacao ainda nao depende do banco para exibir os dados demonstrativos atuais. Antes de usar o banco em ambiente real, valide as fontes oficiais e revise migrations/seed conforme a estrategia de publicacao.

## Fontes Oficiais

A rota `/fontes-oficiais` documenta a arquitetura prevista para confiabilidade dos dados.

Fontes priorizadas:

- sites oficiais de orgaos publicos;
- sites oficiais de bancas organizadoras;
- Diario Oficial da Uniao;
- diarios oficiais estaduais, distritais e municipais;
- portal Gov.br;
- paginas institucionais de processos seletivos.

Nao implemente coleta automatizada por scraping sem verificar regras, permissoes e limites do site de origem.

## Qualidade e Verificacao

Comando util para verificar tipos sem executar build:

```bash
npm run typecheck
```

Comandos de producao, build e deploy devem ser executados apenas quando essa etapa for realmente iniciada.

## Git e Arquivos Ignorados

O `.gitignore` deve manter fora do repositorio:

- `node_modules/`;
- `.next/`;
- `.env` e arquivos locais de ambiente;
- `.vercel/`;
- logs;
- coverage;
- caches como `*.tsbuildinfo`;
- arquivos locais de editor e sistema operacional.

O arquivo `.env.example` deve continuar versionado, pois serve como modelo seguro das variaveis esperadas.

Se algum arquivo de cache ja tiver sido enviado ao Git antes de entrar no `.gitignore`, remova apenas do controle de versao, mantendo o arquivo local:

```bash
git rm --cached tsconfig.tsbuildinfo
```

## Proximas Evolucoes

- Criar painel administrativo separado da navegacao publica.
- Implementar fluxo de validacao editorial antes de publicar concursos.
- Integrar importacao manual ou API de fontes oficiais.
- Criar rotina de revisao periodica das informacoes.
- Adicionar historico completo por concurso vindo de fontes institucionais.
- Expandir banco de provas anteriores e conteudos de estudo.
- Substituir dados demonstrativos por dados oficiais verificados.
