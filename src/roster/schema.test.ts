import { describe, expect, it } from 'vitest';
import { DeckExportError, findAnonymityLeaks, parseDeckExport } from './schema.ts';
import sample from './deck-export.public.json';
import { makeExport } from './fixtures.ts';

const problemsOf = (raw: unknown): string[] => {
  try {
    parseDeckExport(raw);
    return [];
  } catch (error) {
    if (error instanceof DeckExportError) return error.problems;
    throw error;
  }
};

describe('parseDeckExport', () => {
  it('accepts a valid export and the sample file', () => {
    expect(problemsOf(makeExport())).toEqual([]);
    expect(problemsOf(sample)).toEqual([]);
  });

  it('rejects other schema versions', () => {
    expect(problemsOf({ ...makeExport(), schemaVersion: 2 })[0]).toMatch(/schemaVersion must be 1/);
  });

  it('rejects missing required fields', () => {
    const raw = makeExport() as unknown as Record<string, unknown>;
    delete raw.dataAsOf;
    (raw.creators as Record<string, unknown>[])[1].medianViews = '50k';
    const problems = problemsOf(raw);
    expect(problems).toContain('$.dataAsOf must be a string');
    expect(problems).toContain('creators[1].medianViews must be a number');
  });

  it('requires exactly the three creators', () => {
    const two = makeExport();
    (two as { creators: unknown[] }).creators = two.creators.slice(0, 2);
    expect(problemsOf(two).join()).toMatch(/exactly 3/);

    const wrongId = makeExport();
    (wrongId.creators[2] as { id: string }).id = 'creator-d';
    expect(problemsOf(wrongId).join()).toMatch(/exactly 3/);

    const duplicate = makeExport();
    duplicate.creators[2].id = 'creator-a';
    expect(problemsOf(duplicate).join()).toMatch(/exactly 3/);
  });

  it('rejects usUkPercent outside 0–100', () => {
    const raw = makeExport();
    raw.creators[0].audience.usUkPercent = 136;
    expect(problemsOf(raw)).toContain('creators[0].audience.usUkPercent must be a percentage from 0 to 100');
  });

  it('allows the creators in any order', () => {
    const shuffled = makeExport();
    shuffled.creators.reverse();
    expect(problemsOf(shuffled)).toEqual([]);
  });

  it('error message is readable', () => {
    expect(() => parseDeckExport({ ...makeExport(), schemaVersion: 0 })).toThrow(/deck-export\.public\.json is invalid/);
  });
});

describe('anonymity guard', () => {
  it.each(['channelTitle', 'channelUrl', 'channelId', 'handle', 'videoId', 'title', 'url', 'thumbnailUrl', 'videoTitle'])(
    'fails on a "%s" key anywhere',
    (key) => {
      const raw = makeExport();
      (raw.creators[0].recentVideos[0] as unknown as Record<string, unknown>)[key] = 'x';
      expect(problemsOf(raw).join()).toMatch(new RegExp(`key "${key}" is not allowed`));
    },
  );

  it('fails on links in values', () => {
    const raw = makeExport();
    raw.creators[1].brandCategories.push('https://youtube.com/@someone');
    expect(problemsOf(raw).join()).toMatch(/links are not allowed/);
  });

  it('finds nothing in a clean export', () => {
    expect(findAnonymityLeaks(makeExport())).toEqual([]);
  });
});
