# Organiza Concursos

Plataforma web para organização de estudos para concursos públicos. O projeto foi criado para ser hospedado na Vercel, usando Next.js com App Router, PostgreSQL no Neon, Prisma ORM e Vercel Blob para armazenamento de PDFs.

## Funcionalidades implementadas

- Página inicial pública moderna e responsiva.
- Cadastro, login, logout e consulta de sessão.
- Sessão via cookie HTTP-only com token assinado.
- Hash de senha com bcryptjs.
- Proteção de páginas privadas e APIs.
- Dois perfis: `USER` e `ADMIN`.
- CRUDs principais:
  - Concursos;
  - Matérias;
  - Assuntos;
  - Materiais/PDFs;
  - Anotações;
  - Sessões de estudo;
  - Tarefas.
- Dashboard com total de matérias, horas estudadas, questões resolvidas, percentual de acertos e atividades recentes.
- Upload de PDFs para Vercel Blob.
- Banco armazena somente metadados e URL dos PDFs.
- Validação com Zod no back-end.
- Páginas responsivas com Tailwind CSS.
- Tema claro/escuro por usuário.
- Área administrativa para listagem básica de usuários e indicadores gerais.
- Pesquisa global por matérias, materiais e anotações.
- Respostas padronizadas das APIs.
- Coleção Postman incluída em `postman/Organiza Concursos.postman_collection.json`.

## Tecnologias

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL / Neon
- Vercel Blob
- Zod
- bcryptjs
- jose
- React Hook Form preparado como dependência para evolução dos formulários

## Estrutura de pastas

```text
app/                 Páginas e Route Handlers do Next.js
components/          Componentes reutilizáveis
features/            Componentes por funcionalidade
lib/                 Prisma, autenticação, respostas de API e utilidades
repositories/        Funções de propriedade/autorização
schemas/             Schemas Zod
services/            Regras de negócio e estatísticas
prisma/              Schema Prisma e seed
postman/             Coleção para testes de API
public/              Arquivos públicos
```

## Pré-requisitos

- Node.js 20 ou superior.
- Conta no Neon.
- Conta na Vercel.
- Store do Vercel Blob criada.

## Instalação local

```bash
npm install
```

Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Preencha as variáveis do `.env`.

## Variáveis de ambiente

```env
DATABASE_URL=
AUTH_SECRET=
APP_URL=http://localhost:3000

BLOB_READ_WRITE_TOKEN=

MAX_PDF_SIZE_MB=20
SESSION_MAX_AGE_DAYS=7

ADMIN_EMAIL=admin@example.com
ADMIN_INITIAL_PASSWORD=Admin@123456
DEMO_USER_EMAIL=demo@example.com
DEMO_USER_PASSWORD=Demo@123456
```

Importante:

- `AUTH_SECRET` deve ter pelo menos 32 caracteres.
- O `.env` real não deve ser enviado ao GitHub.
- Use senhas fortes em produção.

## Configuração do Neon

1. Acesse o Neon e crie um novo projeto PostgreSQL.
2. Copie a connection string do banco.
3. Cole no `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@host/db?sslmode=require"
```

4. Gere o Prisma Client:

```bash
npx prisma generate
```

5. Crie as tabelas:

```bash
npx prisma migrate dev --name init
```

Em produção, use:

```bash
npx prisma migrate deploy
```

## Seed inicial

O seed cria:

- Usuário administrador;
- Usuário demonstração;
- Concurso de exemplo;
- Matérias;
- Assunto;
- Anotação;
- Sessão de estudo;
- Tarefa.

Execute:

```bash
npm run seed
```

## Rodar localmente

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Configuração do Vercel Blob

1. No painel da Vercel, crie um Blob Store.
2. Copie o token de leitura e escrita.
3. Configure a variável:

```env
BLOB_READ_WRITE_TOKEN=...
```

4. O upload usa `POST /api/materiais/upload` com `multipart/form-data`.
5. O banco salva `fileName`, `fileUrl`, `fileSize`, `mimeType` e `storageKey`.

