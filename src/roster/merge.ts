// Combines the tool's export with the hand-written content into the one
// shape the page renders. Hand-written values win whenever they're filled in.
// Also holds the show/hide rules, so components stay dumb and the rules are
// testable.

import type { DeckExport } from './schema.ts';
import type { RosterContent, RosterCreator, RosterData } from './types.ts';

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
      summary: pickText(manual.summary, c.summary),
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
      studio: manual.studio,
    };
  });

  const usUk = creators.map((c) => c.audience.usUkPercent).filter((v): v is number => v !== null);

  return {
    dataAsOf: data.dataAsOf,
    combinedMedianViews: data.roster.combinedMedianViews,
    combinedUploadsPerMonth: data.roster.combinedUploadsPerMonth,
    usUkPercent: usUk.length > 0 ? usUk.reduce((a, b) => a + b, 0) / usUk.length : null,
    creators,
  };
}

// ---------- show/hide rules ----------

export const visibleRecentVideos = (creator: RosterCreator) =>
  creator.recentVideos.slice(0, RECENT_VIDEOS_SHOWN).filter((video) => video.topic !== null);

export const creatorsWithStudio = (data: RosterData) => data.creators.filter((c) => c.studio !== null);


// ---------- dev-only: what's still left to fill in ----------

/** Human-readable list of every unfilled field, for the dev banner. */
export function listUnfilled(data: RosterData): string[] {
  const missing: string[] = [];

  for (const c of data.creators) {
    const add = (field: string) => missing.push(`${c.alias}: ${field}`);
    if (c.niche === null) add('niche');
    if (c.summary === null) add('summary');
    if (c.audience.usUkPercent === null) add('audience.usUkPercent');
    if (c.studio === null) add('studio (YouTube Studio audience panel)');
  }
  return missing;
}
