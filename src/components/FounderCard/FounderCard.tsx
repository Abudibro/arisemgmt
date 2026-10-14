import type { CSSProperties } from 'react';
import './FounderCard.css';

interface FounderCardProps {
  name: string;
  role: string;
  /** Square image under /public, shown in a circle */
  photo: string;
  body: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Photo, name and one line about the person behind Arise. Used by the
 * homepage contact section and the roster page's closing section.
 * Text uses spans rather than <p> so section styles like `.contact-grid .left p`
 * don't restyle it.
 */
export default function FounderCard({ name, role, photo, body, className = '', style }: FounderCardProps) {
  return (
    <figure className={`founder-card ${className}`} style={style}>
      <img src={photo} alt={`${name}, ${role}`} width={400} height={400} loading="lazy" />
      <figcaption>
        <span className="founder-name">{name}</span>
        <span className="founder-role">{role}</span>
        <span className="founder-body">{body}</span>
      </figcaption>
    </figure>
  );
}
