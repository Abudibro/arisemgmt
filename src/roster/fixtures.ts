// Test fixtures: a valid export and empty content, cloned per test.
import type { DeckExport, ExportCreator } from './schema.ts';
import type { CreatorContent, RosterContent } from './types.ts';
import { rosterContent } from './content.ts';

const creator = (id: ExportCreator['id'], alias: string, medianViews: number): ExportCreator => ({
  id,
  alias,
  niche: null,
  subscriberCount: 134000,
  medianViews,
  meanViews: 103623,
  videosAnalysed: 15,
  uploadsPerMonth: 4.3,
  recentVideos: [
    { month: '2026-09', views: 61000, durationMinutes: 14, topic: null },
    { month: '2026-09', views: 52000, durationMinutes: 11, topic: null },
    { month: '2026-08', views: 70000, durationMinutes: 18, topic: null },
  ],
  confirmedSponsorshipCount: 9,
  formats: { integration: 7, dedicated: 2 },
  brandCategories: ['AI infrastructure', 'hardware'],
  sponsoredViewsVsMedian: 0.97,
  audience: { usUkPercent: null, topCountries: [], ageBand: null, avgViewDuration: null },
  pastResults: [],
  todo: ['niche'],
});

export function makeExport(): DeckExport {
  return {
    schemaVersion: 1,
    generatedAt: '2026-10-13T00:00:00Z',
    dataAsOf: '2026-10-12T18:00:00Z',
    window: 'last 15 long-form videos (over 3 minutes, no livestreams)',
    roster: { brands: ['Docker', 'NVIDIA'], combinedMedianViews: 150000, combinedUploadsPerMonth: 9.5, sponsoredViewsVsMedian: 0.94 },
    creators: [creator('creator-a', 'Creator A', 63203), creator('creator-b', 'Creator B', 50000), creator('creator-c', 'Creator C', 36797)],
  };
}

const emptyCreator = (): CreatorContent => ({
  niche: null,
  audience: { usUkPercent: null, topCountries: [], ageBand: null, avgViewDuration: null },
  recentVideoTopics: [null, null, null],
  pastResults: [],
  studio: null,
});

/** The real copy, with every per-creator value empty. */
export function makeContent(): RosterContent {
  return {
    ...structuredClone(rosterContent),
    creators: { 'creator-a': emptyCreator(), 'creator-b': emptyCreator(), 'creator-c': emptyCreator() },
    caseNotes: [],
    sponsorLogos: {},
    founder: null,
  };
}
