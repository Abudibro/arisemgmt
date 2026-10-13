import type { CSSProperties } from 'react';
import { fill, formatDecimal, formatMonth, formatPercent, formatPercentValue, formatViews, plural } from '../../roster/format.ts';
import { showSponsoredRatio, visibleRecentVideos } from '../../roster/merge.ts';
import type { FormatKey, RosterCopy, RosterCreator } from '../../roster/types.ts';

interface CreatorCardProps {
  creator: RosterCreator;
  copy: RosterCopy['roster'];
  /** Position in the grid, for the staggered reveal. */
  index?: number;
}

export default function CreatorCard({ creator: c, copy, index = 0 }: CreatorCardProps) {
  const { audience } = c;
  const labels = copy.audienceLabels;
  const audienceItems = [
    audience.usUkPercent !== null && { label: labels.usUkPercent, value: formatPercentValue(audience.usUkPercent) },
    audience.topCountries.length > 0 && { label: labels.topCountries, value: audience.topCountries.join(', ') },
    audience.ageBand && { label: labels.ageBand, value: audience.ageBand },
    audience.avgViewDuration && { label: labels.avgViewDuration, value: audience.avgViewDuration },
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  const videos = visibleRecentVideos(c);

  const formatSplit = (Object.keys(copy.formatCounts) as FormatKey[])
    .filter((key) => c.formats[key] > 0)
    .map((key) => plural(c.formats[key], ...copy.formatCounts[key]))
    .join(', ');

  return (
    <article className="creator-card reveal" id={c.id} aria-labelledby={`${c.id}-name`} style={{ '--i': index } as CSSProperties}>
      <header>
        <div className="creator-title">
          <h3 id={`${c.id}-name`}>{c.alias}</h3>
          <span className="platform-mark" role="img" aria-label={copy.platformLabel} title={copy.platformLabel} />
        </div>
        {c.niche && <p className="creator-niche">{c.niche}</p>}
      </header>

      <dl className="card-stats">
        <div>
          <dt>{fill(copy.medianViewsLabel, { n: c.videosAnalysed })}</dt>
          <dd>{formatViews(c.medianViews)}</dd>
        </div>
        <div>
          <dt>{copy.subscribersLabel}</dt>
          <dd>{formatViews(c.subscriberCount)}</dd>
        </div>
        <div>
          <dt>{copy.uploadsLabel}</dt>
          <dd>{formatDecimal(c.uploadsPerMonth)}</dd>
        </div>
      </dl>

      {audienceItems.length > 0 && (
        <dl className="card-pairs">
          {audienceItems.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {videos.length > 0 && (
        <div className="card-block">
          <h4>{copy.recentVideosLabel}</h4>
          <ul className="card-videos">
            {videos.map((video, i) => (
              <li key={i}>
                <span className="video-topic">{video.topic}</span>
                {' · '}{formatMonth(video.month)}
                {' · '}{formatViews(video.views)} {copy.viewsSuffix}
                {' · '}{Math.round(video.durationMinutes)} {copy.minutesSuffix}
              </li>
            ))}
          </ul>
        </div>
      )}

      {c.confirmedSponsorshipCount > 0 && (
        <div className="card-block">
          <p className="card-sponsorships">
            <strong>{fill(copy.sponsorshipLine, { count: c.confirmedSponsorshipCount, n: c.videosAnalysed })}</strong>
            {formatSplit && <> ({formatSplit})</>}
          </p>
          {c.brandCategories.length > 0 && (
            <ul className="tag-pills">
              {c.brandCategories.map((category) => <li key={category}>{category}</li>)}
            </ul>
          )}
          {showSponsoredRatio(c.sponsoredViewsVsMedian) && (
            <p className="card-ratio">{fill(copy.sponsoredViewsLine, { x: formatPercent(c.sponsoredViewsVsMedian) })}</p>
          )}
        </div>
      )}

      {c.pastResults.length > 0 && (
        <div className="card-block">
          <h4>{copy.pastResultsLabel}</h4>
          <dl className="card-pairs">
            {c.pastResults.map((result) => (
              <div key={result.label}>
                <dt>{result.label}</dt>
                <dd>{result.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <a className="card-link" href={`#pricing-${c.id}`}>{fill(copy.pricingLink, { alias: c.alias })}</a>
    </article>
  );
}
