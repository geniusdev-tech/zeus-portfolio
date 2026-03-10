import { useState } from 'react';
import './BudgetQuote.css';

const cleanUrl = (url) => {
  if (!url) return 'http://localhost:8080';
  const match = url.match(/https?:\/\/[^/\s]+/);
  return match ? match[0] : url;
};

const API_URL = cleanUrl(import.meta.env.VITE_API_URL);

const initialForm = {
  name: '',
  company: '',
  email: '',
  service: 'Cloud & DevOps',
  budget: 'To define',
  timeline: '',
  message: '',
};

export default function BudgetQuote() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const canSubmit = form.name.trim() && form.email.trim() && form.message.trim();

  const setField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const messagePreview = [
    'Project briefing',
    '',
    `Service requested: ${form.service}`,
    `Budget range: ${form.budget}`,
    `Expected timeline: ${form.timeline.trim() || 'To be aligned'}`,
    '',
    'Context',
    form.message.trim() || 'Describe the current environment, the goal and the main constraints.',
  ].join('\n');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!canSubmit) {
      setError('Fill in name, email and project summary before sending.');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          subject: `Budget Request · ${form.service}`,
          message: messagePreview,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send your request.');
      }

      setStatus('sent');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Failed to send your request.');
    }
  };

  return (
    <section className="z-full z-quote" id="quote">
      <div className="z-section">
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag">08 — Budget Request</div>
          <div className="z-sec-title">
            Start the conversation<br />
            <em>without leaving the page.</em>
          </div>
        </div>

        <div className="z-quote__grid z-reveal">
          <div className="z-quote__intro">
            <p>
              Share the initial brief here and the request is delivered directly to your
              inbox workflow. This section is intended for infrastructure projects,
              cloud work, technical support, blockchain operations and backend development.
            </p>

            <div className="z-quote__highlights">
              <div className="z-quote__highlight">
                <span className="z-quote__highlight-label">Flow</span>
                <span className="z-quote__highlight-value">The request is sent directly from the site, with no WhatsApp redirect.</span>
              </div>
              <div className="z-quote__highlight">
                <span className="z-quote__highlight-label">Best fit</span>
                <span className="z-quote__highlight-value">Infrastructure, DevSecOps, blockchain and backend work.</span>
              </div>
              <div className="z-quote__highlight">
                <span className="z-quote__highlight-label">Expected input</span>
                <span className="z-quote__highlight-value">Scope, budget range, timeline and project context.</span>
              </div>
            </div>

            <div className="z-quote__preview">
              <div className="z-quote__preview-label">Message preview</div>
              <pre className="z-quote__preview-body">{messagePreview}</pre>
            </div>
          </div>

          {status === 'sent' ? (
            <div className="z-quote__success">
              <div className="z-quote__success-badge">Request delivered</div>
              <p>Your briefing was sent successfully. The conversation can continue by email without taking the visitor out of the portfolio.</p>
              <button className="z-quote__submit z-quote__submit--ghost" type="button" onClick={() => setStatus('idle')}>
                Send another request
              </button>
            </div>
          ) : (
            <form className="z-quote__form" onSubmit={handleSubmit}>
              <div className="z-quote__form-header">
                <div>
                  <div className="z-quote__form-kicker">Direct intake</div>
                  <h3>Project intake form</h3>
                </div>
                <div className="z-quote__form-note">Response routed via API</div>
              </div>

              <div className="z-quote__row">
                <div className="z-quote__group">
                  <label className="z-quote__label">Name</label>
                  <input className="z-quote__input" value={form.name} onChange={setField('name')} disabled={status === 'sending'} />
                </div>
                <div className="z-quote__group">
                  <label className="z-quote__label">Company</label>
                  <input className="z-quote__input" value={form.company} onChange={setField('company')} disabled={status === 'sending'} />
                </div>
              </div>

              <div className="z-quote__row">
                <div className="z-quote__group">
                  <label className="z-quote__label">Email</label>
                  <input className="z-quote__input" type="email" value={form.email} onChange={setField('email')} disabled={status === 'sending'} />
                </div>
                <div className="z-quote__group">
                  <label className="z-quote__label">Service</label>
                  <select className="z-quote__input" value={form.service} onChange={setField('service')} disabled={status === 'sending'}>
                    <option>Technical Support</option>
                    <option>System Administration</option>
                    <option>Networking & Infrastructure</option>
                    <option>Cloud & DevOps</option>
                    <option>Blockchain Infrastructure</option>
                    <option>Software Development</option>
                  </select>
                </div>
              </div>

              <div className="z-quote__row">
                <div className="z-quote__group">
                  <label className="z-quote__label">Budget Range</label>
                  <select className="z-quote__input" value={form.budget} onChange={setField('budget')} disabled={status === 'sending'}>
                    <option>To define</option>
                    <option>Up to R$ 2.000</option>
                    <option>R$ 2.000 - R$ 5.000</option>
                    <option>R$ 5.000 - R$ 10.000</option>
                    <option>R$ 10.000+</option>
                  </select>
                </div>
                <div className="z-quote__group">
                  <label className="z-quote__label">Expected Timeline</label>
                  <input
                    className="z-quote__input"
                    placeholder="Ex: urgent / 30 days / this quarter"
                    value={form.timeline}
                    onChange={setField('timeline')}
                    disabled={status === 'sending'}
                  />
                </div>
              </div>

              <div className="z-quote__group">
                <label className="z-quote__label">Project Summary</label>
                <textarea
                  className="z-quote__textarea"
                  placeholder="Describe the environment, the current problem, the expected result and any technical constraints."
                  value={form.message}
                  onChange={setField('message')}
                  disabled={status === 'sending'}
                />
              </div>

              {error && <div className="z-quote__error">{error}</div>}

              <button className={`z-quote__submit${status === 'sending' ? ' is-loading' : ''}`} type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending request...' : 'Send Project Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
