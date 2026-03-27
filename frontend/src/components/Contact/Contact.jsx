import { useState } from 'react';
import BrandLogo from '../BrandLogo/BrandLogo';
import { useI18n } from '../../i18n';
import { resolveApiBaseUrl } from '../../lib/apiUrls';
import './Contact.css';

const API_URL = resolveApiBaseUrl(import.meta.env.VITE_API_URL);
const INITIAL_FORM = {
  name: '',
  company: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const { content } = useI18n();
  const { contact } = content;
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      setStatus({ type: 'success', message: data.message || contact.statusSuccess });
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || contact.statusError,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="z-full z-contact" id="contact">
        <div className="z-section">
          <div className="z-sec-header z-reveal z-contact__header--centered">
          <div className="z-sec-tag cyan">{contact.sectionTag}</div>
          <h2 className="z-sec-title cyan">
            {contact.titlePrefix}<br />
            <em>{contact.titleEmphasis}</em>
          </h2>
        </div>

        <div className="z-contact__container z-reveal">
          <div className="z-contact__cta-panel">
            <div className="z-contact__cta-main">
              <div className="z-contact__signalbar">
                <div className="z-contact__signalbar-brand">
                  <BrandLogo variant="inline" size="sm" />
                </div>
                <div className="z-contact__signalbar-status">{contact.signalbarStatus}</div>
              </div>
              <div className="z-contact__cta-label">{contact.ctaLabel}</div>
              <div className="z-contact__cta-email">{contact.ctaEmail}</div>
              <p className="z-contact__cta-desc">
                {contact.ctaDesc}
              </p>
              <div className="z-contact__highlights" aria-label={contact.ariaHighlights}>
                {contact.highlights.map((item) => (
                  <span className="z-contact__highlight" key={item}>{item}</span>
                ))}
              </div>

              <form className="z-contact__form" onSubmit={handleSubmit}>
                <div className="z-contact__form-grid">
                  <label className="z-contact__field">
                    <span className="z-contact__field-label">{contact.form.name}</span>
                    <input name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
                  </label>
                  <label className="z-contact__field">
                    <span className="z-contact__field-label">{contact.form.email}</span>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
                  </label>
                  <label className="z-contact__field">
                    <span className="z-contact__field-label">{contact.form.company}</span>
                    <input name="company" value={form.company} onChange={handleChange} autoComplete="organization" />
                  </label>
                  <label className="z-contact__field">
                    <span className="z-contact__field-label">{contact.form.subject}</span>
                    <input name="subject" value={form.subject} onChange={handleChange} />
                  </label>
                </div>

                <label className="z-contact__field z-contact__field--full">
                  <span className="z-contact__field-label">{contact.form.message}</span>
                  <textarea name="message" rows="6" value={form.message} onChange={handleChange} required />
                </label>

                <button type="submit" className="z-contact__cta-btn" disabled={sending}>
                  <span>{sending ? contact.sending : contact.send}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className={`z-contact__status${status.type ? ` ${status.type}` : ''}`} aria-live="polite">
                  {status.message || contact.statusDefault}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
