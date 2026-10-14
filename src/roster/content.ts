// Hand-written content for the /roster page: everything the lead-gen tool
// can't know, plus every line of copy. Edit freely — no component changes
// needed.
//
// Rules:
//  - Leave a value as null (or an empty list) until it's real. Anything null
//    or empty simply doesn't render. Never put "TBD" or a guess here.
//  - Values here win over deck-export.public.json when they're filled in.
//  - In `npm run dev`, a banner in the corner lists everything still unfilled.

import { FOUNDER_PROFILE } from '../content.ts';
import type { CreatorContent, RosterContent } from './types.ts';

// Fallback prices for a creator without their own `prices` below. Each current
// creator sets theirs: roughly the same cost per 1,000 views, adjusted for audience.
const DEFAULT_PRICES = { integration: 3500, dedicated: 7500 };

const emptyCreator = (): CreatorContent => ({
  niche: null, // e.g. "Claude Code and full-stack AI builds"
  audience: {
    usUkPercent: null, // 0–100, e.g. 25.2 for 25.2% (same scale as the export)
    topCountries: [], // e.g. ["US", "UK", "India"]
    ageBand: null, // e.g. "25–34"
    avgViewDuration: null, // e.g. "7:40"
  },
  recentVideoTopics: [null, null, null], // same order as recentVideos in the export
  pastResults: [], // e.g. [{ label: "Dedicated video, AI infra brand", value: "71k views" }]
  prices: { ...DEFAULT_PRICES },
  studio: null, // YouTube Studio audience numbers; see creator-a for the shape
});

