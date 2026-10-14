import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { fill, formatShare } from '../../roster/format.ts';
import { creatorsWithStudio } from '../../roster/merge.ts';
import type { RosterCopy, RosterData, Share, ShareKey, StudioSnapshot } from '../../roster/types.ts';

interface StudioAudienceProps {
  data: RosterData;
  copy: RosterCopy['studio'];
  platformLabel: string;
}

/**
 * One series per list, so one hue and no legend. Bars are scaled to 100%
 * (part of the whole) against a faint full-width track, so a 3% share looks
 * like 3%. Every row carries its label and value as text: the list is its
 * own table.
 */
function ShareList({ title, note, shares }: { title: string; note?: string; shares: Share[] }) {
  if (shares.length === 0) return null;
  return (
    <div className="share-list">
      <h4>{title}{note && <span className="share-note"> · {note}</span>}</h4>
      <ul>
        {shares.map((share) => (
          <li key={share.label}>
            <span className="share-label">{share.label}</span>
            <span className="share-value">{formatShare(share.percent)}</span>
            <span className="share-track" aria-hidden="true">
              <span className="share-bar" style={{ '--w': `${Math.min(share.percent, 100)}%` } as CSSProperties} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StudioPanel({ alias, studio, copy, platformLabel }: { alias: string; studio: StudioSnapshot; copy: RosterCopy['studio']; platformLabel: string }) {
  // One period in the header when every list shares it; otherwise each list names its own.
  const mixed = Object.keys(studio.periods ?? {}).length > 0;
  const periodOf = (key: ShareKey) => (studio.periods && key in studio.periods ? studio.periods[key] ?? null : studio.period);
  const noteFor = (key: ShareKey, extra?: string) => {
    const parts = [extra, mixed ? periodOf(key) : null].filter(Boolean);
    return parts.length > 0 ? parts.join(' · ') : undefined;
  };

  return (
    <article className="studio-panel">
      <header className="studio-head">
        <h3 className="price-alias">
          {alias}
          <span className="platform-mark platform-mark-sm" role="img" aria-label={platformLabel} title={platformLabel} />
        </h3>
        <p className="studio-period">
          {mixed || studio.period === null
            ? studio.source ?? copy.sourceLabel
            : fill(copy.periodLabel, { source: studio.source ?? copy.sourceLabel, period: studio.period })}
        </p>
      </header>
      <div className="studio-grid">
        <ShareList title={copy.charts.age} note={noteFor('age')} shares={studio.age} />
        <ShareList title={copy.charts.countries} note={noteFor('countries')} shares={studio.countries} />
        <ShareList title={copy.charts.devices} note={noteFor('devices', copy.devicesNote)} shares={studio.devices} />
        <ShareList title={copy.charts.gender} note={noteFor('gender')} shares={studio.gender} />
      </div>
      {studio.screenshots.length > 0 && (
        <details className="studio-shots">
          <summary>{copy.screenshotsToggle}</summary>
          <div className="studio-shots-grid">
            {studio.screenshots.map((shot) => (
              <a key={shot.src} href={shot.src} target="_blank" rel="noopener">
                <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" />
              </a>
            ))}
          </div>
        </details>
      )}
    </article>
  );
}

export default function StudioAudience({ data, copy, platformLabel }: StudioAudienceProps) {
  const creators = creatorsWithStudio(data);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isCarousel = creators.length > 1;

  // Keep the tabs in sync with swipes and trackpad scrolls, not just clicks.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isCarousel) return;
    // Browsers already fire scroll at most once per frame; with three slides this is cheap.
    const onScroll = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      const distance = (slide: HTMLElement) => Math.abs(slide.offsetLeft - track.scrollLeft);
      setActive(slides.reduce((nearest, slide, i) => (distance(slide) < distance(slides[nearest]) ? i : nearest), 0));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [isCarousel]);

  if (creators.length === 0) return null;

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: slide.offsetLeft, behavior: smooth ? 'smooth' : 'auto' });
    setActive(index);
  };

  return (
    <section className="studio">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>{copy.heading}</h2>
          <p>{copy.sub}</p>
        </div>
        <div
          className={`studio-carousel reveal${isCarousel ? ' is-carousel' : ''}`}
          role={isCarousel ? 'region' : undefined}
          aria-roledescription={isCarousel ? 'carousel' : undefined}
          aria-label={isCarousel ? copy.heading : undefined}
        >
          {isCarousel && (
            <div className="carousel-controls">
              <div className="carousel-tabs" role="group" aria-label={copy.carouselTabsLabel}>
                {creators.map((c, i) => (
                  <button
                    type="button"
                    key={c.id}
                    className={`carousel-tab${i === active ? ' active' : ''}`}
                    aria-pressed={i === active}
                    onClick={() => goTo(i)}
                  >
                    {c.alias}
                  </button>
                ))}
              </div>
              <div className="carousel-arrows">
                <button type="button" className="carousel-arrow" aria-label={copy.carouselPrev} disabled={active === 0} onClick={() => goTo(active - 1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
                </button>
                <button type="button" className="carousel-arrow" aria-label={copy.carouselNext} disabled={active === creators.length - 1} onClick={() => goTo(active + 1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                </button>
              </div>
            </div>
          )}
          <div className="studio-track" ref={trackRef}>
            {creators.map((c, i) => c.studio && (
              <div
                className="studio-slide"
                key={c.id}
                role={isCarousel ? 'group' : undefined}
                aria-roledescription={isCarousel ? 'slide' : undefined}
                aria-label={isCarousel ? `${c.alias}, ${i + 1} of ${creators.length}` : undefined}
              >
                <StudioPanel alias={c.alias} studio={c.studio} copy={copy} platformLabel={platformLabel} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
