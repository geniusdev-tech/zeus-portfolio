import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import BrandLogo from '../BrandLogo/BrandLogo';
import { useI18n } from '../../i18n';
import './AIChatWidget.css';

const cleanUrl = (url) => {
  if (!url) return 'https://zeus-portfolio-iota.vercel.app/api';
  if (url.startsWith('/')) return url.replace(/\/$/, '');
  const match = url.match(/^https?:\/\/[^\s]+$/);
  return match ? url.replace(/\/$/, '') : 'https://zeus-portfolio-iota.vercel.app/api';
};

const CHAT_API_URL = cleanUrl(import.meta.env.VITE_AI_CHAT_URL);
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
      ?? JSON.parse(window.localStorage.getItem('zeus-protocol-chat-history'));

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

export default function AIChatWidget() {
  const { locale, content } = useI18n();
  const { aiChat } = content;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState(() =>
    loadHistory({
      storageKey: `${aiChat.storageKey}:${locale}`,
      initialHistory: aiChat.initialHistory,
      legacyWelcome: aiChat.legacyWelcome,
    })
  );
  const [mounted, setMounted] = useState(false);
  const [connectionState, setConnectionState] = useState('idle');
  const listRef = useRef(null);

  useEffect(() => {
    setMessages(
      loadHistory({
        storageKey: `${aiChat.storageKey}:${locale}`,
        initialHistory: aiChat.initialHistory,
        legacyWelcome: aiChat.legacyWelcome,
      })
    );
    setConnectionState('idle');
  }, [locale, aiChat]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(`${aiChat.storageKey}:${locale}`, JSON.stringify(messages));
    }
  }, [messages, locale, aiChat.storageKey]);

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

    pushMessage({ role: 'user', text, meta: aiChat.messageMeta.userSent });
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
        details.push(`${aiChat.messageMeta.intent}: ${data.meta.intention}`);
      }
      if (data.meta?.email) {
        details.push(`${aiChat.messageMeta.email}: ${data.meta.email}`);
      }
      if (data.meta?.phone) {
        details.push(`${aiChat.messageMeta.phone}: ${data.meta.phone}`);
      }
      if (data.meta?.leadSaved) {
        details.push(aiChat.messageMeta.leadSaved);
      }
      if (!data.meta?.aiAvailable) {
        details.push(aiChat.messageMeta.fallbackActive);
      }

      pushMessage({
        role: 'bot',
        text: data.reply || aiChat.fallbackMessage,
        meta: details.join(' | ') || aiChat.messageMeta.replyDelivered,
      });
      setConnectionState(data.meta?.aiAvailable ? 'online' : 'fallback');
    } catch (error) {
      pushMessage({
        role: 'bot',
        text: aiChat.fallbackMessage,
        meta: error.message || aiChat.messageMeta.error,
      });
      setConnectionState('error');
    } finally {
      setSending(false);
    }
  };

  const statusLabel = aiChat.statusLabels[connectionState];

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
            <span>{aiChat.terminalLabel}</span>
          </div>

          <div className={`z-ai-chat__status is-${connectionState}`}>{statusLabel}</div>
        </header>

        <div className="z-ai-chat__frame">
          <div className="z-ai-chat__frame-label">{aiChat.frameLabel}</div>
          <div className="z-ai-chat__frame-grid" aria-hidden="true"></div>
        </div>

        <div className="z-ai-chat__messages z-neon-scroll" ref={listRef}>
          {messages.map((message, index) => (
            <article className={`z-ai-chat__message ${message.role}`} key={`${message.role}-${index}`}>
              <div className="z-ai-chat__message-head">
                <span className="z-ai-chat__message-author">
                  {message.role === 'user' ? aiChat.authorUser : aiChat.authorBot}
                </span>
                <span className="z-ai-chat__message-time">{formatTime(message.createdAt, locale)}</span>
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
                <span className="z-ai-chat__message-author">{aiChat.authorBot}</span>
                <span className="z-ai-chat__message-time">{formatTime(new Date().toISOString(), locale)}</span>
              </div>
              <p>
                {aiChat.typing}
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
              placeholder={aiChat.inputPlaceholder}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              required
            />
          </div>
          <button className="z-ai-chat__send" type="submit" disabled={sending}>
            {sending ? aiChat.sending : aiChat.send}
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
        aria-label={isOpen ? aiChat.toggleClose : aiChat.toggleOpen}
      >
        <span>&gt;_</span>
      </button>
    </>,
    document.body
  );
}
