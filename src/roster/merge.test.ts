import { describe, expect, it } from 'vitest';
import { listUnfilled, mergeRoster, showProof, showSponsoredRatio, visibleRecentVideos } from './merge.ts';
import { makeContent, makeExport } from './fixtures.ts';

describe('mergeRoster', () => {
  it('keeps the JSON order and computed metrics', () => {
    const data = mergeRoster(makeExport(), makeContent());
    expect(data.creators.map((c) => c.id)).toEqual(['creator-a', 'creator-b', 'creator-c']);
    expect(data.combinedMedianViews).toBe(150000);
    expect(data.creators[0].medianViews).toBe(63203);
  });

  it('manual values win when filled, and fall back to the export when not', () => {
    const exp = makeExport();
    exp.creators[1].niche = 'From the export';
    exp.creators[0].recentVideos[1].topic = 'Export topic';
    const content = makeContent();
    content.creators['creator-a'].niche = 'Claude Code builds';
    content.creators['creator-a'].recentVideoTopics = ['Manual topic', null, '  '];
    content.creators['creator-a'].audience.ageBand = '25–34';

    const [a, b] = mergeRoster(exp, content).creators;
    expect(a.niche).toBe('Claude Code builds');
    expect(b.niche).toBe('From the export');
    expect(a.recentVideos.map((v) => v.topic)).toEqual(['Manual topic', 'Export topic', null]);
    expect(a.audience.ageBand).toBe('25–34');
  });

  it('treats empty strings as unfilled', () => {
    const content = makeContent();
    content.creators['creator-a'].niche = '';
    expect(mergeRoster(makeExport(), content).creators[0].niche).toBeNull();
  });

  it('averages US/UK only over the creators that have it', () => {
    const content = makeContent();
    expect(mergeRoster(makeExport(), content).usUkPercent).toBeNull();
    content.creators['creator-a'].audience.usUkPercent = 13.6;
    content.creators['creator-c'].audience.usUkPercent = 37;
    expect(mergeRoster(makeExport(), content).usUkPercent).toBeCloseTo(25.3);
  });

  it('attaches optional sponsor logos', () => {
    const content = makeContent();
    content.sponsorLogos = { Docker: '/logos/docker.svg' };
    expect(mergeRoster(makeExport(), content).brands).toEqual([
      { name: 'Docker', logoSrc: '/logos/docker.svg' },
      { name: 'NVIDIA', logoSrc: null },
    ]);
  });
});

describe('show/hide rules', () => {
  it('sponsored ratio shows only at 0.8 or above', () => {
    expect(showSponsoredRatio(null)).toBe(false);
    expect(showSponsoredRatio(0.79)).toBe(false);
    expect(showSponsoredRatio(0.8)).toBe(true);
  });

  it('recent videos without a topic are hidden', () => {
    const content = makeContent();
    content.creators['creator-a'].recentVideoTopics = [null, 'Only this one', null];
    const [a, b] = mergeRoster(makeExport(), content).creators;
    expect(visibleRecentVideos(a).map((v) => v.topic)).toEqual(['Only this one']);
    expect(visibleRecentVideos(b)).toEqual([]);
  });

  it('proof shows if either the ratio or case notes exist', () => {
    const exp = makeExport();
    exp.roster.sponsoredViewsVsMedian = 0.5;
    const content = makeContent();
    expect(showProof(mergeRoster(exp, content))).toBe(false);
    content.caseNotes = ['AI infrastructure brand · dedicated video · 71k views'];
    expect(showProof(mergeRoster(exp, content))).toBe(true);
    exp.roster.sponsoredViewsVsMedian = 0.94;
    expect(showProof(mergeRoster(exp, makeContent()))).toBe(true);
  });

  it('lists what is unfilled', () => {
    const content = makeContent();
    content.creators['creator-b'].prices.dedicated = null;
    const missing = listUnfilled(mergeRoster(makeExport(), content));
    expect(missing).toContain('Creator A: niche');
    expect(missing).toContain('Creator A: recentVideoTopics (video 1, 2, 3)');
    expect(missing).toContain('Roster: caseNotes');
    expect(missing).toContain('Creator B: prices.dedicated (shows "On request")');
    expect(missing).not.toContain('Creator A: prices.integration (shows "On request")');
  });
});
