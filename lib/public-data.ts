import {
  AlertTriangle,
  Ban,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Clock3,
  FileCheck2,
  FileSearch,
  Hourglass,
  PauseCircle,
  ShieldCheck,
  XCircle
} from "lucide-react";

export type ConcursoStatus =
  | "solicitado"
  | "em_estudo"
  | "autorizado"
  | "comissao_formada"
  | "banca_definida"
  | "previsto"
  | "edital_publicado"
  | "inscricoes_abertas"
  | "inscricoes_encerradas"
  | "em_andamento"
  | "prova_proxima"
  | "prova_realizada"
  | "resultado_publicado"
  | "finalizado"
  | "suspenso"
  | "cancelado";

export type EtapaPrevisao =
  | "solicitado"
  | "em_estudo"
  | "autorizado"
  | "comissao_formada"
  | "banca_em_definicao"
  | "banca_contratada"
  | "edital_iminente"
  | "edital_publicado"
  | "sem_confirmacao_oficial";

export type ConcursoTipo = "federal" | "estadual" | "municipal" | "distrital";
export type ConcursoModalidade = "concurso_publico" | "processo_seletivo_temporario";
export type Confiabilidade = "fonte_oficial_verificada" | "informacao_em_analise" | "concurso_previsto" | "dado_de_demonstracao" | "aguardando_confirmacao";

export type FonteConcurso = {
  nome: string;
  url?: string;
  tipo: "orgao_oficial" | "banca_oficial" | "diario_oficial" | "edital" | "comunicado_oficial" | "dado_demonstracao" | "aguardando_validacao";
  consultadoEm: string;
  observacao?: string;
};

export type HistoricoConcurso = {
  data: string;
  etapa: string;
  descricao: string;
  fonte: string;
  url?: string;
  confiabilidade: Confiabilidade;
};

export type Assunto = {
  titulo: string;
  subtitulos?: string[];
  recorrente?: boolean;
};

export type Materia = {
  slug: string;
  nome: string;
  categoria: string;
  importancia: "alta" | "media" | "baixa";
  dificuldade: "alta" | "media" | "baixa";
  questoesEstimadas?: number;
  ordemRecomendada: number;
  estrategia: string;
  assuntos: Assunto[];
};

export type Concurso = {
  id: string;
  slug: string;
  titulo: string;
  orgao: string;
  orgaoSlug: string;
  banca?: string;
  bancaSlug?: string;
  ano: number;
  tipo: ConcursoTipo;
  modalidade: ConcursoModalidade;
  regiao?: string;
  estado?: string;
  municipio?: string;
  abrangencia: string;
  status: ConcursoStatus;
  etapaPrevisao?: EtapaPrevisao;
  cargos: string[];
  escolaridades: string[];
  areaAtuacao: string;
  palavrasChave: string[];
  vagas?: number;
  cadastroReserva?: boolean;
  salarioMinimo?: number;
  salarioMaximo?: number;
  jornada?: string;
  inicioInscricoes?: string;
  fimInscricoes?: string;
  dataLimitePagamento?: string;
  dataProva?: string;
  taxaInscricao?: number;
  editalUrl?: string;
  inscricaoUrl?: string;
  siteOficialUrl?: string;
  bancaOficialUrl?: string;
  comunicadosUrl?: string;
  resumo?: string;
  requisitos?: string[];
  conteudoProgramatico?: Materia[];
  etapas?: string[];
  fontes: FonteConcurso[];
  fonteVerificada: boolean;
  confiabilidade: Confiabilidade;
  origemDados: "manual_demo" | "manual_validado" | "api_oficial" | "importacao_manual" | "integracao_futura";
  ultimaVerificacaoEm: string;
  atualizadoEm: string;
  historico: HistoricoConcurso[];
  destaque?: boolean;
};

