import { FOUNDER } from '../../content.ts';
import './Founder.css';

export default function Founder() {
  return (
    <section className="founder">
      <div className="wrap founder-wrap">
        <h2 className="founder-heading">{FOUNDER.heading}</h2>
        <div className="video-frame">
          {/* TODO: VIDEO GOES HERE — paste your embed, e.g.:
              <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="A word from the founders" allowFullScreen></iframe>
              or a Loom/Vimeo embed, or <video src="founders.mp4" controls poster="poster.jpg"></video>
              Then delete the .video-ph block below. */}
          <div className="video-ph">
            <span className="play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </span>
            <div>{FOUNDER.placeholderTitle}</div>
            <small>{FOUNDER.placeholderHint}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
