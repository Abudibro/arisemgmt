import Steps from '../Steps/Steps.tsx';
import type { RosterCopy, Step } from '../../roster/types.ts';

interface HowItWorksProps {
  steps: Step[];
  copy: RosterCopy['howItWorks'];
}

export default function HowItWorks({ steps, copy }: HowItWorksProps) {
  if (steps.length === 0) return null;

  return (
    <section className="how-it-works">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>{copy.heading}</h2>
        </div>
        <Steps steps={steps} itemClassName="reveal" />
      </div>
    </section>
  );
}
