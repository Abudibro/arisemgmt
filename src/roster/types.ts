import type { CreatorId, ExportVideo, ResultPair } from './schema.ts';

export type { CreatorId, ResultPair };

export type FormatKey = 'integration' | 'dedicated';

// ---------- the hand-written content file (content.ts) ----------

export interface CreatorContent {
  niche: string | null;
  /** What the channel's content is about, a few sentences. null = use the export's summary. */
  summary: string | null;
  audience: {
    /** 0–100, e.g. 25.2 for 25.2% (same scale as the export) */
    usUkPercent: number | null;
    topCountries: string[];
    ageBand: string | null;
    avgViewDuration: string | null;
  };
  /** One per recentVideos entry in the export, same order. null = use the export's topic (or hide). */
  recentVideoTopics: (string | null)[];
  pastResults: ResultPair[];
  /** Audience numbers copied from the creator's YouTube Studio. null hides the panel. */
  studio: StudioSnapshot | null;
}

export interface Share {
  label: string;
  /** 0–100, as YouTube Studio shows it */
  percent: number;
}

export interface Screenshot {
  /** Path under /public. Crop out anything that identifies the channel. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type ShareKey = 'gender' | 'age' | 'countries' | 'devices';

export interface StudioSnapshot {
  /** Where the numbers come from. Defaults to "YouTube Studio". */
  source?: string;
  /** e.g. "Last 28 days". Applies to every list unless `periods` overrides it. null = not stated. */
  period: string | null;
  /** Per-list override. null = the screenshot didn't say, so no period is shown. */
  periods?: Partial<Record<ShareKey, string | null>>;
  gender: Share[];
  age: Share[];
  countries: Share[];
  /** By watch time */
  devices: Share[];
  screenshots: Screenshot[];
}

export interface Founder {
  name: string;
  role: string;
  /** Square image under /public, shown in a circle */
  photo: string;
  body: string;
}

export interface Step {
  title: string;
  body: string;
  /** Optional small pill next to the title, e.g. "Invoice · first 50%" */
  tag?: string;
}


export interface FormatOffer {
  key: FormatKey;
  name: string;
  /** Short length pill, e.g. "60–90 sec" */
  length: string;
  summary: string;
  bullets: string[];
}

export interface RosterContent {
  creators: Record<CreatorId, CreatorContent>;
  formats: FormatOffer[];
  steps: Step[];
  faq: { question: string; answer: string }[];
  /** The person behind Arise, shown in the closing section. null hides it. */
  founder: Founder | null;
  copy: RosterCopy;
}

export interface RosterCopy {
  nav: { cta: string };
  hero: {
    tag: string;
    headingPrefix: string;
    headingHighlight: string;
    lede: string;
    /** {dataAsOf} → "Oct 2026" */
    footnote: string;
  };
  roster: {
    heading: string;
    sub: string;
    medianViewsLabel: string;
    subscribersLabel: string;
    uploadsLabel: string;
    usUkLabel: string;
    /** Accessible name for the YouTube mark beside each alias */
    platformLabel: string;
  };
  studio: {
    heading: string;
    sub: string;
    /** {source}, {period} */
    periodLabel: string;
    /** Header when the lists cover different periods */
    sourceLabel: string;
    charts: { gender: string; age: string; countries: string; devices: string };
    devicesNote: string;
    screenshotsToggle: string;
    carouselTabsLabel: string;
    carouselPrev: string;
    carouselNext: string;
  };
  whatYouGet: { heading: string; note: string };
  howItWorks: { heading: string };
  terms: { heading: string };
  nextStep: {
    heading: string;
    body: string;
    cta: string;
    mailSubject: string;
    mailBody: string;
    note: string;
  };
}

// ---------- merged data the page renders (merge.ts) ----------

export type RosterVideo = ExportVideo;

export interface RosterCreator {
  id: CreatorId;
  alias: string;
  niche: string | null;
  summary: string | null;
  subscriberCount: number;
  medianViews: number;
  videosAnalysed: number;
  uploadsPerMonth: number;
  recentVideos: RosterVideo[];
  confirmedSponsorshipCount: number;
  formats: Record<FormatKey, number>;
  brandCategories: string[];
  sponsoredViewsVsMedian: number | null;
  audience: CreatorContent['audience'];
  pastResults: ResultPair[];
  studio: StudioSnapshot | null;
}

export interface RosterData {
  dataAsOf: string;
  combinedMedianViews: number;
  combinedUploadsPerMonth: number;
  /** Average of the creators whose usUkPercent is filled in; null if none are. */
  usUkPercent: number | null;
  creators: RosterCreator[];
}
