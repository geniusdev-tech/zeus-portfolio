import { useState } from 'react';
import BrandLogo from '../BrandLogo/BrandLogo';
import './Contact.css';

const cleanUrl = (url) => {
  const fallback = import.meta.env.DEV
    ? 'http://localhost:8080'
    : 'https://zeus-backend-production-ee33.up.railway.app';
  if (!url) return fallback;
  const match = url.match(/https?:\/\/[^/\s]+/);
  return match ? match[0] : fallback;
};

const API_URL = cleanUrl(import.meta.env.VITE_API_URL);
const INITIAL_FORM = {
  name: '',
  company: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
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

      setStatus({ type: 'success', message: data.message || 'Brief sent successfully. We will continue by email.' });
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Failed to send. Please try again later.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="z-full z-contact" id="contact">
      <div className="z-section">
        <div className="z-sec-header z-reveal z-contact__header--centered">
          <div className="z-sec-tag cyan">05 — Lead Intake</div>
          <h2 className="z-sec-title cyan">
            Open a Lead.<br />
            <em>Send the brief.</em>
          </h2>
        </div>

        <div className="z-contact__container z-reveal">
          <div className="z-contact__cta-panel">
            <div className="z-contact__cta-main">
              <div className="z-contact__signalbar">
                <div className="z-contact__signalbar-brand">
                  <BrandLogo variant="inline" size="sm" />
                </div>
                <div className="z-contact__signalbar-status">Lead capture active</div>
              </div>
              <div className="z-contact__cta-label">Lead Intake Form</div>
              <div className="z-contact__cta-email">Send scope, blockers or the environment you want mapped.</div>
              <p className="z-contact__cta-desc">
                This goes straight into the ZEUS intake channel. Keep it concise and include
                enough context to estimate effort fast.
              </p>
              <div className="z-contact__highlights" aria-label="What to include in your brief">
                <span className="z-contact__highlight">Scope</span>
                <span className="z-contact__highlight">Blockers</span>
                <span className="z-contact__highlight">Timeline</span>
                <span className="z-contact__highlight">Contact</span>
              </div>

              <form className="z-contact__form" onSubmit={handleSubmit}>
                <div className="z-contact__form-grid">
                  <label className="z-contact__field">
                    <span className="z-contact__field-label">Name</span>
                    <input name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
                  </label>
                  <label className="z-contact__field">
                    <span className="z-contact__field-label">Email</span>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
                  </label>
                  <label className="z-contact__field">
                    <span className="z-contact__field-label">Company</span>
                    <input name="company" value={form.company} onChange={handleChange} autoComplete="organization" />
                  </label>
                  <label className="z-contact__field">
                    <span className="z-contact__field-label">Subject</span>
                    <input name="subject" value={form.subject} onChange={handleChange} />
                  </label>
                </div>

                <label className="z-contact__field z-contact__field--full">
                  <span className="z-contact__field-label">Message</span>
                  <textarea name="message" rows="6" value={form.message} onChange={handleChange} required />
                </label>

                <button type="submit" className="z-contact__cta-btn" disabled={sending}>
                  <span>{sending ? 'Sending...' : 'Send Brief'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className={`z-contact__status${status.type ? ` ${status.type}` : ''}`} aria-live="polite">
                  {status.message || 'Briefs are routed through the ZEUS intake channel.'}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
