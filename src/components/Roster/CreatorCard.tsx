import type { CSSProperties } from 'react';
import { formatDecimal, formatPercentValue, formatViews } from '../../roster/format.ts';
import type { RosterCopy, RosterCreator } from '../../roster/types.ts';

interface CreatorCardProps {
  creator: RosterCreator;
  copy: RosterCopy['roster'];
  /** Position in the grid, for the staggered reveal. */
  index?: number;
}

/**
 * One creator, built to be skimmed: what they make, then four numbers a brand
 * cares about. Sponsorship history stays off the page on purpose.
 */
export default function CreatorCard({ creator: c, copy, index = 0 }: CreatorCardProps) {
  const stats = [
    { value: formatViews(c.medianViews), label: copy.medianViewsLabel },
    { value: formatViews(c.subscriberCount), label: copy.subscribersLabel },
    { value: formatDecimal(c.uploadsPerMonth), label: copy.uploadsLabel },
    ...(c.audience.usUkPercent !== null
      ? [{ value: formatPercentValue(c.audience.usUkPercent), label: copy.usUkLabel }]
      : []),
  ];

  return (
    <article className="creator-card reveal" id={c.id} aria-labelledby={`${c.id}-name`} style={{ '--i': index } as CSSProperties}>
      <header>
        <div className="creator-title">
          <h3 id={`${c.id}-name`}>{c.alias}</h3>
          <span className="platform-mark" role="img" aria-label={copy.platformLabel} title={copy.platformLabel} />
        </div>
        {c.niche && <p className="creator-niche">{c.niche}</p>}
      </header>

      {c.summary && <p className="creator-summary">{c.summary}</p>}

      <dl className="card-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
