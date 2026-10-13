import { formatPercent } from '../../roster/format.ts';
import { showProof, showSponsoredRatio } from '../../roster/merge.ts';
import type { RosterCopy, RosterData } from '../../roster/types.ts';

interface ProofProps {
  data: RosterData;
  copy: RosterCopy['proof'];
}

export default function Proof({ data, copy }: ProofProps) {
  if (!showProof(data)) return null;

  const ratio = data.sponsoredViewsVsMedian;

  return (
    <section className="proof">
      <div className="wrap proof-grid">
        <div className="sec-head reveal">
          <h2>{copy.heading}</h2>
        </div>
        <div className="proof-body">
          {showSponsoredRatio(ratio) && (
            <div className="proof-stat reveal">
              <p className="proof-number">{formatPercent(ratio)}</p>
              <div>
                <p className="proof-caption">{copy.statCaption}</p>
                <p className="proof-stat-note">{copy.statNote}</p>
              </div>
            </div>
          )}
          {data.caseNotes.length > 0 && (
            <ul className="case-notes reveal">
              {data.caseNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
