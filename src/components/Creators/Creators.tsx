import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { HOME_CREATORS } from '../../content.ts';
import './Creators.css';

const COUNT_MS = 1400;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** True once the element has scrolled into view (immediately under reduced motion). */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(prefersReducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return [ref, inView] as const;
}

function CountUp({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : 0));

  useEffect(() => {
    if (!run || prefersReducedMotion()) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_MS, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3)))); // ease-out cubic
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, to]);

  return <>{value}{suffix}</>;
}

/** Moves the card's lime spotlight to the cursor. */
function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

function BrandRow({ brands, reverse }: { brands: string[]; reverse?: boolean }) {
  const items = (hidden: boolean) =>
    brands.map((brand) => {
      const logo = HOME_CREATORS.logos[brand];
      return (
        <li key={brand} aria-hidden={hidden || undefined}>
          {logo && (
            <span className="brand-mark" aria-hidden="true" style={{ '--mark': `url(${logo})` } as CSSProperties} />
          )}
          {brand}
        </li>
      );
    });

  // Rendered twice so the drift loops without a gap; the copy is hidden from screen readers.
  return (
    <div className="marquee">
      <ul className={`marquee-track${reverse ? ' is-reverse' : ''}`}>
        {items(false)}
        {items(true)}
      </ul>
    </div>
  );
}

export default function Creators() {
  const [sectionRef, inView] = useInView<HTMLElement>();
  const { labels, brands } = HOME_CREATORS;
  const half = Math.ceil(brands.length / 2);

  return (
    <section id="creators" ref={sectionRef} className={`creators${inView ? ' in' : ''}`}>
      <div className="wrap">
        <div className="sec-head">
          <h2>{HOME_CREATORS.heading}</h2>
          <p>{HOME_CREATORS.sub}</p>
        </div>

        <dl className="creators-stats">
          {HOME_CREATORS.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd><CountUp to={s.to} suffix={s.suffix} run={inView} /></dd>
            </div>
          ))}
        </dl>

        <ul className="creators-grid">
          {HOME_CREATORS.creators.map((c, i) => (
            <li
              key={c.niche}
              className="creator"
              style={{ '--card': i } as CSSProperties}
              onPointerMove={trackSpotlight}
            >
              <span className="creator-platform">
                <span className="creator-yt" aria-hidden="true" />
                YouTube
              </span>
              <h3>{c.niche}</h3>
              <dl className="creator-numbers">
                <div><dd>{c.subscribers}</dd><dt>{labels.subscribers}</dt></div>
                <div><dd>{c.medianViews}</dd><dt>{labels.medianViews}</dt></div>
                <div><dd>{c.uploadsPerMonth}</dd><dt>{labels.uploadsPerMonth}</dt></div>
              </dl>
            </li>
          ))}
        </ul>

        <div className="creators-brands">
          <p>{HOME_CREATORS.brandsLabel}</p>
          <BrandRow brands={brands.slice(0, half)} />
          <BrandRow brands={brands.slice(half)} reverse />
        </div>

        <p className="creators-foot">{HOME_CREATORS.footnote}</p>
      </div>
    </section>
  );
}
