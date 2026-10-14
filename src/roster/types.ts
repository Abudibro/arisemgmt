import type { CreatorId, ExportVideo, ResultPair } from './schema.ts';

export type { CreatorId, ResultPair };

export type FormatKey = 'integration' | 'dedicated';

// ---------- the hand-written content file (content.ts) ----------

export interface CreatorContent {
  niche: string | null;
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
  /** USD per video. null shows "On request". */
  prices: Record<FormatKey, number | null>;
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

export type WhyIcon = 'tools' | 'search' | 'demo';

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
  /** Roster-level proof, e.g. "AI infrastructure brand · dedicated video · 71k views" */
  caseNotes: string[];
  /** Optional brand → square monochrome mark under /public, shown before the brand name. */
  sponsorLogos: Record<string, string>;
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
    stats: { combinedMedianViews: string; combinedUploadsPerMonth: string; usUkPercent: string };
    primaryCta: string;
    secondaryCta: string;
    /** {dataAsOf} → "Oct 2026" */
    footnote: string;
  };
  sponsors: { label: string; pause: string; play: string };
  why: { heading: string; items: (Step & { icon?: WhyIcon })[] };
  roster: {
    heading: string;
    sub: string;
    /** {n} → videos analysed */
    medianViewsLabel: string;
    subscribersLabel: string;
    uploadsLabel: string;
    audienceLabels: { usUkPercent: string; topCountries: string; ageBand: string; avgViewDuration: string };
    /** Accessible name for the YouTube mark beside each alias */
    platformLabel: string;
    recentVideosLabel: string;
    viewsSuffix: string;
    minutesSuffix: string;
    /** {count}, {n} */
    sponsorshipLine: string;
    formatCounts: { integration: [string, string]; dedicated: [string, string] };
    /** {x} → "97%" */
    sponsoredViewsLine: string;
    pastResultsLabel: string;
    /** {alias} */
    pricingLink: string;
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
  proof: { heading: string; statCaption: string; statNote: string };
  whatYouGet: { heading: string; note: string; /** {price} */ fromPrice: string };
  howItWorks: { heading: string };
  pricing: {
    heading: string;
    sub: string;
    creatorColumn: string;
    onRequest: string;
    /** {views} */
    medianViews: string;
    note: string;
  };
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
  prices: Record<FormatKey, number | null>;
  studio: StudioSnapshot | null;
}

export interface RosterData {
  dataAsOf: string;
  brands: { name: string; logoSrc: string | null }[];
  combinedMedianViews: number;
  combinedUploadsPerMonth: number;
  sponsoredViewsVsMedian: number | null;
  /** Average of the creators whose usUkPercent is filled in; null if none are. */
  usUkPercent: number | null;
  caseNotes: string[];
  creators: RosterCreator[];
}
