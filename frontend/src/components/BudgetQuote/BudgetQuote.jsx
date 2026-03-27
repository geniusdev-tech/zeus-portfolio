import { useState } from 'react';
import BrandLogo from '../BrandLogo/BrandLogo';
import { resolveApiBaseUrl } from '../../lib/apiUrls';
import './BudgetQuote.css';

const API_URL = resolveApiBaseUrl(import.meta.env.VITE_API_URL);

const initialForm = {
  name: '',
  company: '',
  email: '',
  service: 'Cloud Automation',
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
    'Project brief',
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
      setError('Fill in name, email and brief summary before sending.');
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
          subject: `Quote Request · ${form.service}`,
          message: messagePreview,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send your brief.');
      }

      setStatus('sent');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Failed to send your brief.');
    }
  };

  return (
    <section className="z-full z-quote" id="quote">
      <div className="z-section">
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag">08 — Quote Intake</div>
          <div className="z-sec-title">
            Qualify the request<br />
            <em>without friction.</em>
          </div>
        </div>

        <div className="z-quote__grid z-reveal">
          <div className="z-quote__intro">
            <p>
              Share the brief here and route the request straight into the intake flow.
              This section is built for systems work, automation, cloud delivery,
              node operations and backend development.
            </p>

            <div className="z-quote__highlights">
              <div className="z-quote__highlight">
                <span className="z-quote__highlight-label">Flow</span>
                <span className="z-quote__highlight-value">The request is sent directly from the site into the ZEUS intake channel.</span>
              </div>
              <div className="z-quote__highlight">
                <span className="z-quote__highlight-label">Best fit</span>
                <span className="z-quote__highlight-value">Systems, automation, cloud, blockchain and backend work.</span>
              </div>
              <div className="z-quote__highlight">
                <span className="z-quote__highlight-label">Expected input</span>
                <span className="z-quote__highlight-value">Scope, budget range, timeline and operational context.</span>
              </div>
            </div>

            <div className="z-quote__preview">
              <div className="z-quote__preview-label">Brief preview</div>
              <pre className="z-quote__preview-body">{messagePreview}</pre>
            </div>
          </div>

          {status === 'sent' ? (
            <div className="z-quote__success">
              <div className="z-quote__success-badge">Brief delivered</div>
              <p>Your request was sent successfully. The conversation can continue by email without breaking the flow.</p>
              <button className="z-quote__submit z-quote__submit--ghost" type="button" onClick={() => setStatus('idle')}>
                Send another brief
              </button>
            </div>
          ) : (
            <form className="z-quote__form" onSubmit={handleSubmit}>
              <div className="z-quote__form-header">
                <div>
                  <div className="z-quote__form-brand">
                    <BrandLogo variant="mark" size="sm" className="z-quote__brand-logo" />
                    <span className="z-quote__form-brand-label">Zeus intake</span>
                  </div>
                  <div className="z-quote__form-kicker">Lead intake</div>
                  <h3>Intake brief form</h3>
                </div>
                <div className="z-quote__form-note">Routed through ZEUS intake channel</div>
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
                    <option>Systems Support</option>
                    <option>Platform Operations</option>
                    <option>Network Engineering</option>
                    <option>Cloud Automation</option>
                    <option>Node Infrastructure</option>
                    <option>Custom Systems</option>
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
                {status === 'sending' ? 'Sending brief...' : 'Request Quote'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
