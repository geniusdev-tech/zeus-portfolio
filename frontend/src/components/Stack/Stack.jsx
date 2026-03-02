import { stackData } from '../../data';
import './Stack.css';

const LEVEL_CLASS = {
  Expert: 'z-stack__level--expert',
  Proficient: 'z-stack__level--proficient',
  Familiar: 'z-stack__level--familiar',
};

function StackItem({ name, type, level, years }) {
  return (
    <div className="z-stack__item">
      <div className="z-stack__name">{name}</div>
      <div className="z-stack__type">{type}</div>
      <div className="z-stack__footer">
        <span className={`z-stack__level ${LEVEL_CLASS[level] ?? ''}`}>{level}</span>
        <span className="z-stack__years">{years} yrs</span>
      </div>
    </div>
  );
}

export default function Stack() {
  return (
    <div className="z-full" id="stack">
      <div className="z-section">
        {/* Header */}
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag cyan">04 — Technical Stack</div>
          <div className="z-sec-title cyan">
            Tools of the<br />
            <em>Trade.</em>
          </div>
        </div>

        {/* Grid */}
        <div className="z-stack__grid z-reveal">
          {stackData.map((item) => (
            <StackItem key={item.name} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

