import { useI18n } from '../../i18n';
import './Expertise.css';

export default function Expertise() {
  const { content } = useI18n();
  const { expertise } = content;

  return (
    <div className="z-full" id="expertise">
      <div className="z-section">
        {/* Header */}
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag cyan">{expertise.sectionTag}</div>
          <div className="z-sec-title cyan">
            {expertise.titlePrefix}<br />
            <em>{expertise.titleEmphasis}</em>
          </div>
        </div>

        {/* Grid */}
        <div className="z-exp__grid z-reveal">
          {expertise.cards.map((card) => (
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
            <div className="z-exp__empty-label">{expertise.placeholder}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
