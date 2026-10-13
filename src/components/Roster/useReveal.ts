import { useEffect } from 'react';

/**
 * Fades `.reveal` elements up as they scroll into view, with the same easing
 * as the hero's `.rise`. The hidden state only applies under
 * prefers-reduced-motion: no-preference (see Roster.css), so reduced-motion
 * visitors and print always see everything.
 */
export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
