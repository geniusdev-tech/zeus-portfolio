import { useState } from 'react';
import { contactLinks } from '../../data';
import './Contact.css';

const EMAIL = 'walletzeus@proton.me';
const cleanUrl = (url) => {
  if (!url) return 'http://localhost:8080';
  const match = url.match(/https?:\/\/[^/\s]+/);
  return match ? match[0] : url;
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

      setStatus({ type: 'success', message: data.message || 'Message sent successfully.' });
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
          <div className="z-sec-tag cyan">05 — Contact</div>
          <div className="z-sec-title cyan">
            Let's Work on<br />
            <em>Something Real.</em>
          </div>
        </div>

        <div className="z-contact__container z-reveal">
          <div className="z-contact__cta-panel">
            <div className="z-contact__cta-main">
              <div className="z-contact__cta-label">Project Inquiry Form</div>
              <div className="z-contact__cta-email">Send scope, blockers or the environment you need help with.</div>
              <p className="z-contact__cta-desc">
                This goes through the backend and is delivered by Resend. Keep it concise and
                include enough context to estimate effort quickly.
              </p>

              <form className="z-contact__form" onSubmit={handleSubmit}>
                <div className="z-contact__form-grid">
                  <label className="z-contact__field">
                    <span className="z-contact__field-label">Name</span>
                    <input name="name" value={form.name} onChange={handleChange} required />
                  </label>
                  <label className="z-contact__field">
                    <span className="z-contact__field-label">Email</span>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required />
                  </label>
                  <label className="z-contact__field">
                    <span className="z-contact__field-label">Company</span>
                    <input name="company" value={form.company} onChange={handleChange} />
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
                  <span>{sending ? 'Sending...' : 'Send Message'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className={`z-contact__status${status.type ? ` ${status.type}` : ''}`}>
                  {status.message || 'Messages are sent through the portfolio backend.'}
                </div>
              </form>
            </div>

            <div className="z-contact__meta">
              <div className="z-contact__meta-block">
                <span className="z-contact__meta-label">Response</span>
                <span className="z-contact__meta-value">Within 24 hours</span>
              </div>
              <div className="z-contact__meta-block">
                <span className="z-contact__meta-label">Scope</span>
                <span className="z-contact__meta-value">Infra, DevSecOps, tooling</span>
              </div>
              <div className="z-contact__meta-block">
                <span className="z-contact__meta-label">Delivery</span>
                <span className="z-contact__meta-value">Backend API + Resend</span>
              </div>
              <div className="z-contact__links">
                {contactLinks.slice(0, 2).map((link) => (
                  <a key={link.label} href={link.href} className="z-contact__link" target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
