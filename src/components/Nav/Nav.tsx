import { BRAND } from '../../config.ts';
import { CTA, NAV } from '../../content.ts';
import './Nav.css';

interface NavProps {
  /** Which page this nav sits on, so its own link is marked as current. */
  page?: 'home' | 'roster';
}

/**
 * The same nav on every page. Links go through "/" so they work from /roster
 * too; on the homepage they just scroll.
 */
export default function Nav({ page = 'home' }: NavProps) {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a href="/#top" className="mark">
          <img src="/arise-mark-light.svg" alt={BRAND} />
        </a>
        <nav className="nav-links">
          <a href="/#how" className="text">{NAV.howWeWorkLink}</a>
          <a
            href={NAV.rosterHref}
            className="text text-keep"
            aria-current={page === 'roster' ? 'page' : undefined}
          >
            {NAV.rosterLink}
          </a>
          <a href="/#contact" className="btn btn-primary">{CTA.bookACall}</a>
        </nav>
      </div>
    </header>
  );
}
