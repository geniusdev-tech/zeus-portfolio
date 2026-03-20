import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../../components/BrandLogo/BrandLogo';
import './Terminal.css';

const STORAGE_KEY = 'zeus-protocol-chat-history';
const LEGACY_WELCOME_REGEX =
  /assistente da Zeus Protocol|assistente da Zeus|Posso te ajudar com site, automacao|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, DevOps e infraestrutura\.|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, orcamentos e suporte comercial\./i;

const INITIAL_HISTORY = [
  {
    role: 'bot',
    text: 'ZEUS AI online. Send scope, stack, deadline and contact to start intake.',
    meta: 'LIVE | CRM',
    createdAt: new Date().toISOString(),
  },
];

const QUICK_PROMPTS = [
  { label: 'NEW SITE', text: 'I need a website project.' },
  { label: 'SYSTEM', text: 'I need a custom system.' },
  { label: 'AUTOMATION', text: 'I want to automate an internal process.' },
  { label: 'QUOTE', text: 'I want a quote for this project.' },
  { label: 'WHATSAPP', text: 'If it makes sense, we can continue on WhatsApp.' },
];

const cleanUrl = (url) => {
  if (!url) return 'https://zeus-portfolio-iota.vercel.app/api';
  if (url.startsWith('/')) return url.replace(/\/$/, '');
  const match = url.match(/^https?:\/\/[^\s]+$/);
  return match ? url.replace(/\/$/, '') : 'https://zeus-portfolio-iota.vercel.app/api';
};

const CHAT_API_URL = cleanUrl(import.meta.env.VITE_AI_CHAT_URL);

function formatTime(value) {
  if (!value) return '--:--';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '--:--';
  }

  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function normalizeMessage(message) {
  return {
    ...message,
    meta: typeof message.meta === 'string' ? message.meta : '',
    createdAt: message.createdAt || new Date().toISOString(),
  };
}

function loadHistory() {
  if (typeof window === 'undefined') {
    return INITIAL_HISTORY;
  }

  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved) || !saved.length) {
      return INITIAL_HISTORY;
    }

    const history = saved.map(normalizeMessage);
    const firstMessage = history[0];
    if (firstMessage?.role === 'bot' && LEGACY_WELCOME_REGEX.test(firstMessage.text || '')) {
      history[0] = INITIAL_HISTORY[0];
    }

    return history;
  } catch {
    return INITIAL_HISTORY;
  }
}

function fallbackMessage() {
  return 'ZEUS AI offline. Send scope, stack, deadline and contact and I will route it when the link returns.';
}