## Testando as APIs no Postman ou Insomnia

Importe o arquivo:

```text
postman/Organiza Concursos.postman_collection.json
```

Configure a variável:

```text
baseUrl=http://localhost:3000
```

Fluxo recomendado:

1. `POST /api/auth/register`
2. `POST /api/auth/login`
3. `GET /api/auth/session`
4. `POST /api/concursos`
5. `POST /api/materias`
6. `POST /api/assuntos`
7. `POST /api/anotacoes`
8. `POST /api/estudos`
9. `POST /api/tarefas`
10. `POST /api/materiais/upload`

Como a autenticação usa cookie HTTP-only, mantenha o cookie jar habilitado no Postman.

## Padrão de respostas da API

Sucesso:

```json
{
  "success": true,
  "message": "Registro criado com sucesso.",
  "data": {}
}
```

Erro:

```json
{
  "success": false,
  "message": "Não foi possível concluir a operação.",
  "errors": []
}
```

## Códigos HTTP usados

- `200`: consulta ou atualização bem-sucedida.
- `201`: criação bem-sucedida.
- `204`: exclusão sem conteúdo.
- `400`: dados inválidos.
- `401`: usuário não autenticado.
- `403`: acesso não autorizado.
- `404`: recurso não encontrado.
- `409`: conflito, como e-mail duplicado.
- `413`: arquivo acima do limite.
- `415`: tipo de arquivo inválido.
- `500`: erro interno.

## Publicação na Vercel

1. Suba o projeto para o GitHub.
2. Importe o repositório na Vercel.
3. Configure as variáveis de ambiente no painel da Vercel.
4. Configure `DATABASE_URL` do Neon.
5. Configure `BLOB_READ_WRITE_TOKEN`.
6. Rode localmente ou em pipeline:

```bash
npx prisma migrate deploy
```

7. Faça deploy.

O script de build já executa:

```bash
prisma generate && next build
```

## Segurança aplicada

- Senhas com hash bcrypt.
- Cookie HTTP-only.
- `sameSite=lax`.
- Cookie seguro em produção.
- APIs privadas exigem autenticação.
- Recursos filtrados por `userId`.
- Admin não recebe hash de senha nas consultas.
- Login retorna mensagem genérica para credenciais inválidas.
- Upload aceita apenas PDF.
- Limite de tamanho de PDF configurável.
- Erros técnicos são registrados no servidor sem expor stack trace ao usuário.

## Solução de erros comuns

### `AUTH_SECRET deve possuir pelo menos 32 caracteres`

Crie uma chave longa:

```bash
openssl rand -base64 32
```

Ou use uma string segura com mais de 32 caracteres.

### `Armazenamento de arquivos não configurado`

Configure `BLOB_READ_WRITE_TOKEN` no `.env` local e na Vercel.

### Erro de conexão com Neon

Verifique:

- `DATABASE_URL` completa;
- `sslmode=require`;
- se o projeto Neon está ativo;
- se as migrations foram executadas.

### Erro ao enviar PDF

Verifique:

- se o arquivo termina com `.pdf`;
- se o tipo é `application/pdf`;
- se o tamanho está abaixo de `MAX_PDF_SIZE_MB`;
- se o Blob Token está correto.

## Melhorias futuras

- Recuperação de senha por e-mail.
- Verificação de e-mail.
- Flashcards.
- Simulados.
- Banco de questões.
- Calendário mensal de estudos.
- Notificações.
- PWA.
- Compartilhamento controlado de materiais.
- Planos gratuito e premium.
- Editor Markdown avançado com preview.
- Importação de edital em PDF.

## Antes de zipar ou publicar

Execute:

```bash
npm run typecheck
npm run lint
npm run build
```

Remova antes de enviar:

- `node_modules/`
- `.next/`
- `.env`
- arquivos temporários
- logs

Mantenha somente `.env.example`.