export type Banca = {
  slug: string;
  nome: string;
  descricao: string;
  dificuldade: string;
  estilo: string;
  caracteristicas: string[];
  dicas: string[];
  provasAnteriores: string[];
};

export type Orgao = {
  slug: string;
  nome: string;
  descricao: string;
  areaAtuacao: string;
  linksOficiais: string[];
};

export type Atualizacao = {
  id: string;
  concursoSlug: string;
  tipo: string;
  data: string;
  resumo: string;
  fonte: string;
  url?: string;
  confiabilidade: Confiabilidade;
};

export type EventoCalendario = {
  id: string;
  concursoSlug: string;
  titulo: string;
  tipo: "inicio_inscricoes" | "fim_inscricoes" | "pagamento" | "locais_prova" | "prova" | "gabarito" | "resultado_preliminar" | "resultado_final";
  data: string;
};

export const statusMeta = {
  solicitado: { label: "Solicitado", tone: "slate", icon: CircleDashed },
  em_estudo: { label: "Em estudo", tone: "slate", icon: FileSearch },
  autorizado: { label: "Autorizado", tone: "sky", icon: ShieldCheck },
  comissao_formada: { label: "Comissão formada", tone: "sky", icon: FileCheck2 },
  banca_definida: { label: "Banca definida", tone: "sky", icon: CheckCircle2 },
  previsto: { label: "Previsto", tone: "slate", icon: Clock3 },
  edital_publicado: { label: "Edital publicado", tone: "emerald", icon: FileCheck2 },
  inscricoes_abertas: { label: "Inscrições abertas", tone: "emerald", icon: CheckCircle2 },
  inscricoes_encerradas: { label: "Inscrições encerradas", tone: "amber", icon: CalendarDays },
  em_andamento: { label: "Em andamento", tone: "sky", icon: Hourglass },
  prova_proxima: { label: "Prova próxima", tone: "violet", icon: CalendarDays },
  prova_realizada: { label: "Prova realizada", tone: "slate", icon: CalendarCheck },
  resultado_publicado: { label: "Resultado publicado", tone: "emerald", icon: FileCheck2 },
  finalizado: { label: "Finalizado", tone: "slate", icon: CheckCircle2 },
  suspenso: { label: "Suspenso", tone: "rose", icon: PauseCircle },
  cancelado: { label: "Cancelado", tone: "rose", icon: XCircle }
} satisfies Record<ConcursoStatus, { label: string; tone: string; icon: typeof Clock3 }>;

export const confiabilidadeMeta = {
  fonte_oficial_verificada: { label: "Fonte oficial verificada", tone: "emerald", icon: ShieldCheck },
  informacao_em_analise: { label: "Informação em análise", tone: "amber", icon: AlertTriangle },
  concurso_previsto: { label: "Concurso previsto", tone: "sky", icon: Clock3 },
  dado_de_demonstracao: { label: "Dado de demonstração", tone: "slate", icon: CircleDashed },
  aguardando_confirmacao: { label: "Aguardando confirmação", tone: "rose", icon: Ban }
} satisfies Record<Confiabilidade, { label: string; tone: string; icon: typeof Clock3 }>;

export const etapaPrevisaoMeta: Record<EtapaPrevisao, string> = {
  solicitado: "Solicitado",
  em_estudo: "Em estudo",
  autorizado: "Autorizado",
  comissao_formada: "Comissão formada",
  banca_em_definicao: "Banca em definição",
  banca_contratada: "Banca contratada",
  edital_iminente: "Edital iminente",
  edital_publicado: "Edital publicado",
  sem_confirmacao_oficial: "Sem confirmação oficial"
};

const demoConsultadoEm = "2026-07-31";

const fonteDemonstracao: FonteConcurso[] = [
  {
    nome: "Base estática de demonstração do projeto",
    tipo: "dado_demonstracao",
    consultadoEm: demoConsultadoEm,
    observacao: "Não é fonte oficial. Registro usado apenas para validar layout, filtros e navegação."
  }
];

