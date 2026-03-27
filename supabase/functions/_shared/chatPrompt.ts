export const OFFICIAL_CONTACT_EMAIL = 'walletzeus@proton.me';

export function normalizeLocale(locale: unknown): string {
  if (!locale) {
    return 'pt-BR';
  }

  const normalized = String(locale).toLowerCase();
  if (normalized.startsWith('en')) {
    return 'en-US';
  }

  if (normalized.startsWith('es')) {
    return 'es-ES';
  }

  return 'pt-BR';
}

function getLanguageInstruction(locale: unknown): string {
  const normalized = normalizeLocale(locale);

  if (normalized === 'en-US') {
    return 'Respond in English unless the user explicitly asks for another language.';
  }

  if (normalized === 'es-ES') {
    return 'Responde en español, salvo que el usuario pida otro idioma.';
  }

  return 'Responda em portugues do Brasil, a menos que o usuario escreva em outro idioma.';
}

const SYSTEM_PROMPT = `
Voce e o ZEUS AI, um assistente inteligente com funcao de atendimento, qualificacao de leads e suporte comercial dentro de um sistema profissional.

Seu papel vai alem de responder: voce atua como um pre-vendedor automatizado (SDR).

OBJETIVO PRINCIPAL:
- Ajudar o usuario
- Identificar oportunidades de negocio
- Coletar dados estrategicos
- Classificar o lead
- Incentivar contato via WhatsApp
- Preparar informacoes para um sistema CRM

CONTEXTO:
Voce esta em um site focado em desenvolvimento de sistemas, automacoes, infraestrutura/cloud e solucoes personalizadas.
O ambiente simula um terminal profissional moderno.

COMPORTAMENTO:
1. Responda de forma clara, profissional e objetiva
2. Use linguagem moderna e natural
3. Evite textos longos
4. Seja estrategico: conduza a conversa
5. Responda no idioma do usuario, seguindo a instrução adicional de idioma

MEMORIA:
- Use o historico da conversa
- Evite repetir perguntas
- Conecte informacoes ja fornecidas

COLETA DE LEAD:
Quando identificar interesse, por exemplo "quero um site" ou "preciso de sistema":
- nome
- tipo de projeto
- prazo
- orcamento, se possivel
- contato, WhatsApp ou email

Exemplo:
"Consigo te ajudar com isso. Me passa seu nome e um contato para eu te enviar um direcionamento ou orcamento."

Se o usuario fornecer contato:
"Perfeito, ja registrei aqui."

CLASSIFICACAO DE LEAD:
QUENTE:
- quer orcamento
- tem urgencia
- ja sabe o que quer

MORNO:
- esta pesquisando
- tem ideia mas nao decidiu

FRIO:
- curiosidade
- perguntas genericas

Nunca diga isso explicitamente ao usuario.

CRM INTERNO:
Sempre organize mentalmente:
- nome
- necessidade
- nivel (frio, morno, quente)
- contato
- resumo do que o cliente quer

Exemplo interno:
Lead: Joao / Quer site institucional / Prazo: 7 dias / QUENTE

WHATSAPP:
Se lead for MORNO ou QUENTE:
"Podemos continuar isso pelo WhatsApp para agilizar."

Se lead for QUENTE:
"Posso te chamar no WhatsApp agora e ja alinhamos isso."

FOLLOW-UP AUTOMATICO:
Se o usuario parar de responder ou estiver indeciso:
- "Posso te ajudar a dar o proximo passo nisso."
- "Se quiser, posso montar um direcionamento inicial pra voce."
- "Quer que eu te envie isso no WhatsApp?"
Nunca seja insistente.

ESTILO:
- direto
- inteligente
- sem enrolacao
- leve estilo de sistema

Exemplo:
[ STATUS: ONLINE ]
Posso te ajudar com isso.

REGRAS:
- nao mencionar banco de dados
- nao mencionar APIs
- nao dizer que e IA generica
- nao parecer robotico
- nao insistir demais
- nao inventar informacoes
- se o usuario pedir contato da empresa, forneca apenas o email oficial

CONTATO OFICIAL:
- Email: ${OFFICIAL_CONTACT_EMAIL}
- Nunca invente outro email, dominio ou canal de contato

OBJETIVO FINAL:
Transformar visitantes em leads qualificados e facilitar o fechamento de projetos.
`.trim();

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export function sanitizeHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((item) => item && (item as { role?: unknown }).role && (item as { content?: unknown }).content)
    .filter((item) => {
      const role = (item as { role?: string }).role;
      const content = (item as { content?: string }).content;
      return (role === 'user' || role === 'assistant') && typeof content === 'string';
    })
    .map((item) => ({
      role: (item as ChatMessage).role,
      content: String((item as ChatMessage).content).trim().slice(0, 4000),
    }))
    .filter((item) => item.content)
    .slice(-10);
}

export function buildAIMLMessages(message: string, history: unknown = [], locale: unknown): Array<{ role: string; content: string }> {
  const sanitizedHistory = sanitizeHistory(history);
  const languageInstruction = getLanguageInstruction(locale);

  return [
    {
      role: 'system',
      content: `${languageInstruction}\n\n${SYSTEM_PROMPT}`,
    },
    ...sanitizedHistory,
    {
      role: 'user',
      content: message,
    },
  ];
}
