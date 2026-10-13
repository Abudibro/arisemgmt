import type { CSSProperties } from 'react';
import './Steps.css';

interface StepsProps {
  steps: { title: string; body: string; tag?: string }[];
  className?: string;
  /** Extra class on each step, e.g. "reveal" on the roster page. */
  itemClassName?: string;
}

/** The lime-numbered "01, 02, …" list used by How we work and the roster page. */
export default function Steps({ steps, className = '', itemClassName = '' }: StepsProps) {
  return (
    <div className={`steps ${className}`}>
      {steps.map((step, i) => (
        <div className={`step ${itemClassName}`} key={step.title} style={{ '--i': i } as CSSProperties}>
          <div className="num"><span className="hl">{String(i + 1).padStart(2, '0')}</span></div>
          <div>
            <div className="step-title">
              <h3>{step.title}</h3>
              {step.tag && <span className="step-tag">{step.tag}</span>}
            </div>
            <p>{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
