import { BRAND } from '../../config.ts';
import { FOOTER } from '../../content.ts';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-in">
        <a href="#top" className="mark foot-mark"><img src="/arise-mark.svg" alt="" />{BRAND}</a>
        <span>{FOOTER.tagline}</span>
        <span>© {new Date().getFullYear()} {BRAND}</span>
      </div>
    </footer>
  );
}
