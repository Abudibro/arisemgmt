import type { CSSProperties } from 'react';
import type { RosterContent, RosterCopy } from '../../roster/types.ts';

interface TermsProps {
  faq: RosterContent['faq'];
  copy: RosterCopy['terms'];
}

export default function Terms({ faq, copy }: TermsProps) {
  if (faq.length === 0) return null;

  return (
    <section className="terms">
      <div className="wrap terms-grid">
        <div className="sec-head terms-head reveal">
          <h2>{copy.heading}</h2>
        </div>
        <div className="faq">
          {faq.map((item, i) => (
            <div className="faq-item reveal" key={item.question} style={{ '--i': i % 2 } as CSSProperties}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
