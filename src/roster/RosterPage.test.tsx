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