function historicoDemo(slugLabel: string, status: ConcursoStatus): HistoricoConcurso[] {
  return [
    {
      data: "2026-07-15",
      etapa: "Registro criado",
      descricao: `${slugLabel}: registro demonstrativo criado manualmente no código.`,
      fonte: "Base estática de demonstração do projeto",
      confiabilidade: "dado_de_demonstracao"
    },
    {
      data: demoConsultadoEm,
      etapa: statusMeta[status].label,
      descricao: "Última revisão manual do dado demonstrativo. Não houve validação em fonte oficial.",
      fonte: "Base estática de demonstração do projeto",
      confiabilidade: "dado_de_demonstracao"
    }
  ];
}

const materiasBase: Materia[] = [
  {
    slug: "lingua-portuguesa",
    nome: "Língua Portuguesa",
    categoria: "Língua Portuguesa",
    importancia: "alta",
    dificuldade: "media",
    questoesEstimadas: 12,
    ordemRecomendada: 1,
    estrategia: "Priorize interpretação de texto, concordância e pontuação antes de avançar para tópicos menos recorrentes.",
    assuntos: [
      { titulo: "Interpretação de textos", recorrente: true },
      { titulo: "Concordância verbal e nominal", recorrente: true },
      { titulo: "Pontuação", subtitulos: ["Vírgula", "Dois-pontos", "Travessão"] }
    ]
  },
  {
    slug: "raciocinio-logico",
    nome: "Raciocínio Lógico",
    categoria: "Raciocínio Lógico",
    importancia: "media",
    dificuldade: "alta",
    questoesEstimadas: 8,
    ordemRecomendada: 2,
    estrategia: "Estude proposições e porcentagem com exercícios diários de curta duração.",
    assuntos: [
      { titulo: "Proposições e conectivos", recorrente: true },
      { titulo: "Porcentagem e razão" },
      { titulo: "Sequências lógicas" }
    ]
  },
  {
    slug: "informatica",
    nome: "Informática",
    categoria: "Informática",
    importancia: "media",
    dificuldade: "media",
    questoesEstimadas: 6,
    ordemRecomendada: 3,
    estrategia: "Reforce segurança da informação, internet e ferramentas de escritório.",
    assuntos: [
      { titulo: "Segurança da informação", recorrente: true },
      { titulo: "Navegadores e correio eletrônico" },
      { titulo: "Planilhas e editores de texto" }
    ]
  },
  {
    slug: "conhecimentos-especificos",
    nome: "Conhecimentos Específicos",
    categoria: "Conhecimentos Específicos",
    importancia: "alta",
    dificuldade: "alta",
    questoesEstimadas: 24,
    ordemRecomendada: 4,
    estrategia: "Distribua os temas específicos por blocos semanais e revise por questões comentadas.",
    assuntos: [
      { titulo: "Legislação aplicada ao cargo", recorrente: true },
      { titulo: "Rotinas administrativas" },
      { titulo: "Noções técnicas da área" }
    ]
  }
];

const baseDemo = {
  fontes: fonteDemonstracao,
  fonteVerificada: false,
  confiabilidade: "dado_de_demonstracao" as const,
  origemDados: "manual_demo" as const,
  ultimaVerificacaoEm: demoConsultadoEm,
  conteudoProgramatico: materiasBase
};