function detectName(text) {
  const match = text.match(
    /(?:me chamo|sou|meu nome (?:e|eh|é)|nome)\s+([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' -]{1,40})/i
  );
  return match ? match[1].trim().replace(/[.,!?]+$/, '') : '';
}

function detectProject(text) {
  const projectMap = [
    { label: 'Site institucional', terms: ['site', 'website', 'landing page', 'portal'] },
    { label: 'Sistema sob medida', terms: ['sistema', 'plataforma', 'app', 'aplicativo', 'painel'] },
    { label: 'Automacao', terms: ['automacao', 'automação', 'workflow', 'fluxo', 'integracao', 'integração'] },
    { label: 'Infraestrutura / Cloud', terms: ['cloud', 'infra', 'servidor', 'aws', 'azure', 'devops'] },
    { label: 'CRM / Vendas', terms: ['crm', 'funil', 'vendas', 'lead', 'leads'] },
  ];

  const normalized = text.toLowerCase();
  const found = projectMap.find((item) => item.terms.some((term) => normalized.includes(term)));
  return found ? found.label : '';
}

function detectDeadline(text) {
  const normalized = text.toLowerCase();
  const rangeMatch = normalized.match(/\b\d+\s+(?:dias?|semanas?|meses?)\b/);
  if (rangeMatch) return rangeMatch[0];
  if (normalized.includes('hoje')) return 'Hoje';
  if (normalized.includes('amanha') || normalized.includes('amanhã')) return 'Amanha';
  if (normalized.includes('essa semana')) return 'Essa semana';
  if (normalized.includes('urgente')) return 'Urgente';
  return '';
}

function detectContact(text) {
  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (emailMatch) return emailMatch[0];

  const phoneMatch = text.match(/(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}[-\s]?\d{4}/);
  return phoneMatch ? phoneMatch[0] : '';
}

function detectBudget(text) {
  const match = text.match(/(?:r\$|R\$)\s?\d[\d.,]*/);
  return match ? match[0] : '';
}

function buildSnapshot(messages) {
  const userText = messages
    .filter((message) => message.role === 'user')
    .map((message) => message.text)
    .join(' ');

  const name = detectName(userText);
  const project = detectProject(userText);
  const deadline = detectDeadline(userText);
  const contact = detectContact(userText);
  const budget = detectBudget(userText);

  let stage = 'DISCOVERY';
  if (project && contact && deadline) {
    stage = 'READY TO ROUTE';
  } else if (project && (contact || deadline || budget)) {
    stage = 'QUALIFYING';
  } else if (project || contact || deadline || budget) {
    stage = 'DISCOVERY';
  }

  return {
    name: name || 'PENDING',
    project: project || 'PENDING',
    deadline: deadline || 'PENDING',
    contact: contact || 'PENDING',
    budget: budget || 'NOT REPORTED',
    stage,
  };
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState(loadHistory);
  const [mounted, setMounted] = useState(false);
  const [connectionState, setConnectionState] = useState('idle');
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const element = listRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages, sending]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      inputRef.current?.focus();
    }
  }, [mounted]);

  const pushMessage = (message) => {
    setMessages((current) => [...current, normalizeMessage(message)]);
  };

  const submitMessage = async () => {
    const text = input.trim();
    if (!text || sending) {
      return;
    }

    pushMessage({ role: 'user', text, meta: 'Mensagem enviada' });
    setInput('');
    setSending(true);
    setConnectionState('loading');

    try {
      const response = await fetch(`${CHAT_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((message) => ({
            role: message.role === 'user' ? 'user' : 'assistant',
            content: message.text,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      const details = [];
      if (data.meta?.intention && data.meta.intention !== 'general') {
        details.push(`Intencao: ${data.meta.intention}`);
      }
      if (data.meta?.email) {
        details.push(`Email: ${data.meta.email}`);
      }
      if (data.meta?.phone) {
        details.push(`Contato: ${data.meta.phone}`);
      }
      if (data.meta?.leadSaved) {
        details.push('Lead salvo');
      }
      if (!data.meta?.aiAvailable) {
        details.push('Fallback ativo');
      }

      pushMessage({
        role: 'bot',
        text: data.reply || fallbackMessage(),
        meta: details.join(' | ') || 'Resposta entregue',
      });
      setConnectionState(data.meta?.aiAvailable ? 'online' : 'fallback');
    } catch (error) {
      pushMessage({
        role: 'bot',
        text: fallbackMessage(),
        meta: error.message || 'Erro no chat',
      });
      setConnectionState('error');
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitMessage();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  };

  const snapshot = buildSnapshot(messages);

  const statusLabel = {
    idle: 'STANDBY',
    loading: 'SCANNING',
    online: 'LIVE',
    fallback: 'FALLBACK',
    error: 'ERROR',
  }[connectionState];

  if (!mounted) {
    return null;
  }

  return (
    <section className="z-terminal-page">
      <div className="z-terminal-page__shell">
        <header className="z-terminal-page__topbar z-panel-surface">
          <div className="z-terminal-page__brand">
            <BrandLogo variant="inline" size="sm" />
          </div>

          <div className={`z-terminal-page__status is-${connectionState}`}>
            <span className="z-terminal-page__status-dot" />
            {statusLabel}
          </div>

          <Link to="/" className="z-terminal-page__back">
            RETURN TO SITE
          </Link>
        </header>

        <section className="z-terminal-page__hero z-panel-surface">
          <div className="z-terminal-page__hero-copy">
            <div className="z-terminal-page__kicker">[ DEVOPS / HACKER MODE ]</div>
            <h1 className="z-terminal-page__title">ZEUS AI Terminal</h1>
            <p className="z-terminal-page__lead">
              Drop your scope, stack, deadline and contact. The shell qualifies the lead and routes the next step.
            </p>
            <div className="z-terminal-page__chips" aria-label="Terminal focus">
              <span className="z-terminal-page__chip">ROOT INTAKE</span>
              <span className="z-terminal-page__chip">PIPELINE LOGS</span>
              <span className="z-terminal-page__chip">WHATSAPP ROUTE</span>
            </div>
          </div>

          <div className="z-terminal-page__hero-panel">
            <div className="z-terminal-page__mini-label">PIPELINE STATE</div>
            <div className="z-terminal-page__mini-state">{snapshot.stage}</div>
            <div className="z-terminal-page__mini-grid">
              <div>
                <span>Projeto</span>
                <strong>{snapshot.project}</strong>
              </div>
              <div>
                <span>Prazo</span>
                <strong>{snapshot.deadline}</strong>
              </div>
              <div>
                <span>Contato</span>
                <strong>{snapshot.contact}</strong>
              </div>
            </div>
          </div>
        </section>

        <div className="z-terminal-page__grid">
          <section className="z-terminal-page__console z-panel-surface" aria-live="polite">
            <div className="z-terminal-page__console-bar">
              <div className="z-terminal-page__chrome" aria-hidden="true">
                <span className="z-terminal-page__dot is-red" />
                <span className="z-terminal-page__dot is-yellow" />
                <span className="z-terminal-page__dot is-green" />
              </div>
              <div className="z-terminal-page__console-title">
                root@zeus:~/ops
              </div>
              <div className={`z-terminal-page__console-status is-${connectionState}`}>
                {statusLabel}
              </div>
            </div>

            <div className="z-terminal-page__messages z-neon-scroll" ref={listRef}>
              {messages.map((message, index) => (
                <article
                  className={`z-terminal-page__message ${message.role}`}
                  key={`${message.role}-${index}`}
                >
                  <div className="z-terminal-page__message-head">
                    <span className="z-terminal-page__message-author">
                      {message.role === 'user' ? 'operator@client' : 'root@zeus'}
                    </span>
                    <span className="z-terminal-page__message-time">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                  <p>{message.text}</p>
                  {message.meta ? (
                    <small className="z-terminal-page__meta">
                      {message.meta.split('|').map((item) => {
                        const token = item.trim();
                        return token ? (
                          <span className="z-terminal-page__badge" key={token}>
                            {token}
                          </span>
                        ) : null;
                      })}
                    </small>
                  ) : null}
                </article>
              ))}

              {sending ? (
                <article className="z-terminal-page__message bot is-typing">
                  <div className="z-terminal-page__message-head">
                    <span className="z-terminal-page__message-author">root@zeus</span>
                    <span className="z-terminal-page__message-time">
                      {formatTime(new Date().toISOString())}
                    </span>
                  </div>
                  <p>
                    indexing request
                    <span className="z-terminal-page__cursor" aria-hidden="true" />
                  </p>
                </article>
              ) : null}
            </div>

            <form className="z-terminal-page__form" onSubmit={handleSubmit}>
              <div className="z-terminal-page__input-shell">
                <span className="z-terminal-page__prompt" aria-hidden="true">
                  #
                </span>
                <textarea
                  ref={inputRef}
                  className="z-terminal-page__input"
                  rows="2"
                  placeholder="enter scope, stack, deadline and contact"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  required
                />
              </div>
              <button className="z-terminal-page__send" type="submit" disabled={sending}>
                {sending ? 'RUN...' : 'RUN'}
              </button>
            </form>
          </section>

          <aside className="z-terminal-page__sidebar">
            <section className="z-terminal-page__panel z-panel-surface">
              <div className="z-terminal-page__panel-label">LEAD SNAPSHOT</div>
              <div className="z-terminal-page__summary-grid">
                <div>
                  <span>Nome</span>
                  <strong>{snapshot.name}</strong>
                </div>
                <div>
                  <span>Projeto</span>
                  <strong>{snapshot.project}</strong>
                </div>
                <div>
                  <span>Prazo</span>
                  <strong>{snapshot.deadline}</strong>
                </div>
                <div>
                  <span>Contato</span>
                  <strong>{snapshot.contact}</strong>
                </div>
                <div>
                  <span>Orcamento</span>
                  <strong>{snapshot.budget}</strong>
                </div>
              </div>
            </section>

            <section className="z-terminal-page__panel z-panel-surface">
              <div className="z-terminal-page__panel-label">QUICK COMMANDS</div>
              <div className="z-terminal-page__actions">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.label}
                    type="button"
                    className="z-terminal-page__action"
                    onClick={() => {
                      setInput(prompt.text);
                      inputRef.current?.focus();
                    }}
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="z-terminal-page__panel z-panel-surface">
              <div className="z-terminal-page__panel-label">ROUTING</div>
              <p className="z-terminal-page__note">
                If you already have scope, budget and contact, I can route the lead to WhatsApp or email.
                If you prefer WhatsApp, drop the number here and I will continue there.
              </p>
              <Link to={{ pathname: '/', hash: '#contact' }} className="z-terminal-page__contact-link">
                OPEN CONTACT
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
