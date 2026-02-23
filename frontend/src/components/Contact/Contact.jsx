import { useState } from 'react';
import { contactLinks } from '../../data';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function ContactForm() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', subject: '', message: '',
  });
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState('sending');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Something went wrong.');
      setState('sent');
    } catch (err) {
      setState('error');
      setErrorMsg(err.message || 'Failed to send. Try again later.');
    }
  };

  if (state === 'sent') {
    return (
      <div className="z-contact__success">
        <div className="z-contact__success-badge">● Message sent</div>
        <p>I'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form className="z-contact__form" onSubmit={handleSubmit}>
      <div className="z-contact__form-row">
        <div className="z-contact__form-group">
          <label className="z-contact__label">Name</label>
          <input className="z-contact__input" value={form.name} onChange={set('name')}
            placeholder="Your name" required disabled={state === 'sending'} />
        </div>
        <div className="z-contact__form-group">
          <label className="z-contact__label">Company</label>
          <input className="z-contact__input" value={form.company} onChange={set('company')}
            placeholder="Optional" disabled={state === 'sending'} />
        </div>
      </div>
      <div className="z-contact__form-group">
        <label className="z-contact__label">Email</label>
        <input className="z-contact__input" type="email" value={form.email} onChange={set('email')}
          placeholder="your@email.com" required disabled={state === 'sending'} />
      </div>
      <div className="z-contact__form-group">
        <label className="z-contact__label">Subject</label>
        <input className="z-contact__input" value={form.subject} onChange={set('subject')}
          placeholder="Infrastructure project, consulting..." disabled={state === 'sending'} />
      </div>
      <div className="z-contact__form-group">
        <label className="z-contact__label">Message</label>
        <textarea className="z-contact__textarea" value={form.message} onChange={set('message')}
          placeholder="Describe your project or inquiry..." required disabled={state === 'sending'} />
      </div>
      {state === 'error' && (
        <div className="z-contact__error">{errorMsg}</div>
      )}
      <button type="submit" className={`z-contact__submit${state === 'sending' ? ' sending' : ''}`}
        disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <div className="z-full" id="contact">
      <div className="z-section">
        {/* Header */}
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag cyan">06 — Contact</div>
          <div className="z-sec-title cyan">
            Let's Work on<br />
            <em>Something Real.</em>
          </div>
        </div>

        <div className="z-contact__grid z-reveal">
          {/* Left — info + links */}
          <div>
            <p className="z-contact__intro">
              Available for infrastructure engagements, consulting, and technical
              projects. Reach out through any of the channels below or use the
              contact form.
            </p>
            <div className="z-contact__links">
              {contactLinks.map(({ icon, label, value, href, cyan }) => (
                <a
                  key={label}
                  href={href}
                  className={`z-contact__link${cyan ? ' cyan' : ''}`}
                >
                  <span className="z-contact__icon">{icon}</span>
                  <div>
                    <div className="z-contact__link-label">{label}</div>
                    <div className="z-contact__link-value">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
