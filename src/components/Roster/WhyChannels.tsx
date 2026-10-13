import type { CSSProperties, ReactElement } from 'react';
import type { RosterCopy, WhyIcon } from '../../roster/types.ts';

interface WhyChannelsProps {
  copy: RosterCopy['why'];
}

// Simple line icons, drawn to match the site's 1.6px stroke weight.
const ICONS: Record<WhyIcon, ReactElement> = {
  tools: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  demo: (
    <>
      <rect x="2.5" y="3.5" width="19" height="13" rx="2" />
      <path d="M8 20.5h8M12 16.5v4M10.25 7.5v5l4.25-2.5z" />
    </>
  ),
};

export default function WhyChannels({ copy }: WhyChannelsProps) {
  if (copy.items.length === 0) return null;

  return (
    <section className="why">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>{copy.heading}</h2>
        </div>
        <div className="why-grid">
          {copy.items.map((item, i) => (
            <div className="why-item reveal" key={item.title} style={{ '--i': i } as CSSProperties}>
              {item.icon && (
                <span className="why-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[item.icon]}
                  </svg>
                </span>
              )}
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