export const rosterContent: RosterContent = {
  creators: {
    'creator-a': {
      ...emptyCreator(),
      audience: { ...emptyCreator().audience, topCountries: ['United States', 'India', 'Germany'] },
      prices: { integration: 4000, dedicated: 8500 },
      // Copied from YouTube Studio > Analytics > Audience, last 28 days.
      studio: {
        period: 'Last 28 days',
        gender: [
          { label: 'Male', percent: 95.4 },
          { label: 'Female', percent: 4.4 },
          { label: 'User-specified', percent: 0.2 },
        ],
        age: [
          { label: '13–17', percent: 1.5 },
          { label: '18–24', percent: 7.6 },
          { label: '25–34', percent: 30.0 },
          { label: '35–44', percent: 29.2 },
          { label: '45–54', percent: 19.6 },
          { label: '55–64', percent: 8.6 },
          { label: '65+', percent: 3.4 },
        ],
        countries: [
          { label: 'United States', percent: 33.4 },
          { label: 'India', percent: 7.1 },
          { label: 'Germany', percent: 5.1 },
          { label: 'United Kingdom', percent: 3.6 },
          { label: 'Canada', percent: 3.0 },
        ],
        devices: [
          { label: 'Computer', percent: 38.3 },
          { label: 'Mobile phone', percent: 31.6 },
          { label: 'TV', percent: 22.6 },
          { label: 'Tablet', percent: 6.7 },
        ],
        // Never add "Top videos": titles and thumbnails identify the channel.
        screenshots: [
          { src: '/roster/creator-a/age-gender.png', alt: 'YouTube Studio: age and gender, last 28 days', width: 627, height: 788 },
          { src: '/roster/creator-a/geographies.png', alt: 'YouTube Studio: top geographies, last 28 days', width: 644, height: 464 },
          { src: '/roster/creator-a/devices.png', alt: 'YouTube Studio: device type by watch time, last 28 days', width: 655, height: 444 },
        ],
      },
    },
    'creator-b': {
      ...emptyCreator(),
      audience: {
        ...emptyCreator().audience,
        topCountries: ['United States', 'India', 'Germany'],
        avgViewDuration: '3:32', // from the creator's media kit
      },
      // Kept close to the creator's public media-kit rate ($1,900). Their kit
      // doesn't offer dedicated videos, so that shows "On request".
      prices: { integration: 2500, dedicated: null },
      // From the creator's own media kit, which doesn't state a source or period.
      // Replace with YouTube Studio numbers + screenshots when you have them.
      studio: {
        source: 'Creator’s media kit',
        period: null,
        gender: [{ label: 'Male', percent: 95.7 }],
        age: [
          { label: '18–24', percent: 9.1 },
          { label: '25–34', percent: 33.5 },
          { label: '35–44', percent: 31.9 },
          { label: '45–54', percent: 17.7 },
          { label: '55–64', percent: 5.8 },
          { label: '65+', percent: 1.5 },
        ],
        countries: [
          { label: 'United States', percent: 21.5 },
          { label: 'India', percent: 10.1 },
          { label: 'Germany', percent: 4.9 },
          { label: 'United Kingdom', percent: 3.7 },
          { label: 'Brazil', percent: 3.6 },
        ],
        devices: [],
        screenshots: [], // never screenshot the media kit: it's branded with the channel name
      },
    },
    'creator-c': {
      ...emptyCreator(),
      audience: { ...emptyCreator().audience, topCountries: ['India', 'United States', 'United Kingdom'] },
      prices: { integration: 2500, dedicated: 5500 },
      studio: {
        period: 'Last 28 days',
        // TODO: Abdurahman to confirm the date range of the geography table
        // (the screenshot doesn't show it). Until then no period is shown.
        periods: { countries: null },
        gender: [
          { label: 'Male', percent: 98.6 },
          { label: 'Female', percent: 1.4 },
          { label: 'User-specified', percent: 0.1 },
        ],
        age: [
          { label: '13–17', percent: 0.3 },
          { label: '18–24', percent: 18.4 },
          { label: '25–34', percent: 46.2 },
          { label: '35–44', percent: 33.9 },
          { label: '45–54', percent: 1.0 },
          { label: '55–64', percent: 0.2 },
          { label: '65+', percent: 0 },
        ],
        // Share of views, from the geography table.
        countries: [
          { label: 'India', percent: 31.3 },
          { label: 'United States', percent: 10.9 },
          { label: 'United Kingdom', percent: 2.7 },
          { label: 'Philippines', percent: 2.0 },
          { label: 'Canada', percent: 1.9 },
        ],
        devices: [],
        // The geography table isn't published: its totals row (exact lifetime-style
        // view and subscriber counts) could be matched to the channel.
        screenshots: [
          { src: '/roster/creator-c/age-gender.png', alt: 'YouTube Studio: age and gender, last 28 days', width: 1140, height: 1150 },
        ],
      },
    },
  },

  // Roster-level proof, one short line each.
  // e.g. "AI infrastructure brand · dedicated video · 71k views"
  // From Creator B's media kit. Brands are replaced by their category and views
  // rounded, so the videos can't be looked up. Kit's "+13% signups" (Cline) left
  // out: the kit doesn't say how it was measured.
  caseNotes: [
    'Developer terminal · natural drop-in · 191k views · 7.3% CTR',
    'Developer infrastructure · natural drop-in · 85k views · 10.3% CTR',
    'AI coding agent · natural drop-in · 91k views · 7.9% CTR',
    'Automation platform · 60-second integration · 53k views · 7% CTR',
    'AI model provider · 60-second integration · 40k views · 8% CTR',
  ],

  // Brand name (exactly as in the export) → a square, single-colour mark under
  // /public. The page tints it grey and shows the name next to it. Brands
  // without an entry show the name only. Marks below are from Simple Icons (CC0).
  sponsorLogos: {
    Databricks: '/logos/databricks.svg',
    DataCamp: '/logos/datacamp.svg',
    Dell: '/logos/dell.svg',
    NVIDIA: '/logos/nvidia.svg',
    Render: '/logos/render.svg',
    Sanity: '/logos/sanity.svg',
    Semrush: '/logos/semrush.svg',
  },

  formats: [
    {
      key: 'integration',
      name: 'Integration',
      length: '60–90 sec',
      summary: 'A 60–90 second segment inside a normal video.',
      bullets: [
        'The creator uses or demos your product, not just a read-out ad',
        'Your link in the description and a pinned comment',
        'You approve the script before filming',
        'You approve the final cut before it goes live',
        'Live within about 3 weeks of the brief',
      ],
    },
    {
      key: 'dedicated',
      name: 'Dedicated video',
      length: '8–15 min',
      summary: 'A full video built around your product.',
      bullets: [
        'Typically 8–15 minutes, planned with you',
        'Your link in the description and a pinned comment',
        'You approve the outline, the script and the final cut',
        'Live within about 4 weeks of the brief',
      ],
    },
  ],

  steps: [
    {
      title: 'You pick a creator and a format.',
      body: "Reply to our email or write to us with your choice. That's the whole sign-up.",
    },
    {
      title: 'We agree the brief.',
      body: 'What the product is, who it’s for, and the one thing viewers should do. We send the invoice for the first 50%.',
      tag: 'Invoice · first 50%',
    },
    {
      title: 'You approve the script.',
      body: "Nothing gets filmed until you've signed it off.",
    },
    {
      title: 'You approve the video.',
      body: 'You see the final cut before it’s published.',
    },
    {
      title: 'It goes live, and you see the numbers.',
      body: 'We send views, clicks and screenshots from YouTube Studio at 7 and 30 days. The second 50% is due when the video goes live.',
      tag: 'Second 50% due',
    },
  ],

  // TODO: Abdurahman to confirm each answer.
  faq: [
    {
      question: 'What if the creator doesn’t think it’s a fit?',
      answer: 'We never push a creator into it. If they don’t think your product suits their audience, they won’t make the video. We’ll suggest other creators who could work for you instead. We work with more than the three on this page.',
    },
    {
      question: 'Can a competitor appear in the same video?',
      answer: 'No. Your sponsorship is the only one in that video.',
    },
    {
      question: 'How many changes can we ask for?',
      answer: 'One round of changes on the script and one on the final cut.',
    },
    {
      question: 'Can we use the video in our own ads?',
      answer: 'Not by default. Paid usage rights are quoted separately.',
    },
    {
      question: 'What do we get afterwards?',
      answer: 'Views, clicks and YouTube Studio screenshots at 7 and 30 days.',
    },
    {
      question: 'What if the date slips?',
      answer: 'We tell you as soon as we know and agree a new date with you.',
    },
  ],

  // Name, role and photo are shared with the homepage (FOUNDER_PROFILE in src/content.ts).
  // TODO: Abdurahman to check this wording.
  founder: {
    ...FOUNDER_PROFILE,
    body: 'I’m the person you’ll deal with, from the first email to the 30-day numbers. I work with each creator directly.',
  },

  copy: {
    nav: { cta: 'Email us' },

    hero: {
      tag: 'Creator roster · Pricing',
      headingPrefix: 'YouTube creators your buyers ',
      headingHighlight: 'already watch.',
      lede: 'Developers learning to build with AI watch these channels every week. Here are three from our roster, with everything you need to decide: who they are, what you get, and what it costs.',
      stats: {
        combinedMedianViews: 'views per video across the roster',
        combinedUploadsPerMonth: 'long-form videos a month',
        usUkPercent: 'US/UK audience',
      },
      primaryCta: 'See the creators',
      secondaryCta: 'Jump to pricing',
      footnote: "Based on each creator's last 15 long-form videos. Updated {dataAsOf}.",
    },

    sponsors: {
      label: 'Our creators have run sponsorships with',
      pause: 'Pause the logo rail',
      play: 'Play the logo rail',
    },

    why: {
      heading: 'Why these channels.',
      items: [
        {
          icon: 'tools',
          title: 'They buy tools.',
          body: 'The audience is developers and technical founders choosing what to build with. They watch to decide what to use.',
        },
        {
          icon: 'search',
          title: 'Videos keep working.',
          body: 'YouTube videos are found through search for months after they go live. A sponsorship isn’t gone in a day like a social post.',
        },
        {
          icon: 'demo',
          title: 'It’s shown, not read out.',
          body: 'The creator uses your product in the video, in front of the people who’d actually use it.',
        },
      ],
    },

    roster: {
      heading: 'The roster.',
      sub: 'Three from our roster. We work with more, and can suggest others for your product. Names on request: we keep creators anonymous until you’re ready to go ahead.',
      medianViewsLabel: 'median views, last {n} videos',
      subscribersLabel: 'subscribers',
      uploadsLabel: 'videos a month',
      audienceLabels: {
        usUkPercent: 'US/UK audience',
        topCountries: 'Top countries',
        ageBand: 'Age',
        avgViewDuration: 'Average view duration',
      },
      recentVideosLabel: 'Recent videos',
      platformLabel: 'YouTube channel',
      viewsSuffix: 'views',
      minutesSuffix: 'min',
      sponsorshipLine: '{count} sponsored videos in the last {n}',
      formatCounts: {
        integration: ['integration', 'integrations'],
        dedicated: ['dedicated video', 'dedicated videos'],
      },
      sponsoredViewsLine: 'Sponsored videos get {x} of this channel’s usual views.',
      pastResultsLabel: 'Past results',
      pricingLink: 'See pricing for {alias} →',
    },

    studio: {
      heading: 'Who’s watching.',
      sub: 'Audience numbers from each creator’s YouTube Studio, or their media kit where marked. Original Studio screenshots are below each set.',
      periodLabel: '{source} · {period}',
      sourceLabel: 'YouTube Studio',
      charts: { gender: 'Gender', age: 'Age', countries: 'Top countries', devices: 'Device' },
      devicesNote: 'Share of watch time',
      screenshotsToggle: 'See the original screenshots',
      carouselTabsLabel: 'Choose a creator',
      carouselPrev: 'Previous creator',
      carouselNext: 'Next creator',
    },

    proof: {
      heading: 'What past sponsorships looked like.',
      // Shown next to the big percentage.
      statCaption: 'of normal views. That’s the average for sponsored videos across the roster.',
      statNote: 'In other words, sponsorships don’t cost the creator their audience.',
    },

    whatYouGet: {
      heading: 'What you get.',
      note: 'Want to reuse the video in your own ads? Usage rights are priced separately. Ask and we’ll quote.',
      fromPrice: 'From {price} →',
    },

    howItWorks: { heading: 'How it works.' },

    pricing: {
      heading: 'Pricing.',
      sub: 'Per video, in USD. Half when the brief is agreed, half when the video goes live.',
      creatorColumn: 'Creator',
      onRequest: 'On request',
      medianViews: '{views} median views',
      note: 'Want more than one video, or more than one creator? We’ll put together a combined price.',
    },

    terms: { heading: 'The details.' },

    nextStep: {
      heading: 'Ready when you are.',
      body: 'Reply to the email this link came in, or write to us with the creator and format you want. You’ll get a brief and an invoice within a day.',
      cta: 'Email us',
      mailSubject: 'Sponsorship — [creator] / [format]',
      mailBody: 'Hi Abdurahman,\n\nWe’d like to go ahead.\n\nCreator (A, B or C):\nFormat (integration or dedicated video):\nProduct link:\nPreferred month:\n\nThanks,',
      note: 'Prefer to see the numbers first? Ask and we’ll send the creator’s YouTube Studio screenshots.',
    },
  },
};