export const concursos: Concurso[] = [
  {
    ...baseDemo,
    id: "demo-001",
    slug: "prefeitura-alvorada-analista-administrativo-2026",
    titulo: "Prefeitura de Alvorada - Analista Administrativo 2026",
    orgao: "Prefeitura Municipal de Alvorada",
    orgaoSlug: "prefeitura-municipal-de-alvorada",
    banca: "Instituto Avalia",
    bancaSlug: "instituto-avalia",
    ano: 2026,
    tipo: "municipal",
    modalidade: "concurso_publico",
    regiao: "Região Sul",
    estado: "Rio Grande do Sul",
    municipio: "Alvorada",
    abrangencia: "Municipal",
    status: "inscricoes_abertas",
    cargos: ["Analista Administrativo", "Assistente de Gestão"],
    escolaridades: ["Superior", "Médio"],
    areaAtuacao: "Administrativa",
    palavrasChave: ["administrativo", "gestão", "prefeitura", "municipal"],
    vagas: 84,
    cadastroReserva: true,
    salarioMinimo: 2800,
    salarioMaximo: 6400,
    jornada: "30h a 40h semanais",
    inicioInscricoes: "2026-08-05",
    fimInscricoes: "2026-09-02",
    dataLimitePagamento: "2026-09-03",
    dataProva: "2026-10-18",
    taxaInscricao: 95,
    resumo: "Registro fictício para demonstração de layout. Não corresponde a concurso oficial confirmado.",
    requisitos: ["Idade mínima de 18 anos", "Escolaridade compatível com o cargo", "Documentação exigida no edital"],
    etapas: ["Prova objetiva", "Avaliação de títulos para cargos de nível superior"],
    atualizadoEm: "2026-07-28",
    historico: historicoDemo("Prefeitura de Alvorada", "inscricoes_abertas"),
    destaque: true
  },
  {
    ...baseDemo,
    id: "demo-002",
    slug: "agencia-distrital-fiscal-tecnico-2026",
    titulo: "Agência Distrital de Fiscalização - Técnico 2026",
    orgao: "Agência Distrital de Fiscalização",
    orgaoSlug: "agencia-distrital-de-fiscalizacao",
    banca: "Centro Seleção Pública",
    bancaSlug: "centro-selecao-publica",
    ano: 2026,
    tipo: "distrital",
    modalidade: "concurso_publico",
    regiao: "Região Centro-Oeste",
    estado: "Distrito Federal",
    municipio: "Brasília",
    abrangencia: "Distrital",
    status: "previsto",
    etapaPrevisao: "sem_confirmacao_oficial",
    cargos: ["Técnico de Fiscalização", "Agente de Apoio"],
    escolaridades: ["Médio"],
    areaAtuacao: "Fiscalização",
    palavrasChave: ["distrito federal", "df", "fiscalização", "técnico"],
    vagas: 120,
    cadastroReserva: true,
    salarioMinimo: 3900,
    salarioMaximo: 5200,
    resumo: "Registro fictício para validar concursos previstos. Não possui edital publicado nem confirmação oficial.",
    requisitos: ["Ensino médio completo", "Disponibilidade para trabalho externo"],
    etapas: ["Prova objetiva", "Curso de formação"],
    atualizadoEm: "2026-07-22",
    historico: historicoDemo("Agência Distrital de Fiscalização", "previsto"),
    destaque: true
  },
  {
    ...baseDemo,
    id: "demo-003",
    slug: "fundacao-saude-goias-assistente-2026",
    titulo: "Fundação Saúde Goiás - Assistente 2026",
    orgao: "Fundação Saúde Goiás",
    orgaoSlug: "fundacao-saude-goias",
    banca: "Instituto Avalia",
    bancaSlug: "instituto-avalia",
    ano: 2026,
    tipo: "estadual",
    modalidade: "processo_seletivo_temporario",
    regiao: "Região Centro-Oeste",
    estado: "Goiás",
    municipio: "Goiânia",
    abrangencia: "Estadual",
    status: "inscricoes_encerradas",
    cargos: ["Assistente Administrativo", "Técnico de Atendimento"],
    escolaridades: ["Médio", "Técnico"],
    areaAtuacao: "Saúde",
    palavrasChave: ["saúde", "goiás", "temporário", "assistente"],
    vagas: 210,
    salarioMinimo: 2400,
    salarioMaximo: 4100,
    inicioInscricoes: "2026-06-01",
    fimInscricoes: "2026-07-10",
    dataProva: "2026-09-13",
    taxaInscricao: 80,
    resumo: "Registro fictício para validar processo seletivo temporário e filtros de inscrições encerradas.",
    requisitos: ["Ensino médio ou técnico, conforme cargo"],
    etapas: ["Prova objetiva"],
    atualizadoEm: "2026-07-20",
    historico: historicoDemo("Fundação Saúde Goiás", "inscricoes_encerradas")
  },
  {
    ...baseDemo,
    id: "demo-004",
    slug: "instituto-nacional-de-pesquisas-analista-2026",
    titulo: "Instituto Nacional de Pesquisas - Analista 2026",
    orgao: "Instituto Nacional de Pesquisas",
    orgaoSlug: "instituto-nacional-de-pesquisas",
    banca: "Fundação Prova Brasil",
    bancaSlug: "fundacao-prova-brasil",
    ano: 2026,
    tipo: "federal",
    modalidade: "concurso_publico",
    regiao: "Nacional",
    abrangencia: "Nacional",
    status: "em_andamento",
    cargos: ["Analista de Dados", "Analista Administrativo"],
    escolaridades: ["Superior"],
    areaAtuacao: "Tecnologia e Gestão",
    palavrasChave: ["federal", "tecnologia", "dados", "analista"],
    vagas: 340,
    cadastroReserva: true,
    salarioMinimo: 7200,
    salarioMaximo: 9800,
    dataProva: "2026-08-30",
    resumo: "Registro fictício para validar concurso federal de abrangência nacional em fase de execução.",
    requisitos: ["Nível superior conforme especialidade"],
    etapas: ["Prova objetiva", "Prova discursiva", "Avaliação de títulos"],
    atualizadoEm: "2026-07-18",
    historico: historicoDemo("Instituto Nacional de Pesquisas", "em_andamento"),
    destaque: true
  },
  {
    ...baseDemo,
    id: "demo-005",
    slug: "camara-municipal-sao-paulo-tecnico-legislativo-2025",
    titulo: "Câmara Municipal de São Paulo - Técnico Legislativo 2025",
    orgao: "Câmara Municipal de São Paulo",
    orgaoSlug: "camara-municipal-de-sao-paulo",
    banca: "Centro Seleção Pública",
    bancaSlug: "centro-selecao-publica",
    ano: 2025,
    tipo: "municipal",
    modalidade: "concurso_publico",
    regiao: "Região Sudeste",
    estado: "São Paulo",
    municipio: "São Paulo",
    abrangencia: "Municipal",
    status: "finalizado",
    cargos: ["Técnico Legislativo"],
    escolaridades: ["Médio"],
    areaAtuacao: "Legislativa",
    palavrasChave: ["legislativo", "câmara", "são paulo", "técnico"],
    vagas: 45,
    salarioMinimo: 5100,
    salarioMaximo: 5100,
    dataProva: "2025-11-23",
    resumo: "Registro fictício finalizado usado apenas para validar histórico e filtros.",
    requisitos: ["Ensino médio completo"],
    etapas: ["Prova objetiva"],
    atualizadoEm: "2026-01-15",
    historico: historicoDemo("Câmara Municipal de São Paulo", "finalizado")
  }
];

