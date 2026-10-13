import { fill, formatCpm, formatMoney, formatViews } from '../../roster/format.ts';
import type { FormatOffer, RosterCopy, RosterCreator } from '../../roster/types.ts';

interface PricingProps {
  creators: RosterCreator[];
  formats: FormatOffer[];
  copy: RosterCopy['pricing'];
  /** Accessible name for the YouTube mark (shared with the creator cards). */
  platformLabel: string;
}

export default function Pricing({ creators, formats, copy, platformLabel }: PricingProps) {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>{copy.heading}</h2>
          <p>{copy.sub}</p>
        </div>
        <table className="price-table reveal">
          <thead>
            <tr>
              <th scope="col">{copy.creatorColumn}</th>
              {formats.map((format) => <th scope="col" key={format.key}>{format.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {creators.map((c) => (
              <tr id={`pricing-${c.id}`} key={c.id}>
                <th scope="row">
                  <span className="price-alias">
                    {c.alias}
                    <span className="platform-mark platform-mark-sm" role="img" aria-label={platformLabel} title={platformLabel} />
                  </span>
                  {c.niche && <span className="price-niche">{c.niche}</span>}
                  <span className="price-views">{fill(copy.medianViews, { views: formatViews(c.medianViews) })}</span>
                </th>
                {formats.map((format) => {
                  const price = c.prices[format.key];
                  return (
                    <td key={format.key} data-label={format.name}>
                      {price === null ? (
                        <span className="price-on-request">{copy.onRequest}</span>
                      ) : (
                        <>
                          <span className="price">{formatMoney(price)}</span>
                          <span className="price-cpm">{formatCpm(price, c.medianViews)}</span>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {copy.note && <p className="roster-note">{copy.note}</p>}
      </div>
    </section>
  );
}
