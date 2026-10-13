import { EMAIL } from '../../config.ts';
import { mailtoHref } from '../../roster/format.ts';
import type { RosterCopy } from '../../roster/types.ts';

interface NextStepProps {
  copy: RosterCopy['nextStep'];
}

export default function NextStep({ copy }: NextStepProps) {
  return (
    <section className="next-step">
      <div className="wrap reveal">
        <h2>{copy.heading}</h2>
        <p className="next-step-body">{copy.body}</p>
        <div className="cta-row">
          <a href={mailtoHref(EMAIL, copy.mailSubject, copy.mailBody)} className="btn btn-primary btn-lg" data-email={EMAIL}>{copy.cta}</a>
        </div>
        <p className="roster-note">{copy.note}</p>
      </div>
    </section>
  );
}
