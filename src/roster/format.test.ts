import { describe, expect, it } from 'vitest';
import { fill, formatDecimal, formatMonth, formatPercent, formatPercentValue, formatShare, formatViews, mailtoHref, plural } from './format.ts';

describe('formatViews', () => {
  it.each([
    [63203, '63k'],
    [1250000, '1.3M'],
    [1000000, '1M'],
    [999_600, '1M'],
    [150000, '150k'],
    [4500, '4.5k'],
    [10_000, '10k'],
    [850, '850'],
  ])('%d → %s', (n, expected) => expect(formatViews(n)).toBe(expected));
});

describe('other formats', () => {
  it('percent', () => {
    expect(formatPercent(0.97)).toBe('97%');
    expect(formatPercent(0.944)).toBe('94%');
    expect(formatPercentValue(25.2)).toBe('25%');
    expect(formatPercentValue(37)).toBe('37%');
    expect(formatShare(33.4)).toBe('33.4%');
    expect(formatShare(0.2)).toBe('0.2%');
    expect(formatShare(30)).toBe('30.0%');
  });
  it('month', () => {
    expect(formatMonth('2026-09')).toBe('Sep 2026');
    expect(formatMonth('2026-10-12T18:00:00Z')).toBe('Oct 2026');
  });
  it('decimal', () => {
    expect(formatDecimal(4.3)).toBe('4.3');
    expect(formatDecimal(9)).toBe('9');
    expect(formatDecimal(9.54)).toBe('9.5');
  });
  it('fill and plural', () => {
    expect(fill('{count} in the last {n}', { count: 9, n: 15 })).toBe('9 in the last 15');
    expect(fill('{missing} stays', {})).toBe('{missing} stays');
    expect(plural(1, 'integration', 'integrations')).toBe('1 integration');
    expect(plural(7, 'integration', 'integrations')).toBe('7 integrations');
  });
  it('mailto encodes subject and body', () => {
    expect(mailtoHref('a@b.co', 'Sponsorship — A / B', 'Hi\nthere')).toBe(
      'mailto:a@b.co?subject=Sponsorship%20%E2%80%94%20A%20%2F%20B&body=Hi%0Athere',
    );
  });
});
