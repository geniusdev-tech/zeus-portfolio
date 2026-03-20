import { Fragment, useEffect, useState } from 'react';
import TuiSimulator from '../../components/TuiSimulator/TuiSimulator';
import CheckoutModal from '../../components/CheckoutModal/CheckoutModal';
import Footer from '../../components/Footer';
import './Quelox.css';

const pillars = [
  {
    label: 'Orchestration Core',
    text: 'Controls node lifecycle with restart policy, supervised execution and consistent process handling.',
  },
  {
    label: 'Node Telemetry',
    text: 'Exposes CPU, memory, peer state, sync progress and runtime health in one operational view.',
  },
  {
    label: 'Secure IPC',
    text: 'Uses UNIX sockets to keep control local to the host and reduce exposed management surfaces.',
  },
];

const architecture = [
  {
    title: 'Go runtime built for operators',
    text: 'Keeps runtime overhead low and makes daemon behavior easier to operate on production Linux hosts.',
  },
  {
    title: 'systemd-native process model',
    text: 'Runs as a managed service with supervised startup, restart control, logging and host integration.',
  },
  {
    title: 'Node-aware automation',
    text: 'Designed for blockchain nodes where peer count, sync drift and runtime instability affect availability.',
  },
  {
    title: 'Infrastructure-first monitoring',
    text: 'Surfaces operational issues early so they can be handled before they become downtime or desynchronization.',
  },
];

const workflow = [
  'Deploy the daemon on a hardened Linux host.',
  'Attach QELO-X to the target node and its IPC boundary.',
  'Track health, sync state and runtime metrics continuously.',
  'Trigger recovery actions before operational degradation becomes downtime.',
];

const comparison = [
  ['Lifecycle control', 'Manual scripts and ad-hoc commands', 'Centralized daemon supervision'],
  ['Monitoring', 'Reactive and fragmented', 'Continuous operational telemetry'],
  ['Recovery', 'Human intervention required', 'Automated restart and recovery logic'],
  ['Security surface', 'More exposed control paths', 'Local IPC and controlled boundaries'],
  ['Node operations', 'Hard to standardize', 'Repeatable operator workflow'],
];

const stats = [
  { label: 'Target', value: 'Critical node infrastructure' },
  { label: 'Model', value: 'Daemon + IPC + monitoring' },
  { label: 'Environment', value: 'Linux / systemd / production hosts' },
];

const highlights = [
  'Local-first control plane',
  'Continuous node telemetry',
  'Recovery routines for production incidents',
];

