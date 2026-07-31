# Organiza Concursos

O **Organiza Concursos** é uma plataforma pública para consulta, acompanhamento e preparação para concursos públicos.

A proposta do sistema é ajudar candidatos a encontrar oportunidades por região, estado, município, órgão, banca, cargo, escolaridade, situação do concurso e datas importantes, sempre deixando claro a origem e o nível de confiabilidade das informações exibidas.

## Objetivo

Centralizar informações úteis sobre concursos públicos em uma experiência simples, responsiva e acessível, permitindo que o usuário:

- encontre concursos com inscrições abertas, previstos, em andamento ou finalizados;
- pesquise por órgão, banca, cargo, localidade, escolaridade, área profissional e palavra-chave;
- acompanhe datas importantes, como inscrição, pagamento, prova, gabarito e resultado;
- consulte detalhes do concurso em uma página própria;
- acesse conteúdos de estudo organizados por matéria;
- veja informações sobre bancas organizadoras e órgãos públicos;
- identifique se uma informação é oficial, prevista, em análise ou apenas demonstrativa.

## Como o Sistema Funciona

A aplicação possui navegação pública, sem login obrigatório, cadastro de usuários ou área privada.

O fluxo principal é:

1. O usuário acessa a página inicial.
2. Pesquisa ou filtra concursos conforme seu interesse.
3. Abre a página de detalhes do concurso.
4. Consulta informações como órgão, banca, cargos, vagas, salário, inscrição, prova, edital, fontes e histórico.
5. Acessa a área de estudos relacionada ao concurso.
6. Retorna para a listagem mantendo filtros, busca, ordenação e posição aproximada da página.

## Principais Áreas

### Início

Apresenta uma visão geral da plataforma, concursos em destaque, inscrições abertas, concursos previstos, busca por região, busca por escolaridade, atualizações recentes e conteúdos de estudo.

### Concursos

Área principal de pesquisa e listagem. Os filtros funcionam em conjunto e permitem localizar concursos por:

- situação;
- região, estado ou município;
- órgão;
- banca;
- escolaridade;
- área profissional;
- faixa salarial;
- quantidade de vagas;
- período de inscrição;
- data de prova;
- tipo de concurso;
- ano.

### Detalhes do Concurso

Cada concurso possui uma página própria com URL amigável, exibindo:

- nome do concurso;
- órgão responsável;
- banca organizadora;
- abrangência;
- cargos;
- vagas;
- escolaridade;
- remuneração;
- datas importantes;
- situação atual;
- fontes da informação;
- links oficiais, quando disponíveis;
- histórico de atualizações;
- acesso à área de estudos.

### Estudos

Área voltada à preparação do candidato, com organização por matérias, assuntos, nível de dificuldade, importância estimada, revisões, simulados, provas anteriores e estratégias de estudo.

### Bancas e Órgãos

Páginas públicas para consulta de bancas organizadoras e órgãos públicos, com descrição, características, concursos relacionados e links institucionais quando houver fonte confiável.

### Calendário

Organiza eventos importantes dos concursos, como início e fim das inscrições, pagamento, prova, gabarito, resultados e outras etapas relevantes.

### Transparência e LGPD

O projeto possui páginas públicas para política de privacidade, política de cookies, termos de uso, LGPD e fontes oficiais.

## Confiabilidade dos Dados

O sistema diferencia visualmente os dados por nível de confiabilidade:

- **Fonte oficial verificada**: informação confirmada em canal institucional confiável.
- **Informação em análise**: informação cadastrada, mas ainda pendente de validação.
- **Concurso previsto**: informação sobre concurso sem edital publicado.
- **Aguardando confirmação**: informação incompleta ou ainda sem fonte suficiente.
- **Dado de demonstração**: informação usada apenas para validar layout e funcionalidades.

As informações apresentadas possuem caráter informativo. Antes de realizar qualquer inscrição, o candidato deve confirmar os dados no edital, no site oficial do órgão responsável e na página oficial da banca organizadora.

## Estado Atual do Projeto

Nesta fase, a aplicação usa dados estáticos de demonstração em `lib/public-data.ts`.

Esses dados servem para validar:

- layout;
- navegação;
- cards;
- filtros;
- páginas de detalhes;
- páginas de estudo;
- estrutura de fontes;
- histórico de atualizações.

A estrutura do código e do banco está preparada para uma futura integração com dados persistidos, painel administrativo e validação editorial antes da publicação.

## Tecnologias

- Next.js com App Router
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Zod
- Lucide React
- date-fns

## Estrutura do Projeto

```text
app/                 Rotas públicas, layout, metadados, sitemap e robots
components/          Componentes reutilizáveis da interface
features/public/     Funcionalidades públicas mais completas
lib/                 Dados, utilidades, ambiente e Prisma
prisma/              Schema Prisma e seed
public/              Arquivos estáticos públicos
```

## Rotas Disponíveis

```text
/                         Página inicial
/concursos                Pesquisa e listagem de concursos
/concursos/[slug]         Detalhes do concurso, localidade ou ano
/concursos/[slug]/estudos Preparação do concurso
/inscricoes-abertas       Concursos com inscrições abertas
/concursos-previstos      Concursos previstos
/calendario               Calendário de concursos
/regioes                  Navegação por regiões
/orgaos                   Órgãos públicos
/bancas                   Bancas organizadoras
/conteudos-de-estudo      Conteúdos de preparação
/provas-anteriores        Provas anteriores
/noticias                 Atualizações e notícias
/fontes-oficiais          Critérios de fontes confiáveis
/sobre                    Sobre o projeto
/contato                  Contato
/politica-de-privacidade  Política de privacidade
/politica-de-cookies      Política de cookies
/termos-de-uso            Termos de uso
/lgpd                     Informações sobre LGPD
```

## Execução Local

Instale as dependências:

```bash
npm install
```

Crie o arquivo de ambiente:

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Variáveis de Ambiente

```env
DATABASE_URL=
APP_URL=http://localhost:3000
```

`DATABASE_URL` é usada pelo Prisma para futuras integrações com banco de dados. A versão atual da interface pública funciona com dados demonstrativos estáticos.

## Banco de Dados

O schema Prisma está preparado para representar:

- concursos;
- órgãos;
- bancas;
- cargos;
- localidades;
- editais;
- links oficiais;
- fontes;
- matérias;
- assuntos;
- atualizações;
- datas importantes;
- provas anteriores.

## Próximas Etapas

- Criar painel administrativo separado da navegação pública.
- Substituir dados demonstrativos por dados oficiais validados.
- Implementar fluxo de revisão antes da publicação.
- Integrar fontes oficiais por API ou importação manual.
- Ampliar histórico de concursos e atualizações.
- Expandir conteúdos de estudo e provas anteriores.
- Melhorar SEO com dados estruturados mais completos.

## Aviso

Este projeto não representa oficialmente órgãos públicos, bancas organizadoras ou instituições governamentais. As informações devem sempre ser confirmadas nos canais oficiais antes de qualquer inscrição ou tomada de decisão.
