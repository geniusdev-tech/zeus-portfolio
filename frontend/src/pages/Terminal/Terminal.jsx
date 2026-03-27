import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../../components/BrandLogo/BrandLogo';
import { useI18n } from '../../i18n';
import { resolveChatApiBaseUrl } from '../../lib/apiUrls';
import './Terminal.css';

const CHAT_API_URL = resolveChatApiBaseUrl(import.meta.env.VITE_AI_CHAT_URL);

function formatTime(value, locale) {
  if (!value) return '--:--';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '--:--';
  }

  return date.toLocaleTimeString(locale, {
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

function loadHistory({ storageKey, initialHistory, legacyWelcome }) {
  if (typeof window === 'undefined') {
    return initialHistory;
  }

  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey))
      ?? JSON.parse(window.localStorage.getItem('zeus-protocol-terminal-history'));
    if (!Array.isArray(saved) || !saved.length) {
      return initialHistory;
    }

    const history = saved.map(normalizeMessage);
    const firstMessage = history[0];
    if (firstMessage?.role === 'bot' && legacyWelcome.test(firstMessage.text || '')) {
      history[0] = initialHistory[0];
    }

    return history;
  } catch {
    return initialHistory;
  }
}

function detectName(text) {
  const match = text.match(
    /(?:me chamo|sou|meu nome (?:e|eh|é)|nome|my name is|i am|i'm|me llamo|mi nombre es)\s+([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' -]{1,40})/i
  );
  return match ? match[1].trim().replace(/[.,!?]+$/, '') : '';
}

function detectProject(text, locale) {
  const projectMap = [
    {
      label: locale === 'pt-BR'
        ? 'Site institucional'
        : locale === 'es-ES'
          ? 'Sitio institucional'
          : 'Institutional site',
      terms: ['site', 'website', 'landing page', 'portal', 'sitio', 'pagina', 'página', 'web'],
    },
    {
      label: locale === 'pt-BR'
        ? 'Sistema sob medida'
        : locale === 'es-ES'
          ? 'Sistema a medida'
          : 'Custom system',
      terms: ['sistema', 'plataforma', 'system', 'platform', 'app', 'aplicativo', 'application', 'dashboard', 'painel', 'a medida', 'medida'],
    },
    {
      label: locale === 'pt-BR'
        ? 'Automacao'
        : locale === 'es-ES'
          ? 'Automatizacion'
          : 'Automation',
      terms: ['automacao', 'automação', 'automation', 'workflow', 'fluxo', 'flow', 'integracao', 'integração', 'integration', 'crm', 'automatizacion', 'integracion', 'flujo'],
    },
    {
      label: locale === 'pt-BR'
        ? 'Infraestrutura / Cloud'
        : locale === 'es-ES'
          ? 'Infraestructura / Nube'
          : 'Infrastructure / Cloud',
      terms: ['cloud', 'infra', 'infraestrutura', 'server', 'servidor', 'aws', 'azure', 'devops', 'nube'],
    },
    {
      label: locale === 'pt-BR'
        ? 'CRM / Vendas'
        : locale === 'es-ES'
          ? 'CRM / Ventas'
          : 'CRM / Sales',
      terms: ['crm', 'funil', 'sales', 'vendas', 'lead', 'leads', 'ventas', 'cliente'],
    },
  ];

  const normalized = text.toLowerCase();
  const found = projectMap.find((item) => item.terms.some((term) => normalized.includes(term)));
  return found ? found.label : '';
}

