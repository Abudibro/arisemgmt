// Validates deck-export.public.json (written by the lead-gen tool, schema v1).
// Runs twice: from the Vite plugin in vite.config.ts, so a bad file fails
// `npm run dev` / `npm run build` with a readable message, and again at
// runtime in data.ts to turn the raw JSON into typed data.
//
// Keep this file free of DOM and Node APIs — it's type-checked under both
// tsconfig.app.json and tsconfig.node.json.

export const CREATOR_IDS = ['creator-a', 'creator-b', 'creator-c'] as const;
export type CreatorId = (typeof CREATOR_IDS)[number];

export interface ExportVideo {
  month: string;
  views: number;
  durationMinutes: number;
  topic: string | null;
}

export interface ExportAudience {
  usUkPercent: number | null;
  topCountries: string[];
  ageBand: string | null;
  avgViewDuration: string | null;
}

export interface ResultPair {
  label: string;
  value: string;
}

export interface ExportCreator {
  id: CreatorId;
  alias: string;
  niche: string | null;
  subscriberCount: number;
  medianViews: number;
  meanViews: number;
  videosAnalysed: number;
  uploadsPerMonth: number;
  recentVideos: ExportVideo[];
  confirmedSponsorshipCount: number;
  formats: { integration: number; dedicated: number };
  brandCategories: string[];
  sponsoredViewsVsMedian: number | null;
  audience: ExportAudience;
  pastResults: ResultPair[];
  todo: string[];
}

export interface DeckExport {
  schemaVersion: 1;
  generatedAt: string;
  dataAsOf: string;
  window: string;
  roster: {
    brands: string[];
    combinedMedianViews: number;
    combinedUploadsPerMonth: number;
    sponsoredViewsVsMedian: number | null;
  };
  creators: [ExportCreator, ExportCreator, ExportCreator];
}

export class DeckExportError extends Error {
  constructor(public readonly problems: string[]) {
    super(
      'deck-export.public.json is invalid:\n' +
        problems.map((p) => `  - ${p}`).join('\n') +
        '\nFix the file (or re-export it from the lead-gen tool) and try again.',
    );
    this.name = 'DeckExportError';
  }
}

// Anonymity guard. Any key ending in one of these (case-insensitive) means a
// private export was copied in by mistake, so the build refuses it outright.
const BANNED_KEY = /(channeltitle|channelurl|channelid|handle|videoid|title|url)$/i;
// Same idea for values: links have no business in the public export.
const BANNED_VALUE = /https?:\/\/|www\.|youtube\.com|youtu\.be/i;

export function findAnonymityLeaks(value: unknown, path = '$'): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => findAnonymityLeaks(item, `${path}[${i}]`));
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => {
      const childPath = `${path}.${key}`;
      const own = BANNED_KEY.test(key) ? [`${childPath}: key "${key}" is not allowed in the public export`] : [];
      return [...own, ...findAnonymityLeaks(child, childPath)];
    });
  }
  if (typeof value === 'string' && BANNED_VALUE.test(value)) {
    return [`${path}: links are not allowed in the public export ("${value}")`];
  }
  return [];
}

// ---------- tiny field checkers (collect problems instead of throwing) ----------

type Obj = Record<string, unknown>;

const isObj = (v: unknown): v is Obj => v !== null && typeof v === 'object' && !Array.isArray(v);
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const isStr = (v: unknown): v is string => typeof v === 'string';
const isStrArr = (v: unknown): v is string[] => Array.isArray(v) && v.every(isStr);

function checker(problems: string[]) {
  const expect = (ok: boolean, path: string, what: string) => {
    if (!ok) problems.push(`${path} must be ${what}`);
  };
  return {
    obj: (o: Obj, key: string, path: string): Obj => {
      expect(isObj(o[key]), `${path}.${key}`, 'an object');
      return isObj(o[key]) ? (o[key] as Obj) : {};
    },
    num: (o: Obj, key: string, path: string) => expect(isNum(o[key]), `${path}.${key}`, 'a number'),
    numOrNull: (o: Obj, key: string, path: string) =>
      expect(o[key] === null || isNum(o[key]), `${path}.${key}`, 'a number or null'),
    str: (o: Obj, key: string, path: string) => expect(isStr(o[key]), `${path}.${key}`, 'a string'),
    strOrNull: (o: Obj, key: string, path: string) =>
      expect(o[key] === null || isStr(o[key]), `${path}.${key}`, 'a string or null'),
    strArr: (o: Obj, key: string, path: string) =>
      expect(isStrArr(o[key]), `${path}.${key}`, 'an array of strings'),
    arr: (o: Obj, key: string, path: string): unknown[] => {
      expect(Array.isArray(o[key]), `${path}.${key}`, 'an array');
      return Array.isArray(o[key]) ? (o[key] as unknown[]) : [];
    },
  };
}

