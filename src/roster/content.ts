// Hand-written content for the /roster page: everything the lead-gen tool
// can't know, plus every line of copy. Edit freely — no component changes
// needed.
//
// Rules:
//  - Leave a value as null (or an empty list) until it's real. Anything null
//    or empty simply doesn't render. Never put "TBD" or a guess here.
//  - Values here win over deck-export.public.json when they're filled in.
//  - In `npm run dev`, a banner in the corner lists everything still unfilled.

import type { CreatorContent, RosterContent } from './types.ts';

// Default prices for every creator — change any creator's below.
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
});

export const rosterContent: RosterContent = {
  creators: {
    'creator-a': emptyCreator(),
    'creator-b': emptyCreator(),
    'creator-c': emptyCreator(),
  },

  // Roster-level proof, one short line each.
  // e.g. "AI infrastructure brand · dedicated video · 71k views"
  caseNotes: [],

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
