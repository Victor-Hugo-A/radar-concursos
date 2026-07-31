import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade e LGPD do Organiza Concursos para navegação pública."
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 lg:px-6">
      <section className="card space-y-4">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Política de Privacidade</h1>
        <p className="leading-7 text-slate-600 dark:text-slate-300">A plataforma é pública e não exige conta de usuário. Em uma versão pública, podem ser tratados dados técnicos de navegação, como endereço IP, páginas acessadas, dispositivo, navegador e registros de segurança.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">A finalidade do tratamento é manter a segurança, melhorar a experiência, entender uso agregado da plataforma e corrigir falhas. Caso sejam usadas ferramentas de análise ou publicidade, cookies opcionais deverão ser aceitos, rejeitados ou configurados pelo visitante.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">Serviços externos futuros podem incluir hospedagem, monitoramento, analytics e provedores de busca. Cada integração deverá ser documentada antes de entrar em produção.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">Nos termos da LGPD, titulares podem solicitar confirmação de tratamento, acesso, correção, anonimização, eliminação, portabilidade e informações sobre compartilhamento, quando aplicável.</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">Contato demonstrativo para privacidade: privacidade@organizaconcursos.example.</p>
      </section>
    </main>
  );
}
