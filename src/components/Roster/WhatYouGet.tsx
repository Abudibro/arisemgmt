import type { CSSProperties } from 'react';
import type { FormatOffer, RosterCopy } from '../../roster/types.ts';

interface WhatYouGetProps {
  formats: FormatOffer[];
  copy: RosterCopy['whatYouGet'];
}

export default function WhatYouGet({ formats, copy }: WhatYouGetProps) {
  if (formats.length === 0) return null;

  return (
    <section id="what-you-get" className="what-you-get">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>{copy.heading}</h2>
        </div>
        <div className="offer-grid">
          {formats.map((format, i) => (
              <div className="offer reveal" key={format.key} style={{ '--i': i } as CSSProperties}>
                <div className="offer-head">
                  <h3>{format.name}</h3>
                  {format.length && <span className="step-tag">{format.length}</span>}
                </div>
                <p className="offer-summary">{format.summary}</p>
                <ul>
                  {format.bullets.map((bullet) => (
                    <li key={bullet}>
                      <svg className="offer-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
          ))}
        </div>
        {copy.note && <p className="roster-note reveal">{copy.note}</p>}
      </div>
    </section>
  );
}
