# /roster data

The unlisted roster page (`/roster`) is built from two files in this folder.

## 1. `deck-export.public.json` — replace the sample

**The file here now is fake sample data** ("Example Co", round numbers). Replace it with the real
public export from the lead-gen tool, at this exact path:

```
src/roster/deck-export.public.json
```

Until you do, `npm run build` prints a warning and the dev banner says "sample data".

The build fails with a list of problems if the file:

- isn't `schemaVersion: 1`, or is missing required fields;
- doesn't have exactly 3 creators with ids `creator-a`, `creator-b`, `creator-c`;
- has any key ending in `channelTitle`, `channelUrl`, `channelId`, `handle`, `videoId`, `title` or `url`,
  or any value containing a link. Only the **public** export belongs here.

The validation lives in `schema.ts`.

## 2. `content.ts` — fill in by hand

Niche, audience, recent video topics, past results, case notes, and every line of copy.
Leave anything unknown as `null` or `[]`. It won't render in production. Values here win over the
JSON when they're filled in.

Run `npm run dev` and open http://localhost:5173/roster/ . A banner in the bottom-left corner
lists everything still unfilled. It never appears in production builds.

## Sponsor logos

The past-sponsors rail shows each brand's name, plus a small grey mark when one is listed in
`sponsorLogos` in `content.ts`. Marks are square, single-colour SVGs in `public/logos/`, and the page
tints them. Seven come from Simple Icons (CC0). To add one, drop `public/logos/<brand>.svg` in and add
`'<Brand name exactly as in the export>': '/logos/<brand>.svg'`.

## Tests

`npm test` covers formatting, CPM, the merge, the hiding rules and the anonymity guard.
