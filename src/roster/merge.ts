// Combines the tool's export with the hand-written content into the one
// shape the page renders. Hand-written values win whenever they're filled in.
// Also holds the show/hide rules, so components stay dumb and the rules are
// testable.

import type { DeckExport } from './schema.ts';
import type { RosterContent, RosterCreator, RosterData } from './types.ts';

/** Sponsored-vs-median ratios below this aren't shown — a weak number reads worse than none. */
export const SPONSORED_RATIO_MIN = 0.8;

/** How many recent videos a creator card lists. */
export const RECENT_VIDEOS_SHOWN = 3;

const filledText = (v: string | null | undefined): string | null => (v && v.trim() ? v.trim() : null);
const pickText = (manual: string | null | undefined, fromExport: string | null | undefined) =>
  filledText(manual) ?? filledText(fromExport);
const pickNum = (manual: number | null | undefined, fromExport: number | null | undefined) =>
  manual ?? fromExport ?? null;
const pickList = <T>(manual: T[], fromExport: T[]): T[] => (manual.length > 0 ? manual : fromExport);

export function mergeRoster(data: DeckExport, content: RosterContent): RosterData {
  const creators: RosterCreator[] = data.creators.map((c) => {
    const manual = content.creators[c.id];
    return {
      id: c.id,
      alias: c.alias,
      niche: pickText(manual.niche, c.niche),
      subscriberCount: c.subscriberCount,
      medianViews: c.medianViews,
      videosAnalysed: c.videosAnalysed,
      uploadsPerMonth: c.uploadsPerMonth,
      recentVideos: c.recentVideos.map((video, i) => ({
        ...video,
        topic: pickText(manual.recentVideoTopics[i], video.topic),
      })),
      confirmedSponsorshipCount: c.confirmedSponsorshipCount,
      formats: c.formats,
      brandCategories: c.brandCategories.filter((cat) => filledText(cat)),
      sponsoredViewsVsMedian: c.sponsoredViewsVsMedian,
      audience: {
        usUkPercent: pickNum(manual.audience.usUkPercent, c.audience.usUkPercent),
        topCountries: pickList(manual.audience.topCountries, c.audience.topCountries).filter((x) => filledText(x)),
        ageBand: pickText(manual.audience.ageBand, c.audience.ageBand),
        avgViewDuration: pickText(manual.audience.avgViewDuration, c.audience.avgViewDuration),
      },
      pastResults: pickList(manual.pastResults, c.pastResults).filter((r) => filledText(r.label) && filledText(r.value)),
      prices: manual.prices,
      studio: manual.studio,
    };
  });

  const usUk = creators.map((c) => c.audience.usUkPercent).filter((v): v is number => v !== null);

  return {
    dataAsOf: data.dataAsOf,
    brands: data.roster.brands
      .filter((name) => filledText(name))
      .map((name) => ({ name, logoSrc: filledText(content.sponsorLogos[name]) })),
    combinedMedianViews: data.roster.combinedMedianViews,
    combinedUploadsPerMonth: data.roster.combinedUploadsPerMonth,
    sponsoredViewsVsMedian: data.roster.sponsoredViewsVsMedian,
    usUkPercent: usUk.length > 0 ? usUk.reduce((a, b) => a + b, 0) / usUk.length : null,
    caseNotes: content.caseNotes.filter((note) => filledText(note)),
    creators,
  };
}

// ---------- show/hide rules ----------

export const showSponsoredRatio = (ratio: number | null): ratio is number =>
  ratio !== null && ratio >= SPONSORED_RATIO_MIN;

export const visibleRecentVideos = (creator: RosterCreator) =>
  creator.recentVideos.slice(0, RECENT_VIDEOS_SHOWN).filter((video) => video.topic !== null);

export const creatorsWithStudio = (data: RosterData) => data.creators.filter((c) => c.studio !== null);

export const showProof = (data: RosterData) =>
  showSponsoredRatio(data.sponsoredViewsVsMedian) || data.caseNotes.length > 0;

// ---------- dev-only: what's still left to fill in ----------

/** Human-readable list of every unfilled field, for the dev banner. */
export function listUnfilled(data: RosterData): string[] {
  const missing: string[] = [];
  if (data.brands.length === 0) missing.push('Roster: brands (export)');
  if (data.sponsoredViewsVsMedian === null) missing.push('Roster: sponsoredViewsVsMedian (export)');
  if (data.caseNotes.length === 0) missing.push('Roster: caseNotes');

  for (const c of data.creators) {
    const add = (field: string) => missing.push(`${c.alias}: ${field}`);
    if (c.niche === null) add('niche');
    if (c.audience.usUkPercent === null) add('audience.usUkPercent');
    if (c.audience.topCountries.length === 0) add('audience.topCountries');
    if (c.audience.ageBand === null) add('audience.ageBand');
    if (c.audience.avgViewDuration === null) add('audience.avgViewDuration');
    const missingTopics = c.recentVideos
      .slice(0, RECENT_VIDEOS_SHOWN)
      .flatMap((video, i) => (video.topic === null ? [i + 1] : []));
    if (missingTopics.length > 0) add(`recentVideoTopics (video ${missingTopics.join(', ')})`);
    if (c.pastResults.length === 0) add('pastResults');
    if (c.sponsoredViewsVsMedian === null) add('sponsoredViewsVsMedian (export)');
    if (c.prices.integration === null) add('prices.integration (shows "On request")');
    if (c.prices.dedicated === null) add('prices.dedicated (shows "On request")');
    if (c.studio === null) add('studio (YouTube Studio audience panel)');
  }
  return missing;
}
