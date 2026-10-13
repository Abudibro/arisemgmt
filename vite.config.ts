import { defineConfig, type Plugin } from 'vitest/config';
import type { Connect } from 'vite';
import react from '@vitejs/plugin-react';
import { DeckExportError, isSample, parseDeckExport } from './src/roster/schema.ts';
import deckExport from './src/roster/deck-export.public.json';

// Fails `npm run dev` and `npm run build` if the roster export is malformed
// or contains anything that could identify a creator.
function validateDeckExport(): Plugin {
  return {
    name: 'validate-deck-export',
    buildStart() {
      try {
        const parsed = parseDeckExport(deckExport);
        if (isSample(parsed)) {
          this.warn('src/roster/deck-export.public.json is still the fake sample. Replace it with the real export.');
        }
      } catch (error) {
        this.error(error instanceof DeckExportError ? error.message : String(error));
      }
    },
  };
}

// Vite's dev/preview servers fall back to the homepage for /roster (no
// trailing slash). Netlify serves roster/index.html for it, so match that locally.
function rosterTrailingSlash(): Plugin {
  const redirect: Connect.NextHandleFunction = (req, res, next) => {
    // No @types/node in this repo, so IncomingMessage's fields aren't typed.
    const url = (req as { url?: string }).url ?? '';
    if (url === '/roster' || url.startsWith('/roster?')) {
      res.statusCode = 301;
      res.setHeader('Location', url.replace('/roster', '/roster/'));
      res.end();
      return;
    }
    next();
  };
  return {
    name: 'roster-trailing-slash',
    configureServer: (server) => void server.middlewares.use(redirect),
    configurePreviewServer: (server) => void server.middlewares.use(redirect),
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), validateDeckExport(), rosterTrailingSlash()],
  build: {
    rollupOptions: {
      // Two pages: the homepage, and the unlisted /roster page.
      input: {
        main: 'index.html',
        roster: 'roster/index.html',
      },
    },
  },
  test: {
    environment: 'node',
  },
});
