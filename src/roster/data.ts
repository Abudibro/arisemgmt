import deckExport from './deck-export.public.json';
import { rosterContent } from './content.ts';
import { mergeRoster } from './merge.ts';
import { isSample, parseDeckExport } from './schema.ts';

// The one place the export and the hand-written content meet. The Vite
// plugin has already validated the JSON by this point; parsing again here
// gives us the typed shape.
const parsed = parseDeckExport(deckExport);

export const rosterData = mergeRoster(parsed, rosterContent);
export const isSampleExport = isSample(parsed);
