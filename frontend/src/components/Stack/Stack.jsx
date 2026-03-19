import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Code2,
  Container,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  HardDrive,
  Layers3,
  MonitorCog,
  Network,
  ServerCog,
  TerminalSquare,
  Waypoints,
} from 'lucide-react';
import { stackData } from '../../data';
import './Stack.css';

const ICON_MAP = {
  Linux: HardDrive,
  Go: Code2,
  systemd: ServerCog,
  'Shell Scripting': TerminalSquare,
  Networking: Network,
  'Infra Architecture': Layers3,
  Monitoring: MonitorCog,
  Python: FileCode2,
  JavaScript: Globe,
  TypeScript: FileCode2,
  React: Code2,
  'Next.js': Layers3,
  'Node.js': Waypoints,
  Express: Waypoints,
  MongoDB: Database,
  MySQL: Database,
  Docker: Container,
  AWS: Cloud,
  Azure: Cloud,
  Java: Code2,
  'C++': Code2,
  'Tailwind CSS': Layers3,
  Git: GitBranch,
};

const ITEMS_PER_PAGE = 9;

function chunkStack(items) {
  const pages = [];

  for (let index = 0; index < items.length; index += ITEMS_PER_PAGE) {
    pages.push(items.slice(index, index + ITEMS_PER_PAGE));
  }

  return pages;
}

function StackItem({ name, type, pct, years, accent }) {
  const Icon = ICON_MAP[name] ?? Code2;

  return (
    <div className={`z-stack__item z-stack__item--${accent}`}>
      <div className="z-stack__icon-wrap">
        <Icon className="z-stack__icon" strokeWidth={1.8} />
      </div>
      <div className="z-stack__head">
        <div>
          <div className="z-stack__name">{name}</div>
          <div className="z-stack__type">{type}</div>
        </div>
        <span className="z-stack__pct">{pct}%</span>
      </div>
      <div className="z-stack__bar">
        <span className="z-stack__bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="z-stack__footer">
        <span className="z-stack__years">{years} yrs</span>
        <span className="z-stack__meta">GitHub + production</span>
      </div>
    </div>
  );
}

export default function Stack() {
  const pages = useMemo(() => chunkStack(stackData), []);
  const [pageIndex, setPageIndex] = useState(0);

  const handlePrev = () => {
    setPageIndex((current) => (current - 1 + pages.length) % pages.length);
  };

  const handleNext = () => {
    setPageIndex((current) => (current + 1) % pages.length);
  };

  return (
    <section className="z-stack" id="stack">
      <div className="z-section">
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag cyan">03 — Technical Stack</div>
          <div className="z-sec-title cyan">
            Core Tools
            <br />
            <em>and Operating Surface.</em>
          </div>
          <p className="z-stack__intro">
            The stack is intentionally compact: infrastructure-first tools, practical
            languages and platforms that hold up in production. This section now mixes
            core tools with the technologies shown on GitHub, all with a direct percentage view.
          </p>
        </div>

        <div className="z-stack__carousel z-reveal">
          <div className="z-stack__carousel-topbar">
            <span className="z-stack__carousel-label">Slide through the stack manually</span>
            <div className="z-stack__controls">
              <button type="button" className="z-stack__arrow" onClick={handlePrev} aria-label="Previous stack page">
                <ArrowLeft size={18} />
              </button>
              <div className="z-stack__dots" aria-label="Stack carousel pages">
                {pages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`z-stack__dot${index === pageIndex ? ' active' : ''}`}
                    onClick={() => setPageIndex(index)}
                    aria-label={`Go to stack page ${index + 1}`}
                  />
                ))}
              </div>
              <button type="button" className="z-stack__arrow" onClick={handleNext} aria-label="Next stack page">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="z-stack__viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={pageIndex}
                className="z-stack__grid"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.42, ease: 'easeOut' }}
              >
                {pages[pageIndex].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: index * 0.035 }}
                  >
                    <StackItem {...item} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