function detectDeadline(text, locale) {
  const normalized = text.toLowerCase();
  const rangeMatch = normalized.match(/\b\d+\s+(?:dias?|days?|semanas?|weeks?|meses?|months?)\b/);
  if (rangeMatch) {
    const range = rangeMatch[0];
    if (locale === 'pt-BR') {
      return range
        .replace(/days?/g, 'dias')
        .replace(/weeks?/g, 'semanas')
        .replace(/months?/g, 'meses');
    }

    if (locale === 'es-ES') {
      return range
        .replace(/days?/g, 'dias')
        .replace(/dias?/g, 'dias')
        .replace(/weeks?/g, 'semanas')
        .replace(/months?/g, 'meses');
    }

    return range
      .replace(/dias?/g, 'days')
      .replace(/semanas?/g, 'weeks')
      .replace(/meses?/g, 'months');
  }
  if (normalized.includes('hoje') || normalized.includes('today')) {
    if (locale === 'pt-BR') return 'Hoje';
    if (locale === 'es-ES') return 'Hoy';
    return 'Today';
  }
  if (normalized.includes('amanha') || normalized.includes('amanhã') || normalized.includes('tomorrow')) {
    if (locale === 'pt-BR') return 'Amanhã';
    if (locale === 'es-ES') return 'Mañana';
    return 'Tomorrow';
  }
  if (normalized.includes('essa semana') || normalized.includes('this week')) {
    if (locale === 'pt-BR') return 'Essa semana';
    if (locale === 'es-ES') return 'Esta semana';
    return 'This week';
  }
  if (normalized.includes('urgente') || normalized.includes('urgent')) {
    if (locale === 'pt-BR') return 'Urgente';
    if (locale === 'es-ES') return 'Urgente';
    return 'Urgent';
  }
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

function buildSnapshot(messages, locale, terminal) {
  const userText = messages
    .filter((message) => message.role === 'user')
    .map((message) => message.text)
    .join(' ');

  const name = detectName(userText);
  const project = detectProject(userText, locale);
  const deadline = detectDeadline(userText, locale);
  const contact = detectContact(userText);
  const budget = detectBudget(userText);

  let stage = terminal.stages.discovery;
  if (project && contact && deadline) {
    stage = terminal.stages.ready;
  } else if (project && (contact || deadline || budget)) {
    stage = terminal.stages.qualifying;
  } else if (project || contact || deadline || budget) {
    stage = terminal.stages.discovery;
  }

  return {
    name: name || (locale === 'pt-BR' ? 'PENDENTE' : locale === 'es-ES' ? 'PENDIENTE' : 'PENDING'),
    project: project || (locale === 'pt-BR' ? 'PENDENTE' : locale === 'es-ES' ? 'PENDIENTE' : 'PENDING'),
    deadline: deadline || (locale === 'pt-BR' ? 'PENDENTE' : locale === 'es-ES' ? 'PENDIENTE' : 'PENDING'),
    contact: contact || (locale === 'pt-BR' ? 'PENDENTE' : locale === 'es-ES' ? 'PENDIENTE' : 'PENDING'),
    budget: budget || (locale === 'pt-BR' ? 'Não informado' : locale === 'es-ES' ? 'No informado' : 'Not reported'),
    stage,
  };
}

export default function Terminal() {
  const { locale, content } = useI18n();
  const { terminal } = content;
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState(() =>
    loadHistory({
      storageKey: `${terminal.storageKey}:${locale}`,
      initialHistory: terminal.initialHistory,
      legacyWelcome: terminal.legacyWelcome,
    })
  );
  const [mounted, setMounted] = useState(false);
  const [connectionState, setConnectionState] = useState('idle');
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(`${terminal.storageKey}:${locale}`, JSON.stringify(messages));
    }
  }, [messages, locale, terminal.storageKey]);

  useEffect(() => {
    setMessages(
      loadHistory({
        storageKey: `${terminal.storageKey}:${locale}`,
        initialHistory: terminal.initialHistory,
        legacyWelcome: terminal.legacyWelcome,
      })
    );
    setConnectionState('idle');
  }, [locale, terminal]);

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

    pushMessage({ role: 'user', text, meta: terminal.messageMeta.userSent });
    setInput('');
    setSending(true);
    setConnectionState('loading');

    try {
      const response = await fetch(`${CHAT_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          locale,
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
        details.push(`${terminal.messageMeta.intent}: ${data.meta.intention}`);
      }
      if (data.meta?.email) {
        details.push(`${terminal.messageMeta.email}: ${data.meta.email}`);
      }
      if (data.meta?.phone) {
        details.push(`${terminal.messageMeta.phone}: ${data.meta.phone}`);
      }
      if (data.meta?.leadSaved) {
        details.push(terminal.messageMeta.leadSaved);
      }
      if (!data.meta?.aiAvailable) {
        details.push(terminal.messageMeta.fallbackActive);
      }

      pushMessage({
        role: 'bot',
        text: data.reply || terminal.fallbackMessage,
        meta: details.join(' | ') || terminal.messageMeta.replyDelivered,
      });
      setConnectionState(data.meta?.aiAvailable ? 'online' : 'fallback');
    } catch (error) {
      pushMessage({
        role: 'bot',
        text: terminal.fallbackMessage,
        meta: error.message || terminal.messageMeta.error,
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

  const snapshot = buildSnapshot(messages, locale, terminal);

  const statusLabel = terminal.statusLabels[connectionState];

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
            {terminal.returnToSite}
          </Link>
        </header>

        <section className="z-terminal-page__hero z-panel-surface">
          <div className="z-terminal-page__hero-copy">
            <div className="z-terminal-page__kicker">{terminal.kicker}</div>
            <h1 className="z-terminal-page__title">{terminal.title}</h1>
            <p className="z-terminal-page__lead">
              {terminal.lead}
            </p>
            <div className="z-terminal-page__chips" aria-label={terminal.quickCommandsLabel}>
              {terminal.chips.map((chip) => (
                <span className="z-terminal-page__chip" key={chip}>{chip}</span>
              ))}
            </div>
          </div>

          <div className="z-terminal-page__hero-panel">
            <div className="z-terminal-page__mini-label">{terminal.pipelineLabel}</div>
            <div className="z-terminal-page__mini-state">{snapshot.stage}</div>
            <div className="z-terminal-page__mini-grid">
              <div>
                <span>{terminal.projectLabel}</span>
                <strong>{snapshot.project}</strong>
              </div>
              <div>
                <span>{terminal.deadlineLabel}</span>
                <strong>{snapshot.deadline}</strong>
              </div>
              <div>
                <span>{terminal.contactLabel}</span>
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
                      {message.role === 'user' ? terminal.authorUser : terminal.authorBot}
                    </span>
                    <span className="z-terminal-page__message-time">
                      {formatTime(message.createdAt, locale)}
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
                    <span className="z-terminal-page__message-author">{terminal.authorBot}</span>
                    <span className="z-terminal-page__message-time">
                      {formatTime(new Date().toISOString(), locale)}
                    </span>
                  </div>
                  <p>
                    {terminal.typing}
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
                  placeholder={terminal.inputPlaceholder}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  required
                />
              </div>
              <button className="z-terminal-page__send" type="submit" disabled={sending}>
                {sending ? terminal.sending : terminal.send}
              </button>
            </form>
          </section>

          <aside className="z-terminal-page__sidebar">
            <section className="z-terminal-page__panel z-panel-surface">
              <div className="z-terminal-page__panel-label">{terminal.summaryLabel}</div>
              <div className="z-terminal-page__summary-grid">
                <div>
                  <span>{locale === 'pt-BR' ? 'Nome' : locale === 'es-ES' ? 'Nombre' : 'Name'}</span>
                  <strong>{snapshot.name}</strong>
                </div>
                <div>
                  <span>{terminal.projectLabel}</span>
                  <strong>{snapshot.project}</strong>
                </div>
                <div>
                  <span>{terminal.deadlineLabel}</span>
                  <strong>{snapshot.deadline}</strong>
                </div>
                <div>
                  <span>{terminal.contactLabel}</span>
                  <strong>{snapshot.contact}</strong>
                </div>
                <div>
                  <span>{locale === 'pt-BR' ? 'Orcamento' : locale === 'es-ES' ? 'Presupuesto' : 'Budget'}</span>
                  <strong>{snapshot.budget}</strong>
                </div>
              </div>
            </section>

            <section className="z-terminal-page__panel z-panel-surface">
              <div className="z-terminal-page__panel-label">{terminal.quickCommandsLabel}</div>
              <div className="z-terminal-page__actions">
                {terminal.quickPrompts.map((prompt) => (
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
              <div className="z-terminal-page__panel-label">{terminal.routingLabel}</div>
              <p className="z-terminal-page__note">
                {terminal.routingNote}
              </p>
              <Link to={{ pathname: '/', hash: '#contact' }} className="z-terminal-page__contact-link">
                {terminal.openContact}
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
