import { useState, useRef } from 'react';
import { useI18n } from '../../i18n';
import './FAQ.css';

function FAQItem({ q, a, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={`z-faq-item ${isOpen ? 'z-faq-item--open' : ''}`}>
      <button 
        className="z-faq-item__question" 
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <span className="z-faq-item__num">{String(index + 1).padStart(2, '0')}</span>
        <span>{q}</span>
        <div className="z-faq-item__icon">
          <span className="z-faq-icon-line z-faq-icon-line--h"></span>
          <span className="z-faq-icon-line z-faq-icon-line--v"></span>
        </div>
      </button>
      
      <div 
        className="z-faq-item__answer-wrapper"
        style={{
          height: isOpen && contentRef.current ? `${contentRef.current.scrollHeight}px` : '0px'
        }}
      >
        <div className="z-faq-item__answer" ref={contentRef}>
          <div className="z-faq-item__answer-inner">
            <p>{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ data, id = "faq" }) {
  const { content } = useI18n();
  const faqData = data || content.faq;

  if (!faqData) return null;

  return (
    <section id={id} className="z-section z-faq">
      <div className="z-section__header">
        {faqData.sectionTag && <div className="z-section__tag">{faqData.sectionTag}</div>}
        <h2 className="z-section__title">
          {faqData.title}
        </h2>
      </div>

      <div className="z-faq__list">
        {faqData.items.map((item, index) => (
          <FAQItem key={index} index={index} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
}