function checkCreator(raw: unknown, i: number, problems: string[]) {
  const path = `creators[${i}]`;
  if (!isObj(raw)) {
    problems.push(`${path} must be an object`);
    return;
  }
  const c = checker(problems);
  c.str(raw, 'id', path);
  c.str(raw, 'alias', path);
  c.strOrNull(raw, 'niche', path);
  for (const key of ['subscriberCount', 'medianViews', 'meanViews', 'videosAnalysed', 'uploadsPerMonth', 'confirmedSponsorshipCount']) {
    c.num(raw, key, path);
  }
  c.arr(raw, 'recentVideos', path).forEach((video, v) => {
    const vPath = `${path}.recentVideos[${v}]`;
    if (!isObj(video)) {
      problems.push(`${vPath} must be an object`);
      return;
    }
    c.str(video, 'month', vPath);
    if (isStr(video.month) && !/^\d{4}-(0[1-9]|1[0-2])$/.test(video.month)) {
      problems.push(`${vPath}.month must look like "2026-09"`);
    }
    c.num(video, 'views', vPath);
    c.num(video, 'durationMinutes', vPath);
    c.strOrNull(video, 'topic', vPath);
  });
  const formats = c.obj(raw, 'formats', path);
  c.num(formats, 'integration', `${path}.formats`);
  c.num(formats, 'dedicated', `${path}.formats`);
  c.strArr(raw, 'brandCategories', path);
  c.numOrNull(raw, 'sponsoredViewsVsMedian', path);
  const audience = c.obj(raw, 'audience', path);
  c.numOrNull(audience, 'usUkPercent', `${path}.audience`);
  if (isNum(audience.usUkPercent) && (audience.usUkPercent < 0 || audience.usUkPercent > 100)) {
    problems.push(`${path}.audience.usUkPercent must be a percentage from 0 to 100`);
  }
  c.strArr(audience, 'topCountries', `${path}.audience`);
  c.strOrNull(audience, 'ageBand', `${path}.audience`);
  c.strOrNull(audience, 'avgViewDuration', `${path}.audience`);
  c.arr(raw, 'pastResults', path).forEach((result, r) => {
    const rPath = `${path}.pastResults[${r}]`;
    if (!isObj(result)) {
      problems.push(`${rPath} must be an object`);
      return;
    }
    c.str(result, 'label', rPath);
    c.str(result, 'value', rPath);
  });
  c.strArr(raw, 'todo', path);
}

/** Returns the export typed, or throws a DeckExportError listing every problem. */
export function parseDeckExport(raw: unknown): DeckExport {
  const problems: string[] = [];

  if (!isObj(raw)) throw new DeckExportError(['the top level must be a JSON object']);

  if (raw.schemaVersion !== 1) {
    // A different version means a different shape; checking further would only add noise.
    throw new DeckExportError([`schemaVersion must be 1 (got ${JSON.stringify(raw.schemaVersion)})`]);
  }

  problems.push(...findAnonymityLeaks(raw));

  const c = checker(problems);
  c.str(raw, 'generatedAt', '$');
  c.str(raw, 'dataAsOf', '$');
  if (isStr(raw.dataAsOf) && !/^\d{4}-\d{2}/.test(raw.dataAsOf)) {
    problems.push('$.dataAsOf must be an ISO date like "2026-10-12T18:00:00Z"');
  }
  c.str(raw, 'window', '$');

  const roster = c.obj(raw, 'roster', '$');
  c.strArr(roster, 'brands', '$.roster');
  c.num(roster, 'combinedMedianViews', '$.roster');
  c.num(roster, 'combinedUploadsPerMonth', '$.roster');
  c.numOrNull(roster, 'sponsoredViewsVsMedian', '$.roster');

  const creators = c.arr(raw, 'creators', '$');
  const ids = creators.map((creator) => (isObj(creator) ? creator.id : undefined));
  if (creators.length !== 3 || CREATOR_IDS.some((id) => ids.filter((x) => x === id).length !== 1)) {
    problems.push(
      `creators must be exactly 3, with ids ${CREATOR_IDS.join(', ')} (got ${JSON.stringify(ids)}). ` +
        'The roster page is designed around three creators.',
    );
  }
  creators.forEach((creator, i) => checkCreator(creator, i, problems));

  if (problems.length > 0) throw new DeckExportError(problems);
  return raw as unknown as DeckExport;
}

/** The placeholder file shipped with the repo marks itself in `window`. */
export const SAMPLE_MARKER = 'FAKE SAMPLE DATA';

export function isSample(data: DeckExport): boolean {
  return data.window.startsWith(SAMPLE_MARKER);
}
