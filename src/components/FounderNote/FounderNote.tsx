import { FOUNDER_NOTE, FOUNDER_PROFILE } from '../../content.ts';
import './FounderNote.css';

export default function FounderNote() {
  return (
    <section className="founder-note">
      <div className="wrap founder-note-grid">
        <img
          className="founder-note-photo"
          src={FOUNDER_PROFILE.photo}
          alt={`${FOUNDER_PROFILE.name}, ${FOUNDER_PROFILE.role}`}
          width={400}
          height={400}
          loading="lazy"
        />
        <div>
          <span className="founder-note-eyebrow">{FOUNDER_NOTE.eyebrow}</span>
          <h2>{FOUNDER_NOTE.heading}</h2>
          {FOUNDER_NOTE.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <p className="founder-note-sign">
            <span className="founder-name">{FOUNDER_PROFILE.name}</span>
            <span className="founder-role">{FOUNDER_PROFILE.role}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