export const concursosPendentesValidacao = [
  { termo: "IBGE", categoria: "Concurso federal", status: "Aguardando validação em fonte oficial antes de publicação" },
  { termo: "SEDES", categoria: "Distrito Federal", status: "Aguardando confirmação do órgão, banca ou Diário Oficial" },
  { termo: "Concursos federais", categoria: "Monitoramento", status: "Preparado para integração futura com Gov.br e Diário Oficial da União" },
  { termo: "Concursos estaduais e municipais", categoria: "Monitoramento", status: "Preparado para importação manual validada por fonte oficial" },
  { termo: "Processos seletivos temporários", categoria: "Modalidade", status: "Estrutura criada, publicação somente após confirmação" }
];

export const fontesConfiaveisPrioritarias = [
  "Sites oficiais dos órgãos públicos",
  "Sites oficiais das bancas organizadoras",
  "Diário Oficial da União",
  "Diários Oficiais estaduais, distritais e municipais",
  "Portal Gov.br",
  "Portais institucionais de processos seletivos"
];

export const bancas: Banca[] = [
  {
    slug: "instituto-avalia",
    nome: "Instituto Avalia",
    descricao: "Banca fictícia usada para demonstrar a área de perfis de organizadoras.",
    dificuldade: "Média",
    estilo: "Questões objetivas com enunciados diretos e cobrança frequente de literalidade.",
    caracteristicas: ["Português com foco em interpretação", "Legislação cobrada por artigos", "Informática em situações práticas"],
    dicas: ["Resolver provas anteriores da mesma área", "Revisar lei seca nos 20 dias finais", "Manter caderno de erros"],
    provasAnteriores: ["Prova demonstrativa administrativa 2024", "Prova demonstrativa saúde 2025"]
  },
  {
    slug: "centro-selecao-publica",
    nome: "Centro Seleção Pública",
    descricao: "Banca fictícia com perfil de questões multidisciplinares.",
    dificuldade: "Média a alta",
    estilo: "Enunciados contextualizados e alternativas próximas entre si.",
    caracteristicas: ["Raciocínio lógico com problemas", "Atualidades relacionadas à administração pública", "Redação oficial recorrente"],
    dicas: ["Treinar leitura rápida", "Comparar alternativas antes de marcar", "Simular tempo de prova"],
    provasAnteriores: ["Simulado demonstrativo fiscalização 2025"]
  },
  {
    slug: "fundacao-prova-brasil",
    nome: "Fundação Prova Brasil",
    descricao: "Banca fictícia para concursos nacionais de demonstração.",
    dificuldade: "Alta",
    estilo: "Cobrança analítica e interdisciplinar, com peso forte em conhecimentos específicos.",
    caracteristicas: ["Discursivas técnicas", "Questões longas", "Dados e gráficos em provas de tecnologia"],
    dicas: ["Estudar por blocos de conteúdo", "Fazer resumos técnicos", "Treinar discursivas semanalmente"],
    provasAnteriores: ["Prova demonstrativa tecnologia 2026"]
  }
];

