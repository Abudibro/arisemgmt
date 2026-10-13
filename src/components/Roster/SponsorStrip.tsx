import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { RosterCopy, RosterData } from '../../roster/types.ts';

const SPEED = 28; // px/s the rail drifts left
const RESUME_AFTER = 1600; // ms after a swipe/scroll before drifting again

interface SponsorStripProps {
  brands: RosterData['brands'];
  copy: RosterCopy['sponsors'];
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Past sponsors as a rail that drifts on its own and can be swiped or
 * scrolled by hand. The list is rendered twice so the drift loops without a
 * gap; the copy is hidden from screen readers. With reduced motion, or when
 * every brand already fits, it's a plain static row.
 */
export default function SponsorStrip({ brands, copy }: SponsorStripProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [reduceMotion] = useState(prefersReducedMotion);
  const [overflowing, setOverflowing] = useState(false);
  const [paused, setPaused] = useState(false);
  const moving = overflowing && !reduceMotion;

  // Only loop when the brands don't fit on one line.
  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;
    const measure = () => setOverflowing(track.scrollWidth > rail.clientWidth + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, [brands]);

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track || !moving || paused) return;

    let frame = 0;
    let last = performance.now();
    let pos = rail.scrollLeft; // tracked separately: scrollLeft rounds to whole pixels
    let holding = false;
    let visible = true;
    let resumeTimer = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      const loop = track.offsetWidth; // one copy of the list, including its trailing gap
      pos = holding ? rail.scrollLeft : pos + SPEED * dt;
      // Past the first copy, jump back by one copy — the second copy looks identical.
      if (loop > 0 && pos >= loop) {
        pos -= loop;
        rail.scrollLeft = pos;
      } else if (!holding) {
        rail.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };
    const play = () => {
      if (visible && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Hand control to the person while they hover, swipe or scroll.
    const hold = () => {
      holding = true;
      window.clearTimeout(resumeTimer);
    };
    const release = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => (holding = false), RESUME_AFTER);
    };
    const nudge = () => {
      hold();
      release();
    };
    const onEnter = (e: PointerEvent) => e.pointerType === 'mouse' && hold();
    const onLeave = (e: PointerEvent) => e.pointerType === 'mouse' && release();

    rail.addEventListener('pointerenter', onEnter);
    rail.addEventListener('pointerleave', onLeave);
    rail.addEventListener('touchstart', hold, { passive: true });
    rail.addEventListener('touchend', release, { passive: true });
    rail.addEventListener('wheel', nudge, { passive: true });

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else stop();
    });
    visibility.observe(rail);
    play();

    return () => {
      stop();
      window.clearTimeout(resumeTimer);
      visibility.disconnect();
      rail.removeEventListener('pointerenter', onEnter);
      rail.removeEventListener('pointerleave', onLeave);
      rail.removeEventListener('touchstart', hold);
      rail.removeEventListener('touchend', release);
      rail.removeEventListener('wheel', nudge);
    };
  }, [moving, paused]);

  if (brands.length === 0) return null;

  const items = brands.map((brand) => (
    <li className="sponsor" key={brand.name}>
      {brand.logoSrc && (
        <span
          className="sponsor-mark"
          aria-hidden="true"
          style={{ '--mark': `url("${brand.logoSrc}")` } as CSSProperties}
        />
      )}
      {brand.name}
    </li>
  ));

  return (
    <section className="sponsors" aria-label={copy.label}>
      <div className="wrap">
        <div className="sponsors-head">
          <p className="sponsors-label">{copy.label}</p>
          {moving && (
            <button
              type="button"
              className="rail-toggle"
              aria-pressed={paused}
              aria-label={paused ? copy.play : copy.pause}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
              )}
            </button>
          )}
        </div>
        <div className={`sponsor-rail${moving ? ' is-moving' : ''}`} ref={railRef}>
          <ul className="sponsor-track" ref={trackRef}>{items}</ul>
          {moving && <ul className="sponsor-track" aria-hidden="true">{items}</ul>}
        </div>
      </div>
    </section>
  );
}
