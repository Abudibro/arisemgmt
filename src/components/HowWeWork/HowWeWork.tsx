import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import PillToggle from '../PillToggle/PillToggle.tsx';
import { HOW_WE_WORK, type StepIcon } from '../../content.ts';
import type { Audience } from '../../types.ts';
import './HowWeWork.css';

interface HowWeWorkProps {
  audience: Audience;
  onAudienceChange: (audience: Audience) => void;
}

// Line icons, 24×24, drawn with currentColor strokes.
const ICONS: Record<StepIcon, string> = {
  chat: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z M8.5 12h.01 M12 12h.01 M15.5 12h.01',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z M20 20l-4-4',
  clipboard: 'M9 4h6v3H9z M7 5.5H5.5v15h13v-15H17 M9 12l2 2 4-4',
  chart: 'M4 20V4 M4 20h16 M8 16v-4 M12 16V8 M16 16v-6',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1 M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  contract: 'M14 3H6v18h12V7z M14 3v4h4 M9 13h6 M9 17h4',
  wallet: 'M4 7h15v12H4z M4 7l11-3v3 M15 13h4',
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * How far the reader has scrolled through the list, 0–1, measured at 60% of
 * the viewport height. Drives the lime fill down the rail.
 */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 1 : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const line = window.innerHeight * 0.6;
      setProgress(Math.min(Math.max((line - rect.top) / rect.height, 0), 1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return [ref, progress] as const;
}

/** Moves the card's lime spotlight to the cursor. */
function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function HowWeWork({ audience, onAudienceChange }: HowWeWorkProps) {
  const steps = HOW_WE_WORK.steps[audience];
  const cta = HOW_WE_WORK.cta[audience];
  const [listRef, progress] = useScrollProgress<HTMLOListElement>();
  // A step lights up once the fill reaches its node (nodes sit near the top of each step).
  const reached = (i: number) => progress >= (i + 0.15) / steps.length;

  return (
    <section id="how" className="how">
      <div className="wrap how-grid">
        <div className="how-side">
          <div className="sec-head">
            <h2>{HOW_WE_WORK.heading}</h2>
            <p>{HOW_WE_WORK.subheading}</p>
          </div>
          <PillToggle
            className="how-toggle"
            value={audience}
            onChange={onAudienceChange}
            leftValue="brand"
            leftLabel={HOW_WE_WORK.toggle.brandLabel}
            rightValue="influencer"
            rightLabel={HOW_WE_WORK.toggle.influencerLabel}
          />
        </div>

        <div>
          <ol
            key={audience}
            ref={listRef}
            className="timeline"
            style={{ '--fill': progress } as CSSProperties}
          >
            {steps.map((step, i) => (
              <li
                key={step.title}
                className={`tl-step${reached(i) ? ' is-reached' : ''}`}
                style={{ '--i': i } as CSSProperties}
              >
                <span className="tl-node" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <article className="tl-card" onPointerMove={trackSpotlight}>
                  <div className="tl-head">
                    <span className="tl-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d={ICONS[step.icon]} />
                      </svg>
                    </span>
                    <h3>{step.title}</h3>
                  </div>
                  <p>{step.body}</p>
                  <ul className="tl-chips">
                    {step.chips.map((chip) => <li key={chip}>{chip}</li>)}
                  </ul>
                </article>
              </li>
            ))}
          </ol>

          <div className="how-cta">
            <p>{cta.text}</p>
            <a href="#contact" className="btn btn-primary">{cta.button}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
