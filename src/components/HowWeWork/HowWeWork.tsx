import PillToggle from '../PillToggle/PillToggle.tsx';
import Steps from '../Steps/Steps.tsx';
import { HOW_WE_WORK } from '../../content.ts';
import type { Audience } from '../../types.ts';
import './HowWeWork.css';

interface HowWeWorkProps {
  audience: Audience;
  onAudienceChange: (audience: Audience) => void;
}

export default function HowWeWork({ audience, onAudienceChange }: HowWeWorkProps) {
  const steps = HOW_WE_WORK.steps[audience];

  return (
    <section id="how">
      <div className="wrap">
        <div className="sec-head">
          <h2>{HOW_WE_WORK.heading}</h2>
          <p>{HOW_WE_WORK.subheading}</p>
        </div>
        <PillToggle
          className="how-toggle"
          value={audience}
          onChange={onAudienceChange}
          leftValue="brand"
          leftLabel={HOW_WE_WORK.toggle.brandLabel}
          rightValue="influencer"
          rightLabel={HOW_WE_WORK.toggle.influencerLabel}
        />
        <Steps steps={steps} />
      </div>
    </section>
  );
}
