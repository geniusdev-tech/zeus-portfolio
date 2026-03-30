import { useMemo, useState, useRef } from 'react';
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
import { useI18n } from '../../i18n';
import { useAutoScroll } from '../../hooks';
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
  const { content } = useI18n();
  const { stack } = content;
  const Icon = ICON_MAP[name] ?? Code2;

  return (
    <div className={`z-stack__item z-stack__item--${accent}`}>
      <div className="z-stack__icon-wrap">
        <Icon className="z-stack__icon" strokeWidth={1.8} />
      </div>
      <div className="z-stack__head">
        <div>
          <h3 className="z-stack__name">{name}</h3>
          <div className="z-stack__type">{type}</div>
        </div>
        <span className="z-stack__pct">{pct}%</span>
      </div>
      <div className="z-stack__bar">
        <span
          className="z-stack__bar-fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={pct}
          aria-label={stack.proficiencyLabel(name)}
        />
      </div>
      <div className="z-stack__footer">
        <span className="z-stack__years">{years} {stack.yearsSuffix}</span>
        <span className="z-stack__meta">{stack.meta}</span>
      </div>
    </div>
  );
}

export default function Stack() {
  const { content } = useI18n();
  const { stack } = content;
  const scrollRef = useRef(null);

  const { onWheel, onTouchStart, onMouseEnter, onFocusCapture, onScroll } = useAutoScroll({
    scrollRef,
    speed: 0.45,
    pauseDelay: 2200,
  });

  return (
    <section className="z-stack" id="stack">
      <div className="z-section">
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag cyan">{stack.sectionTag}</div>
          <h2 className="z-sec-title cyan">
            {stack.titlePrefix}
            <br />
            <em>{stack.titleEmphasis}</em>
          </h2>
          <p className="z-stack__intro">{stack.intro}</p>
        </div>

        <div 
          className="z-stack__vertical-scroll z-reveal"
          ref={scrollRef}
          onWheel={onWheel}
          onTouchStart={onTouchStart}
          onMouseEnter={onMouseEnter}
          onFocusCapture={onFocusCapture}
          onScroll={onScroll}
        >
          <div className="z-stack__vertical-scroll-content">
            {stack.items.map((item) => (
              <StackItem key={item.name} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
