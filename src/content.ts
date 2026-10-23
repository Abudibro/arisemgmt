// All page copy in one place, organized by section. Component files should
// read text from here rather than hardcoding it in JSX.

import type { Audience } from './types.ts';

export type StepIcon = 'chat' | 'search' | 'clipboard' | 'chart' | 'link' | 'contract' | 'wallet';

interface Step {
  title: string;
  body: string;
  icon: StepIcon;
  /** Short tags under the step. Only restate what `body` already promises. */
  chips: string[];
}

export const CTA = {
  bookACall: 'Book a call',
};

export const NAV = {
  howWeWorkLink: 'How we work',
  rosterLink: 'Our creators',
  rosterHref: '/roster/',
};

export const HERO = {
  status: 'Creator partnerships for B2B AI.',
  headingPrefix: 'Where ',
  headingHighlight: 'AI SaaS Brands & Creators ',
  headingSuffix: 'Align.',
  lede: "Whether you're an AI company or a creator, we manage the whole campaign for you, start to finish.",
  secondaryCta: 'See how we work',
};

export const HOW_WE_WORK = {
  heading: "Here's how it works.",
  subheading: 'Four simple steps, from start to finish.',
  cta: {
    // Brands only: the low-risk start, with the full options on /roster.
    // TODO: Abdurahman to confirm the 10% series discount (same as /roster).
    brand: {
      offer: 'Start with one video. If it works, add two more at 10% off.',
      text: 'Step one is a short call about your product.',
      button: 'Book a call',
      link: { label: 'See the creators and options', href: '/roster/#start' },
    },
    influencer: { offer: null, text: 'Step one is a short call about your channel.', button: 'Book a call', link: null },
  },
  toggle: {
    brandLabel: 'For Brands',
    influencerLabel: 'For Creators',
  },
  steps: {
    brand: [
      {
        title: 'We learn about your product',
        icon: 'chat',
        chips: ['Who buys from you', 'What makes you different', 'What a good result looks like'],
        body: 'We talk with you about who buys from you, what makes your product different, and what a good result looks like: sign-ups, demos, or pipeline. It’s a real conversation, not a long onboarding process.',
      },
      {
        title: 'We find the right creators',
        icon: 'search',
        chips: ['Audience matched to your buyers', 'Every creator checked'],
        body: 'We choose creators whose audience matches your buyers, like founders, operators, and engineers, not just the ones with the most followers. We check every creator before we suggest them to you.',
      },
      {
        title: 'We run the whole campaign',
        icon: 'clipboard',
        chips: ['Brief', 'Contract', 'Product access', 'Timeline', 'Creator comms'],
        body: 'We handle the brief, the contract, product access, the timeline, and all communication with the creator. You approve the plan, and we manage the rest.',
      },
      {
        title: 'We show you the results',
        icon: 'chart',
        chips: ['Clicks', 'Sign-ups', 'Demos booked', 'What we’d change'],
        body: 'We give you clear numbers in plain language: clicks, sign-ups, and demos booked, what worked, what didn’t, and what we’d change next time.',
      },
    ],
    influencer: [
      {
        title: 'We learn about you',
        icon: 'chat',
        chips: ['Your content', 'Your audience', 'Your rates'],
        body: 'We talk with you about your content, your audience, your rates, and the kind of products you’d actually recommend. It’s a real conversation, not a long form.',
      },
      {
        title: 'We match you with the right products',
        icon: 'link',
        chips: ['B2B and AI products that fit', 'No random offers or lowball rates'],
        body: 'We connect you with B2B and AI companies whose tools genuinely fit your audience and your content. We don’t send random offers or lowball rates.',
      },
      {
        title: 'We handle the contract',
        icon: 'contract',
        chips: ['Contract', 'Negotiation', 'Deadlines'],
        body: 'We manage the contract, the negotiation, and all the deadlines that come with it. You focus on creating, and we handle the rest.',
      },
      {
        title: 'We make sure you get paid',
        icon: 'wallet',
        chips: ['Paid on time', 'Late payments chased for you'],
        body: 'You get paid on time, every time. If a brand is ever slow to pay, we chase it down so you don’t have to.',
      },
    ],
  } satisfies Record<Audience, Step[]>,
};

export const FOUNDER = {
  heading: 'Meet the people behind Arise.',
  placeholderTitle: 'Founder video goes here',
  placeholderHint: 'Record a 60–90 second video introducing yourselves.',
};

