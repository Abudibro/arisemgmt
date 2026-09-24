import { useRef, useState, type FormEvent } from 'react';
import { EMAIL } from '../../config.ts';
import { CONTACT } from '../../content.ts';
import PillToggle from '../PillToggle/PillToggle.tsx';
import ContactForm from './ContactForm.tsx';
import { CONTACT_FORMS } from './formFields.ts';
import type { Audience } from '../../types.ts';
import './Contact.css';

interface ContactProps {
  audience: Audience;
  onAudienceChange: (audience: Audience) => void;
}

export default function Contact({ audience, onAudienceChange }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [minHeight, setMinHeight] = useState<number | null>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      body.append(key, value.toString());
    }
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
      .then(() => {
        if (rightRef.current) setMinHeight(rightRef.current.offsetHeight);
        setSubmitted(true);
      })
      .catch(() => setError(true));
  }

  function handleAudienceChange(next: Audience) {
    onAudienceChange(next);
    setSubmitted(false);
    setError(false);
    setMinHeight(null);
  }

  const activeForm = CONTACT_FORMS[audience];

  return (
    <section id="contact" className={`audience-${audience}`}>
      <div className="wrap">
        <div className="contact-grid">
          <div className="left">
            <h2>{CONTACT.heading}</h2>
            <p>{CONTACT.body}</p>
            <p className="direct">{CONTACT.directPrefix} <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          </div>
          <div className="right" ref={rightRef} style={minHeight ? { minHeight } : undefined}>
            {!submitted && (
              <PillToggle
                className="contact-toggle"
                value={audience}
                onChange={handleAudienceChange}
                leftValue="brand"
                leftLabel={CONTACT.toggle.brandLabel}
                rightValue="influencer"
                rightLabel={CONTACT.toggle.influencerLabel}
              />
            )}
            {submitted ? (
              <div className="success show" role="status" aria-live="polite">
                <b>{CONTACT.success.title}</b><br />
                {CONTACT.success.body}{' '}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </div>
            ) : (
              <ContactForm key={audience} config={activeForm} onSubmit={handleSubmit} error={error} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
