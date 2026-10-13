import { fill, formatDecimal, formatMonth, formatPercentValue, formatViews } from '../../roster/format.ts';
import type { RosterCopy, RosterData } from '../../roster/types.ts';
import '../Hero/Hero.css';

interface RosterHeroProps {
  data: RosterData;
  copy: RosterCopy['hero'];
}

export default function RosterHero({ data, copy }: RosterHeroProps) {
  const stats = [
    { value: formatViews(data.combinedMedianViews), label: copy.stats.combinedMedianViews },
    { value: formatDecimal(data.combinedUploadsPerMonth), label: copy.stats.combinedUploadsPerMonth },
    ...(data.usUkPercent !== null ? [{ value: formatPercentValue(data.usUkPercent), label: copy.stats.usUkPercent }] : []),
  ];

  return (
    <section className="hero roster-hero">
      <div className="wrap">
        <span className="status rise d1"><span className="dot"></span> {copy.tag}</span>
        <h1 className="rise d2">{copy.headingPrefix}<span className="hl">{copy.headingHighlight}</span></h1>
        <p className="lede rise d3">{copy.lede}</p>
        <dl className="hero-stats rise d3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <div className="cta-row rise d4">
          <a href="#roster" className="btn btn-primary btn-lg">{copy.primaryCta}</a>
          <a href="#pricing" className="btn btn-ghost btn-lg">{copy.secondaryCta}</a>
        </div>
        <p className="roster-footnote rise d4">{fill(copy.footnote, { dataAsOf: formatMonth(data.dataAsOf) })}</p>
      </div>
    </section>
  );
}
