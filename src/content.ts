// All page copy in one place, organized by section. Component files should
// read text from here rather than hardcoding it in JSX.

import type { Audience } from './types.ts';

interface Step {
  title: string;
  body: string;
}

export const CTA = {
  bookACall: 'Book a call',
};

export const NAV = {
  howWeWorkLink: 'How we work',
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
  toggle: {
    brandLabel: 'For SaaS Brands',
    influencerLabel: 'For Creators',
  },
  steps: {
    brand: [
      {
        title: 'We learn about your product',
        body: 'We talk with you about who buys from you, what makes your product different, and what a good result looks like: sign-ups, demos, or pipeline. It’s a real conversation, not a long onboarding process.',
      },
      {
        title: 'We find the right creators',
        body: 'We choose creators whose audience matches your buyers, like founders, operators, and engineers, not just the ones with the most followers. We check every creator before we suggest them to you.',
      },
      {
        title: 'We run the whole campaign',
        body: 'We handle the brief, the contract, product access, the timeline, and all communication with the creator. You approve the plan, and we manage the rest.',
      },
      {
        title: 'We show you the results',
        body: 'We give you clear numbers in plain language: clicks, sign-ups, and demos booked, what worked, what didn’t, and what we’d change next time.',
      },
    ],
    influencer: [
      {
        title: 'We learn about you',
        body: 'We talk with you about your content, your audience, your rates, and the kind of products you’d actually recommend. It’s a real conversation, not a long form.',
      },
      {
        title: 'We match you with the right products',
        body: 'We connect you with B2B and AI companies whose tools genuinely fit your audience and your content. We don’t send random offers or lowball rates.',
      },
      {
        title: 'We handle the contract',
        body: 'We manage the contract, the negotiation, and all the deadlines that come with it. You focus on creating, and we handle the rest.',
      },
      {
        title: 'We make sure you get paid',
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

export const CONTACT = {
  heading: "Let's talk.",
  body: "If it's a fit, you'll hear back within a day. If it's not, we'll tell you that too — and point you somewhere better.",
  directPrefix: 'Rather just email?',
  toggle: {
    brandLabel: "I'm a SaaS brand",
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
