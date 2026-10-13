import type { RosterCopy, RosterCreator } from '../../roster/types.ts';
import CreatorCard from './CreatorCard.tsx';

interface RosterCardsProps {
  creators: RosterCreator[];
  copy: RosterCopy['roster'];
}

export default function RosterCards({ creators, copy }: RosterCardsProps) {
  return (
    <section id="roster">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>{copy.heading}</h2>
          <p>{copy.sub}</p>
        </div>
        <div className="creator-grid">
          {creators.map((creator, i) => <CreatorCard key={creator.id} creator={creator} copy={copy} index={i} />)}
        </div>
      </div>
    </section>
  );
}
