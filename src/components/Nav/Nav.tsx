import { BRAND } from '../../config.ts';
import { CTA, NAV } from '../../content.ts';
import './Nav.css';

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a href="#top" className="mark">
          <img src="/arise-mark-light.svg" alt={BRAND} />
        </a>
        <nav className="nav-links">
          <a href="#how" className="text">{NAV.howWeWorkLink}</a>
          <a href="#contact" className="btn btn-primary">{CTA.bookACall}</a>
        </nav>
      </div>
    </header>
  );
}
