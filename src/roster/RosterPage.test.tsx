import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import RosterPage from '../components/Roster/RosterPage.tsx';
import { mergeRoster } from './merge.ts';
import { makeContent, makeExport } from './fixtures.ts';
import type { RosterContent } from './types.ts';
import type { DeckExport } from './schema.ts';

const render = (exp: DeckExport = makeExport(), content: RosterContent = makeContent()) =>
  renderToStaticMarkup(<RosterPage data={mergeRoster(exp, content)} content={content} />)
    // The dev banner renders under vitest (DEV is true); strip it so we test production output.
    .replace(/<details class="dev-todo">[\s\S]*?<\/details>/, '');

const text = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

describe('RosterPage with nothing filled in', () => {
  const html = render();
  const plain = text(html);

  it('has exactly one h1', () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
  });

  it('never shows placeholders or empty labels', () => {
    expect(plain).not.toMatch(/TBD|null|undefined|NaN/);
    expect(plain).not.toContain('US/UK audience');
    expect(plain).not.toContain('Recent videos');
    expect(plain).not.toContain('Past results');
    expect(plain).not.toContain('Top countries');
    expect(html).not.toContain('creator-niche');
    expect(html).not.toContain('case-notes');
  });

  it('shows computed stats, prices and CPM', () => {
    expect(plain).toContain('views per video across the roster 150k');
    expect(plain).toContain('$7,500');
    expect(plain).toContain('≈ $119 per 1,000 views');
    expect(plain).toContain('Updated Oct 2026');
    expect(html).toContain('id="pricing-creator-a"');
    expect(html).toContain('href="#pricing-creator-a"');
  });

  it('swaps the nav CTA for "Email us" and hides "How we work"', () => {
    expect(html).toContain('href="mailto:abdurahman@arisemgmt.co" class="btn btn-primary">Email us');
    expect(plain).not.toContain('How we work');
  });
});

describe('RosterPage hiding rules', () => {
  it('hides the sponsors strip with no brands', () => {
    const exp = makeExport();
    expect(render(exp)).toContain('Our creators have run sponsorships with');
    exp.roster.brands = [];
    expect(render(exp)).not.toContain('Our creators have run sponsorships with');
  });

  it('shows a logo mark next to the name only for brands that have one', () => {
    const content = makeContent();
    content.sponsorLogos = { Docker: '/logos/docker.svg' };
    const html = render(makeExport(), content);
    expect(html.match(/class="sponsor-mark"/g)).toHaveLength(1);
    expect(html).toContain('/logos/docker.svg');
    expect(text(html)).toContain('Docker');
    expect(text(html)).toContain('NVIDIA');
  });

  it('shows the YouTube Studio panel only for creators with studio data', () => {
    const content = makeContent();
    expect(render(makeExport(), content)).not.toContain('Who’s watching.');
    content.creators['creator-b'].studio = {
      period: 'Last 28 days',
      gender: [{ label: 'Male', percent: 90 }],
      age: [{ label: '25–34', percent: 30 }],
      countries: [{ label: 'United States', percent: 33.4 }],
      devices: [],
      screenshots: [],
    };
    const html = render(makeExport(), content);
    const plain = text(html);
    expect(plain).toContain('Who’s watching.');
    expect(plain).toContain('United States 33.4%');
    expect(html.match(/class="studio-panel"/g)).toHaveLength(1);
    expect(plain).not.toContain('Device');
    expect(plain).not.toContain('See the original screenshots');
    // one creator: a plain panel, no carousel controls
    expect(html).not.toContain('carousel-tabs');
  });

  it('turns two or more breakdowns into a carousel with a tab per creator', () => {
    const content = makeContent();
    const studio = { period: 'Last 28 days', gender: [], age: [{ label: '25–34', percent: 30 }], countries: [], devices: [], screenshots: [] };
    content.creators['creator-a'].studio = studio;
    content.creators['creator-c'].studio = studio;
    const html = render(makeExport(), content);
    expect(html).toContain('aria-roledescription="carousel"');
    expect(html.match(/class="carousel-tab( active)?"/g)).toHaveLength(2);
    expect(html).toContain('aria-label="Creator A, 1 of 2"');
    expect(html).toContain('aria-label="Creator C, 2 of 2"');
    expect(html).toMatch(/aria-label="Previous creator" disabled=""/);
  });

  it('labels each list with its own period when they differ, and never invents one', () => {
    const content = makeContent();
    content.creators['creator-a'].studio = {
      period: 'Last 28 days',
      periods: { countries: null },
      gender: [],
      age: [{ label: '25–34', percent: 46.2 }],
      countries: [{ label: 'India', percent: 31.3 }],
      devices: [],
      screenshots: [],
    };
    const plain = text(render(makeExport(), content));
    expect(plain).not.toContain('YouTube Studio · Last 28 days');
    expect(plain).toContain('YouTube Studio');
    expect(plain).toContain('Age · Last 28 days');
    expect(plain).toMatch(/Top countries India 31\.3%/);
  });

  it('names a non-Studio source and shows no period when none is stated', () => {
    const content = makeContent();
    content.creators['creator-b'].studio = {
      source: 'Creator’s media kit',
      period: null,
      gender: [{ label: 'Male', percent: 95.7 }],
      age: [],
      countries: [],
      devices: [],
      screenshots: [],
    };
    const plain = text(render(makeExport(), content));
    expect(plain).toContain('Creator’s media kit');
    expect(plain).not.toMatch(/Last \d+ days/);
    expect(plain).toContain('Male 95.7%');
  });

  it('shows the founder only when filled in', () => {
    const content = makeContent();
    expect(render(makeExport(), content)).not.toContain('founder-card');
    content.founder = { name: 'Abdurahman', role: 'Founder, Arise', photo: '/founder.jpg', body: 'Hi.' };
    const html = render(makeExport(), content);
    expect(html).toContain('founder-card');
    expect(html).toContain('alt="Abdurahman, Founder, Arise"');
  });

  it('hides the proof section when the ratio is weak and there are no case notes', () => {
    const exp = makeExport();
    exp.roster.sponsoredViewsVsMedian = 0.7;
    expect(render(exp)).not.toContain('What past sponsorships looked like.');
  });

  it('hides a weak per-creator ratio line', () => {
    const exp = makeExport();
    exp.creators[0].sponsoredViewsVsMedian = 0.79;
    exp.creators[1].sponsoredViewsVsMedian = 0.85;
    const plain = text(render(exp));
    expect(plain).not.toContain('get 79%');
    expect(plain).toContain('Sponsored videos get 85% of this channel’s usual views.');
  });

  it('shows "On request" for a null price, with no CPM', () => {
    const content = makeContent();
    content.creators['creator-c'].prices = { integration: null, dedicated: 7500 };
    const plain = text(render(makeExport(), content));
    expect(plain).toContain('On request');
  });

  it('renders filled fields', () => {
    const content = makeContent();
    content.creators['creator-a'].niche = 'Claude Code builds';
    content.creators['creator-a'].audience.usUkPercent = 25.2;
    content.creators['creator-a'].recentVideoTopics = ['Building an agent', null, null];
    const plain = text(render(makeExport(), content));
    expect(plain).toContain('Claude Code builds');
    expect(plain).toContain('US/UK audience 25%');
    expect(plain).toContain('Building an agent · Sep 2026 · 61k views · 14 min');
  });
});