export const orgaos: Orgao[] = [
  {
    slug: "prefeitura-municipal-de-alvorada",
    nome: "Prefeitura Municipal de Alvorada",
    descricao: "Órgão municipal fictício usado para demonstrar concursos locais.",
    areaAtuacao: "Administração municipal",
    linksOficiais: []
  },
  {
    slug: "agencia-distrital-de-fiscalizacao",
    nome: "Agência Distrital de Fiscalização",
    descricao: "Órgão distrital fictício com seleções voltadas à fiscalização e atendimento.",
    areaAtuacao: "Fiscalização",
    linksOficiais: []
  },
  {
    slug: "fundacao-saude-goias",
    nome: "Fundação Saúde Goiás",
    descricao: "Órgão estadual fictício para demonstração de concursos na área da saúde.",
    areaAtuacao: "Saúde pública",
    linksOficiais: []
  },
  {
    slug: "instituto-nacional-de-pesquisas",
    nome: "Instituto Nacional de Pesquisas",
    descricao: "Órgão federal fictício para concursos nacionais de tecnologia, pesquisa e gestão.",
    areaAtuacao: "Pesquisa e tecnologia",
    linksOficiais: []
  },
  {
    slug: "camara-municipal-de-sao-paulo",
    nome: "Câmara Municipal de São Paulo",
    descricao: "Órgão municipal fictício usado para demonstrar histórico de seleções.",
    areaAtuacao: "Legislativa",
    linksOficiais: []
  }
];

