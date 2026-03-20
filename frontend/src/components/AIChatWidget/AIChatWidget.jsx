import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import BrandLogo from '../BrandLogo/BrandLogo';
import './AIChatWidget.css';

const cleanUrl = (url) => {
  if (!url) return 'https://zeus-portfolio-iota.vercel.app/api';
  if (url.startsWith('/')) return url.replace(/\/$/, '');
  const match = url.match(/^https?:\/\/[^\s]+$/);
  return match ? url.replace(/\/$/, '') : 'https://zeus-portfolio-iota.vercel.app/api';
};

const CHAT_API_URL = cleanUrl(import.meta.env.VITE_AI_CHAT_URL);
const STORAGE_KEY = 'zeus-protocol-chat-history';
const LEGACY_WELCOME_REGEX =
  /assistente da Zeus Protocol|assistente da Zeus|Posso te ajudar com site, automacao|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, DevOps e infraestrutura\./i;
const INITIAL_HISTORY = [
  {
    role: 'bot',
    text: 'ZEUS AI online. Send scope, stack, deadline and contact to start intake.',
    meta: 'LIVE | CRM',
    createdAt: new Date().toISOString(),
  },
];

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

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState(loadHistory);
  const [mounted, setMounted] = useState(false);
  const [connectionState, setConnectionState] = useState('idle');
  const listRef = useRef(null);

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
  }, [messages, isOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pushMessage = (message) => {
    setMessages((current) => [...current, normalizeMessage(message)]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

  const statusLabel = {
    idle: 'STANDBY',
    loading: 'SCANNING',
    online: 'LIVE',
    fallback: 'FALLBACK',
    error: 'ERROR',
  }[connectionState];

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <>
      <aside className={`z-ai-chat${isOpen ? ' is-open' : ''}`} aria-live="polite">
        <header className="z-ai-chat__header">
          <div className="z-ai-chat__chrome" aria-hidden="true">
            <span className="z-ai-chat__dot is-red"></span>
            <span className="z-ai-chat__dot is-yellow"></span>
            <span className="z-ai-chat__dot is-green"></span>
          </div>

          <div className="z-ai-chat__title">
            <BrandLogo variant="inline" size="sm" />
            <span>zeus-shell:~/ops</span>
          </div>

          <div className={`z-ai-chat__status is-${connectionState}`}>{statusLabel}</div>
        </header>

        <div className="z-ai-chat__frame">
          <div className="z-ai-chat__frame-label">DEVOPS / HACKER CHANNEL</div>
          <div className="z-ai-chat__frame-grid" aria-hidden="true"></div>
        </div>

        <div className="z-ai-chat__messages z-neon-scroll" ref={listRef}>
          {messages.map((message, index) => (
            <article className={`z-ai-chat__message ${message.role}`} key={`${message.role}-${index}`}>
              <div className="z-ai-chat__message-head">
                <span className="z-ai-chat__message-author">
                  {message.role === 'user' ? 'operator@client' : 'root@zeus'}
                </span>
                <span className="z-ai-chat__message-time">{formatTime(message.createdAt)}</span>
              </div>
              <p>{message.text}</p>
              {message.meta ? (
                <small className="z-ai-chat__meta">
                  {message.meta.split('|').map((item) => {
                    const token = item.trim();
                    return token ? (
                      <span className="z-ai-chat__badge" key={token}>
                        {token}
                      </span>
                    ) : null;
                  })}
                </small>
              ) : null}
            </article>
          ))}

          {sending ? (
            <article className="z-ai-chat__message bot is-typing">
              <div className="z-ai-chat__message-head">
                <span className="z-ai-chat__message-author">root@zeus</span>
                <span className="z-ai-chat__message-time">{formatTime(new Date().toISOString())}</span>
              </div>
              <p>
                scanning payload
                <span className="z-ai-chat__cursor" aria-hidden="true"></span>
              </p>
            </article>
          ) : null}
        </div>

        <form className="z-ai-chat__form" onSubmit={handleSubmit}>
          <div className="z-ai-chat__input-shell">
            <span className="z-ai-chat__input-prompt" aria-hidden="true">
              #
            </span>
            <textarea
              className="z-ai-chat__input"
              rows="2"
              placeholder="enter scope, stack, deadline and contact"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              required
            />
          </div>
          <button className="z-ai-chat__send" type="submit" disabled={sending}>
            {sending ? 'RUN...' : 'RUN'}
          </button>
        </form>

        <div className="z-ai-chat__footer-bar" aria-hidden="true">
          <span>matrix.green</span>
          <span>pipeline.secure</span>
          <span>root.node</span>
        </div>
      </aside>

      <button
        type="button"
        className="z-ai-chat__toggle"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Close Zeus hacker shell' : 'Open Zeus hacker shell'}
      >
        <span>&gt;_</span>
      </button>
    </>,
    document.body
  );
}