export default function Quelox() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="qx-page">
      <section className="qx-hero">
        <div className="qx-container qx-hero__grid">
          <div className="qx-hero__content">
            <div className="qx-kicker">Infrastructure Product — Blockchain Node Operations</div>
            <h1 className="qx-title">QELO-X</h1>
            <h2 className="qx-subtitle">
              Orchestration, monitoring and recovery for blockchain infrastructure.
            </h2>

            <p className="qx-lead">
              QELO-X is a node operations layer for blockchain infrastructure. It is
              built to supervise services, monitor runtime health, recover from common
              failures and keep control local to the host.
            </p>

            <div className="qx-highlights" aria-label="QELO-X highlights">
              {highlights.map((item) => (
                <span className="qx-highlight" key={item}>{item}</span>
              ))}
            </div>

            <div className="qx-actions">
              <button className="qx-btn qx-btn--primary" onClick={() => setIsModalOpen(true)}>
                Request Access
              </button>
              <a className="qx-btn qx-btn--ghost" href="#architecture">
                View Architecture
              </a>
            </div>

            <div className="qx-stats">
              {stats.map((stat) => (
                <div className="qx-stat" key={stat.label}>
                  <span className="qx-stat__label">{stat.label}</span>
                  <span className="qx-stat__value">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="qx-hero__visual">
            <div className="qx-pricebox">
              <span className="qx-pricebox__label">Current access</span>
              <div className="qx-pricebox__main">
                <span className="qx-pricebox__current">R$ 199,90</span>
                <span className="qx-pricebox__anchor">R$ 297,00</span>
              </div>
              <p className="qx-pricebox__copy">
                Single release access for the current cycle.
              </p>
            </div>

            <TuiSimulator />
          </div>
        </div>
      </section>

      <section className="qx-section">
        <div className="qx-container">
          <div className="qx-section__header">
            <div className="qx-section__tag">01 — Product Role</div>
            <h2 className="qx-section__title">Built for nodes that need stable operation and clear telemetry.</h2>
            <p className="qx-section__intro">
              QELO-X sits between the host, the node process and the operator workflow so
              runtime visibility and recovery are part of the system, not an afterthought.
            </p>
          </div>

          <div className="qx-pillars">
            {pillars.map((pillar) => (
              <article className="qx-panel" key={pillar.label}>
                <div className="qx-panel__tag">{pillar.label}</div>
                <p className="qx-panel__text">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="qx-section qx-section--alt" id="architecture">
        <div className="qx-container">
          <div className="qx-section__header">
            <div className="qx-section__tag">02 — Architecture</div>
            <h2 className="qx-section__title">A runtime model designed for Linux-based node operations.</h2>
            <p className="qx-section__intro">
              The architecture favors supervised services, low-friction host integration and
              monitoring that speaks the language of real node operations.
            </p>
          </div>

          <div className="qx-architecture">
            {architecture.map((item) => (
              <article className="qx-architecture__card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="qx-section qx-section--workflow">
        <div className="qx-container qx-workflow">
          <div>
            <div className="qx-section__tag">03 — Workflow</div>
            <h2 className="qx-section__title">How QELO-X fits into the node lifecycle.</h2>
            <p className="qx-section__intro qx-section__intro--narrow">
              The product is meant to slot into an operator routine quickly, with a short
              path from deployment to visibility and recovery automation.
            </p>

            <div className="qx-steps">
              {workflow.map((step, index) => (
                <div className="qx-step" key={step}>
                  <span className="qx-step__num">0{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

            <div className="qx-diagram">
              <div className="qx-diagram__label">Operational path</div>
              <div className="qx-diagram__row">[systemd] -&gt; [QELO-X daemon]</div>
              <div className="qx-diagram__row">[metrics loop] -&gt; [CPU | RAM | sync | peers]</div>
              <div className="qx-diagram__row">[local IPC] -&gt; [node process control]</div>
              <div className="qx-diagram__row">[recovery policy] -&gt; [restart | stabilize | alert]</div>
            </div>
        </div>
      </section>

      <section className="qx-section qx-section--alt">
        <div className="qx-container">
          <div className="qx-section__header">
            <div className="qx-section__tag">04 — Comparison</div>
            <h2 className="qx-section__title">What changes compared with manual node management.</h2>
            <p className="qx-section__intro">
              The difference is less about adding another dashboard and more about turning
              node operations into a repeatable operational surface.
            </p>
          </div>

          <div className="qx-compare">
            <div className="qx-compare__head">Area</div>
            <div className="qx-compare__head">Manual approach</div>
            <div className="qx-compare__head qx-compare__head--highlight">QELO-X</div>

            {comparison.map(([label, manual, product]) => (
              <Fragment key={label}>
                <div className="qx-compare__cell qx-compare__cell--label" key={`${label}-label`}>{label}</div>
                <div className="qx-compare__cell" key={`${label}-manual`}>{manual}</div>
                <div className="qx-compare__cell qx-compare__cell--highlight" key={`${label}-product`}>{product}</div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="qx-section">
        <div className="qx-container">
          <div className="qx-cta">
            <div>
              <div className="qx-section__tag">05 — Access</div>
              <h2 className="qx-section__title">A focused product for operators who need reliable node control.</h2>
              <p className="qx-cta__text">
                QELO-X is intended for operators who want a repeatable way to supervise
                blockchain nodes without relying on ad-hoc scripts and manual recovery.
              </p>
            </div>

            <div className="qx-cta__actions">
              <div className="qx-cta__price">
                <span className="qx-cta__price-label">Current release access</span>
                <strong>R$ 199,90</strong>
              </div>
              <button className="qx-btn qx-btn--primary" onClick={() => setIsModalOpen(true)}>
                Request Access
              </button>
            </div>
          </div>
        </div>
      </section>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName="QELO-X ACCESS"
        price="199.90"
      />

      <Footer />
    </div>
  );
}
