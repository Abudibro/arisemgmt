import type { CSSProperties } from 'react';
import type { RosterCopy } from '../../roster/types.ts';

interface StartOptionsProps {
  copy: RosterCopy['start'];
}

/** Two ways to begin: one test video, or a 3-video series with a discount. */
export default function StartOptions({ copy }: StartOptionsProps) {
  return (
    <section id="start" className="start-options">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>{copy.heading}</h2>
          <p>{copy.sub}</p>
        </div>
        <div className="option-grid">
          {copy.options.map((option, i) => (
            <div
              key={option.title}
              className={`option reveal${option.featured ? ' is-featured' : ''}`}
              style={{ '--i': i } as CSSProperties}
            >
              <div className="option-top">
                <span className="option-label">{option.label}</span>
                {option.badge && <span className="option-badge">{option.badge}</span>}
              </div>
              <h3>{option.title}</h3>
              <p>{option.body}</p>
            </div>
          ))}
        </div>
        <div className="option-notes reveal">
          <p className="option-report">{copy.report}</p>
          <p>{copy.rates}</p>
        </div>
      </div>
    </section>
  );
}
