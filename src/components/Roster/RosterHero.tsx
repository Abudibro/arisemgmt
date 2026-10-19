import { fill, formatMonth } from '../../roster/format.ts';
import type { RosterCopy, RosterData } from '../../roster/types.ts';
import '../Hero/Hero.css';

interface RosterHeroProps {
  data: RosterData;
  copy: RosterCopy['hero'];
}

/** A compact title block: the page reads like a deck, so the creators come straight after. */
export default function RosterHero({ data, copy }: RosterHeroProps) {
  return (
    <section className="hero roster-hero">
      <div className="wrap">
        <span className="status rise d1"><span className="dot"></span> {copy.tag}</span>
        <h1 className="rise d2">{copy.headingPrefix}<span className="hl">{copy.headingHighlight}</span></h1>
        <p className="lede rise d3">{copy.lede}</p>
        <p className="roster-footnote rise d4">{fill(copy.footnote, { dataAsOf: formatMonth(data.dataAsOf) })}</p>
      </div>
    </section>
  );
}
