import type { CSSProperties } from 'react';
import { EMAIL } from '../../config.ts';
import { mailtoHref } from '../../roster/format.ts';
import type { Founder, RosterCopy } from '../../roster/types.ts';
import FounderCard from '../FounderCard/FounderCard.tsx';

interface NextStepProps {
  copy: RosterCopy['nextStep'];
  founder: Founder | null;
}

export default function NextStep({ copy, founder }: NextStepProps) {
  return (
    <section className="next-step">
      <div className={`wrap next-step-grid${founder ? ' has-founder' : ''}`}>
        <div className="reveal">
          <h2>{copy.heading}</h2>
          <p className="next-step-body">{copy.body}</p>
          <div className="cta-row">
            <a href={mailtoHref(EMAIL, copy.mailSubject, copy.mailBody)} className="btn btn-primary btn-lg" data-email={EMAIL}>{copy.cta}</a>
          </div>
          <p className="roster-note">{copy.note}</p>
        </div>
        {founder && <FounderCard {...founder} className="reveal" style={{ '--i': 1 } as CSSProperties} />}
      </div>
    </section>
  );
}
