import { expertiseData } from '../../data';
import './Expertise.css';

export default function Expertise() {
  return (
    <div className="z-full" id="expertise">
      <div className="z-section">
        {/* Header */}
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag cyan">02 — Capability Matrix</div>
          <div className="z-sec-title cyan">
            Operational Domains<br />
            <em>I Operate In.</em>
          </div>
        </div>

        {/* Grid */}
        <div className="z-exp__grid z-reveal">
          {expertiseData.map((card) => (
            <div className="z-exp__card" key={card.num}>
              <div className="z-exp__num">{card.num}</div>
              <div className="z-exp__title">{card.title}</div>
              <ul className="z-exp__list">
                {card.items.map((item) => (
                  <li className="z-exp__item" key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Placeholder cell */}
          <div className="z-exp__card z-exp__card--empty">
            <div className="z-exp__empty-label">Additional capabilities on request</div>
          </div>
        </div>
      </div>
    </div>
  );
}
