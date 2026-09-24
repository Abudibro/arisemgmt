import PillToggle from '../PillToggle/PillToggle.tsx';
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
        <div className="steps">
          {steps.map((step, i) => (
            <div className="step" key={step.title}>
              <div className="num"><span className="hl">{String(i + 1).padStart(2, '0')}</span></div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
