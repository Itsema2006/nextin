export default function AccordionItem({ section, isOpen, onToggle }) {
  return (
    <div className={`pp-accordion-item ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="pp-accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="pp-accordion-title">
          <span className="pp-accordion-number">{section.number}.</span> {section.title}
        </span>
        <span className="pp-accordion-icon" aria-hidden="true">
          {isOpen ? '\u2212' : '+'}
        </span>
      </button>

      {/* Always mounted so the height transition can animate both ways;
          collapsed via grid-template-rows: 0fr in CSS (no JS measuring needed) */}
      <div className="pp-accordion-collapse" aria-hidden={!isOpen}>
        <div className="pp-accordion-body-inner">
          <div className="pp-accordion-body">{section.body}</div>
        </div>
      </div>
    </div>
  );
}