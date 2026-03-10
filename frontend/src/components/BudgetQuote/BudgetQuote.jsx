import { useMemo, useState } from 'react';
import './BudgetQuote.css';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_BUSINESS_NUMBER || '';

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
  const [error, setError] = useState('');

  const canSubmit = useMemo(
    () => form.name.trim() && form.email.trim() && form.message.trim(),
    [form]
  );

  const setField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!WHATSAPP_NUMBER) {
      setError('Configure VITE_WHATSAPP_BUSINESS_NUMBER para ativar o envio pelo WhatsApp.');
      return;
    }

    if (!canSubmit) {
      setError('Preencha nome, email e contexto do projeto.');
      return;
    }

    const lines = [
      'Novo pedido de orcamento',
      '',
      `Nome: ${form.name}`,
      `Empresa: ${form.company || 'Nao informado'}`,
      `Email: ${form.email}`,
      `Servico: ${form.service}`,
      `Faixa de investimento: ${form.budget}`,
      `Prazo: ${form.timeline || 'Nao informado'}`,
      '',
      'Contexto do projeto:',
      form.message,
    ];

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
    setError('');
  };

  return (
    <section className="z-full z-quote" id="quote">
      <div className="z-section">
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag">08 — Budget Request</div>
          <div className="z-sec-title">
            Request a<br />
            <em>Project Estimate.</em>
          </div>
        </div>

        <div className="z-quote__grid z-reveal">
          <div className="z-quote__intro">
            <p>
              Send the initial project brief directly to WhatsApp Business. This form is
              intended for infrastructure projects, cloud work, technical support,
              blockchain operations and backend development requests.
            </p>

            <div className="z-quote__highlights">
              <div className="z-quote__highlight">
                <span className="z-quote__highlight-label">Best fit</span>
                <span className="z-quote__highlight-value">Infrastructure, DevSecOps, blockchain and backend work</span>
              </div>
              <div className="z-quote__highlight">
                <span className="z-quote__highlight-label">Delivery</span>
                <span className="z-quote__highlight-value">Message opened in WhatsApp Business</span>
              </div>
              <div className="z-quote__highlight">
                <span className="z-quote__highlight-label">Required input</span>
                <span className="z-quote__highlight-value">Scope, budget range and timeline</span>
              </div>
            </div>
          </div>

          <form className="z-quote__form" onSubmit={handleSubmit}>
            <div className="z-quote__row">
              <div className="z-quote__group">
                <label className="z-quote__label">Name</label>
                <input className="z-quote__input" value={form.name} onChange={setField('name')} />
              </div>
              <div className="z-quote__group">
                <label className="z-quote__label">Company</label>
                <input className="z-quote__input" value={form.company} onChange={setField('company')} />
              </div>
            </div>

            <div className="z-quote__row">
              <div className="z-quote__group">
                <label className="z-quote__label">Email</label>
                <input className="z-quote__input" type="email" value={form.email} onChange={setField('email')} />
              </div>
              <div className="z-quote__group">
                <label className="z-quote__label">Service</label>
                <select className="z-quote__input" value={form.service} onChange={setField('service')}>
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
                <select className="z-quote__input" value={form.budget} onChange={setField('budget')}>
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
              />
            </div>

            {error && <div className="z-quote__error">{error}</div>}

            <button className="z-quote__submit" type="submit">
              Open WhatsApp Quote Request →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
