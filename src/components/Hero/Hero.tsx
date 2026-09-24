import { CTA, HERO } from '../../content.ts';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <span className="status rise d1"><span className="dot"></span> {HERO.status}</span>
        <h1 className="rise d2">{HERO.headingPrefix}<span className="hl">{HERO.headingHighlight}</span>{HERO.headingSuffix}</h1>
        <p className="lede rise d3">{HERO.lede}</p>
        <div className="cta-row rise d4">
          <a href="#contact" className="btn btn-primary btn-lg">{CTA.bookACall}</a>
          <a href="#how" className="btn btn-ghost btn-lg">{HERO.secondaryCta}</a>
        </div>
      </div>
    </section>
  );
}