export const atualizacoes: Atualizacao[] = [
  { id: "att-1", concursoSlug: "prefeitura-alvorada-analista-administrativo-2026", tipo: "Publicação demonstrativa", data: "2026-07-28", resumo: "Registro demonstrativo de publicação fictícia.", fonte: "Base estática de demonstração", confiabilidade: "dado_de_demonstracao" },
  { id: "att-2", concursoSlug: "fundacao-saude-goias-assistente-2026", tipo: "Inscrições encerradas demonstrativas", data: "2026-07-10", resumo: "Registro demonstrativo de encerramento fictício das inscrições.", fonte: "Base estática de demonstração", confiabilidade: "dado_de_demonstracao" },
  { id: "att-3", concursoSlug: "instituto-nacional-de-pesquisas-analista-2026", tipo: "Fase em andamento demonstrativa", data: "2026-07-18", resumo: "Registro demonstrativo de fase em andamento.", fonte: "Base estática de demonstração", confiabilidade: "dado_de_demonstracao" }
];

export const eventosCalendario: EventoCalendario[] = [
  { id: "ev-1", concursoSlug: "prefeitura-alvorada-analista-administrativo-2026", titulo: "Início das inscrições", tipo: "inicio_inscricoes", data: "2026-08-05" },
  { id: "ev-2", concursoSlug: "prefeitura-alvorada-analista-administrativo-2026", titulo: "Encerramento das inscrições", tipo: "fim_inscricoes", data: "2026-09-02" },
  { id: "ev-3", concursoSlug: "prefeitura-alvorada-analista-administrativo-2026", titulo: "Prazo de pagamento", tipo: "pagamento", data: "2026-09-03" },
  { id: "ev-4", concursoSlug: "fundacao-saude-goias-assistente-2026", titulo: "Data da prova", tipo: "prova", data: "2026-09-13" },
  { id: "ev-5", concursoSlug: "instituto-nacional-de-pesquisas-analista-2026", titulo: "Data da prova", tipo: "prova", data: "2026-08-30" }
];

export const regioes = ["Nacional", "Região Norte", "Região Nordeste", "Região Centro-Oeste", "Região Sudeste", "Região Sul"];
export const estados = ["Distrito Federal", "Goiás", "Rio Grande do Sul", "São Paulo"];
export const escolaridades = ["Fundamental", "Médio", "Técnico", "Superior"];
export const areasAtuacao = Array.from(new Set(concursos.map((concurso) => concurso.areaAtuacao))).sort();
export const anosDisponiveis = Array.from(new Set(concursos.map((concurso) => concurso.ano))).sort((a, b) => b - a);

export function getConcursoBySlug(slug: string) {
  return concursos.find((concurso) => concurso.slug === slug);
}

export function getBancaBySlug(slug: string) {
  return bancas.find((banca) => banca.slug === slug);
}

export function getOrgaoBySlug(slug: string) {
  return orgaos.find((orgao) => orgao.slug === slug);
}

export function getConcursoTitle(slug: string) {
  return getConcursoBySlug(slug)?.titulo ?? "Concurso demonstrativo";
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function formatDate(value?: string) {
  if (!value) return "Não informado";
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export function formatCurrency(value?: number) {
  if (value === undefined) return "Não informado";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function salaryRange(concurso: Concurso) {
  if (concurso.salarioMinimo && concurso.salarioMaximo && concurso.salarioMinimo !== concurso.salarioMaximo) {
    return `${formatCurrency(concurso.salarioMinimo)} a ${formatCurrency(concurso.salarioMaximo)}`;
  }
  return formatCurrency(concurso.salarioMaximo ?? concurso.salarioMinimo);
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const estudoConteudos = [
  "Como montar um ciclo de estudos para edital aberto",
  "Checklist de revisão para a semana da prova",
  "Como analisar o perfil da banca organizadora",
  "Plano semanal para quem trabalha em tempo integral"
];
