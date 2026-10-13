import { BRAND } from '../../config.ts';
import { CTA, NAV } from '../../content.ts';
import './Nav.css';

interface NavProps {
  /** Right-hand button. Defaults to the homepage's "Book a call". */
  cta?: { label: string; href: string };
  showHowLink?: boolean;
}

export default function Nav({ cta = { label: CTA.bookACall, href: '#contact' }, showHowLink = true }: NavProps) {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a href="#top" className="mark">
          <img src="/arise-mark-light.svg" alt={BRAND} />
        </a>
        <nav className="nav-links">
          {showHowLink && <a href="#how" className="text">{NAV.howWeWorkLink}</a>}
          <a href={cta.href} className="btn btn-primary">{cta.label}</a>
        </nav>
      </div>
    </header>
  );
}
