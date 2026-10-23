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

const emptyCreator = (): CreatorContent => ({
  niche: null, // e.g. "Claude Code and full-stack AI builds"
  summary: null, // a few sentences on what the channel covers; the export now fills this
  audience: {
    usUkPercent: null, // 0–100, e.g. 25.2 for 25.2% (same scale as the export)
    topCountries: [], // e.g. ["US", "UK", "India"]
    ageBand: null, // e.g. "25–34"
    avgViewDuration: null, // e.g. "7:40"
  },
  recentVideoTopics: [null, null, null], // same order as recentVideos in the export
  pastResults: [], // e.g. [{ label: "Dedicated video, AI infra brand", value: "71k views" }]
  studio: null, // YouTube Studio audience numbers; see creator-a for the shape
});

export const rosterContent: RosterContent = {
  creators: {
    'creator-a': {
      ...emptyCreator(),
      // TODO: Abdurahman to check. Shortened from the export's summary.
      summary: 'Breaks down new AI models and agent tools as they launch, with hands-on demos. Watched by developers deciding what to build with.',
      // US/UK share and age band came from the export until 19 Oct 2026; the
      // export no longer carries audience numbers, so they live here now.
      audience: {
        ...emptyCreator().audience,
        usUkPercent: 37.0,
        topCountries: ['United States', 'India', 'Germany'],
        ageBand: '25–54 (78.8%)',
      },
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
      summary: 'Quick, practical videos on AI coding: setup tips, new tools worth installing, and which AI model to use. For developers who code with AI every day.',
      audience: {
        ...emptyCreator().audience,
        usUkPercent: 25.2,
        topCountries: ['United States', 'India', 'Germany'],
        ageBand: '25–54 (83%)', // from the creator's media kit (the age split below)
        avgViewDuration: '3:32', // from the creator's media kit
      },
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
      summary: 'Long build-along tutorials that take a real app from idea to launch using AI coding tools. Products get used inside the build, not read out as an ad.',
      audience: {
        ...emptyCreator().audience,
        usUkPercent: 13.6,
        topCountries: ['India', 'United States', 'United Kingdom'],
        ageBand: '25–54 (81.1%)',
      },
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

    hero: {
      tag: 'Creator roster',
      headingPrefix: 'YouTube creators your buyers ',
      headingHighlight: 'already watch.',
      lede: 'Three channels developers watch every week to learn to build with AI.',
      footnote: "Based on each creator's last 15 long-form videos. Updated {dataAsOf}.",
    },

    roster: {
      heading: 'The roster.',
      sub: 'Three from our roster. We work with more, and can suggest others for your product. Names on request: we keep creators anonymous until you’re ready to go ahead.',
      medianViewsLabel: 'views on a typical video',
      subscribersLabel: 'subscribers',
      uploadsLabel: 'new videos a month',
      usUkLabel: 'of viewers in the US or UK',
      platformLabel: 'YouTube channel',
    },

    studio: {
      heading: 'A deeper look.',
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

    whatYouGet: {
      heading: 'What you get.',
      note: 'Want to reuse the video in your own ads? Usage rights are priced separately. Ask and we’ll quote.',
    },

    // TODO: Abdurahman to confirm the 10% series discount and the stop-anytime terms.
    start: {
      heading: 'Start with one video, or go for three.',
      sub: 'Same creator either way. You approve the script and the final cut on every video.',
      options: [
        {
          label: 'Option 1',
          title: 'One video to test',
          body: 'One video with the creator who fits your product best. See how it performs before committing to more.',
        },
        {
          label: 'Option 2',
          title: 'A 3-video series',
          body: 'One video a month for three months, with 10% off each video. Repeat exposure to the same audience. Stop after the first if it isn’t working.',
          badge: '10% off',
          featured: true,
        },
      ],
      report: 'Every video comes with a results report 7 and 30 days after it goes live.',
      rates: 'Rates are based on each creator’s recent views. Reply and we’ll send them within a day.',
    },

    howItWorks: { heading: 'How it works.' },

    terms: { heading: 'The details.' },

    nextStep: {
      heading: 'Ready when you are.',
      body: 'Email us with the creator and option you want. You’ll get a brief and an invoice within a day.',
      cta: 'Email us',
      mailSubject: 'Sponsorship — [creator] / [format]',
      mailBody: 'Hi Abdurahman,\n\nWe’d like to go ahead.\n\nCreator (A, B or C):\nFormat (integration or dedicated video):\nProduct link:\nPreferred month:\n\nThanks,',
      note: 'Prefer to see the numbers first? Ask and we’ll send the creator’s YouTube Studio screenshots.',
    },
  },
};