// The person behind Arise. Shared by the homepage contact section and /roster.
// First name only, so the site doesn't point at a day job; add a surname if you want it.
export const FOUNDER_PROFILE = {
  name: 'Abdurahman',
  role: 'Founder, Arise',
  photo: '/founder.jpg',
};

// Homepage creators. Kept separate from the /roster data on purpose; the numbers
// match /roster (refreshed 18 Oct 2026, last 15 long-form videos).
// Anonymous: no names, handles, photos or per-creator brands until each creator
// agrees to be shown publicly. Once one does, add `name` and `photo` here.
// TODO: Abdurahman to check the niche lines.
export const HOME_CREATORS = {
  heading: 'Creators your buyers already watch.',
  sub: 'Developers and technical founders watch these channels to decide what to build with. Names on request.',
  // Counted up from 0 when the section scrolls into view.
  stats: [
    { to: 790, suffix: 'k', label: 'combined subscribers' },
    { to: 163, suffix: 'k', label: 'views per video, combined' },
    { to: 25, suffix: '', label: 'long-form videos a month' },
  ],
  // No sponsorship info on the homepage (counts, ratios or per-creator brands).
  creators: [
    {
      niche: 'Full-stack AI app builds, start to finish',
      subscribers: '483k',
      medianViews: '45k',
      uploadsPerMonth: '5',
    },
    {
      niche: 'Claude Code and AI coding workflows',
      subscribers: '172k',
      medianViews: '51k',
      uploadsPerMonth: '11',
    },
    {
      niche: 'New AI models, agents and local AI for builders',
      subscribers: '136k',
      medianViews: '66k',
      uploadsPerMonth: '9',
    },
  ],
  labels: {
    subscribers: 'subscribers',
    medianViews: 'median views',
    uploadsPerMonth: 'videos a month',
  },
  brandsLabel: 'These creators have made sponsored videos for',
  // Across all three creators, never per creator: per-creator brands identify the channel.
  brands: [
    'NVIDIA', 'Databricks', 'Dell', 'Lovable', 'Semrush', 'DataCamp', 'Render', 'Sanity',
    'RunPod', 'Runway', 'Base44', 'Superblocks', 'TrueFoundry', 'Hyperagent', 'Cookiebot',
  ],
  // Brand → single-colour mark under /public/logos (Simple Icons, CC0). Others show the name only.
  logos: {
    NVIDIA: '/logos/nvidia.svg',
    Databricks: '/logos/databricks.svg',
    Dell: '/logos/dell.svg',
    Semrush: '/logos/semrush.svg',
    DataCamp: '/logos/datacamp.svg',
    Render: '/logos/render.svg',
    Sanity: '/logos/sanity.svg',
  } as Record<string, string>,
  footnote: 'Based on each creator’s last 15 long-form videos, October 2026.',
};

// TODO: Abdurahman to check this wording. It's a first draft in your voice; make it true to you.
export const FOUNDER_NOTE = {
  eyebrow: 'Who you’ll work with',
  heading: 'Arise is one person, and that’s the point.',
  paragraphs: [
    'I started Arise because AI companies and the creators their buyers watch kept missing each other. Brands chased follower counts; creators got flooded with offers that didn’t fit their audience.',
    'So I keep it small. I pick every match myself, I read every brief, and I’m the one you message when something needs fixing. No account managers, no handoffs.',
  ],
};

export const CONTACT = {
  heading: "Let's talk.",
  // TODO: Abdurahman to check this wording. It sits under the email link, for brands and creators alike.
  founderBody: 'You’ll deal with me directly, from the first message to the end of the campaign.',
  body: "If it's a fit, you'll hear back within a day. If it's not, we'll tell you that too — and point you somewhere better.",
  directPrefix: 'Rather just email?',
  toggle: {
    brandLabel: "I'm a brand",
    influencerLabel: "I'm a creator",
  },
  success: {
    title: 'Got it — thanks.',
    body: "We'll be in touch within a day. In the meantime, feel free to email us directly at",
  },
};

export const CONTACT_FORM = {
  honeypotLabel: "Don't fill this out:",
  submitLabel: 'Send it over',
  note: "We'll only use this to reply to you. No lists, no spam.",
  errorPrefix: 'Something went wrong — please email us directly at',
};

export const FOOTER = {
  tagline: 'We connect B2B AI SaaS companies with the creators their buyers already follow.',
};
