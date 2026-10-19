// Number and text formatting for the roster page. Pure functions, no locale
// surprises: everything is US English and USD.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 63203 → "63k", 4500 → "4.5k", 1250000 → "1.3M", 850 → "850" */
export function formatViews(n: number): string {
  if (n < 1000) return String(Math.round(n));
  if (n < 10_000) return `${trimZero(Math.round(n / 100) / 10)}k`;
  const k = Math.round(n / 1000);
  if (k < 1000) return `${k}k`;
  return `${trimZero(Math.round(n / 100_000) / 10)}M`;
}

/** A ratio: 0.97 → "97%" */
export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}

/** A value already in percent: 25.2 → "25%" */
export function formatPercentValue(percent: number): string {
  return `${Math.round(percent)}%`;
}

/** One decimal, as YouTube Studio shows it: 33.4 → "33.4%", 30 → "30.0%" */
export function formatShare(percent: number): string {
  return `${percent.toFixed(1)}%`;
}

/** "2026-09" (or any ISO date starting that way) → "Sep 2026" */
export function formatMonth(isoMonth: string): string {
  const [year, month] = isoMonth.split('-');
  const name = MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : isoMonth;
}

/** 4.3 → "4.3", 9 → "9" */
export function formatDecimal(n: number): string {
  return trimZero(Math.round(n * 10) / 10);
}

/** Replaces {name} placeholders in a copy string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/** 1 → "1 integration", 2 → "2 integrations" */
export function plural(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

export function mailtoHref(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function trimZero(n: number): string {
  return String(n).replace(/\.0$/, '');
}
