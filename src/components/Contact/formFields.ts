import type { Audience } from '../../types.ts';

// Field layout for each audience's contact form. Each row renders as a single
// field, or — when it holds two entries — as a side-by-side pair (see `.two`
// in Contact.css). Drives ContactForm so the brand/influencer forms stay
// data, not duplicated JSX.

interface BaseFieldConfig {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}

interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'email';
}

interface TextareaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
}

interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: string[];
}

export type FieldConfig = TextFieldConfig | TextareaFieldConfig | SelectFieldConfig;

export interface ContactFormConfig {
  formName: string;
  rows: FieldConfig[][];
}

export const CONTACT_FORMS: Record<Audience, ContactFormConfig> = {
  brand: {
    formName: 'contact',
    rows: [
      [
        { id: 'name', name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', required: true },
        { id: 'email', name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
      ],
      [
        { id: 'brand', name: 'brand', label: 'Company or website', type: 'text', placeholder: 'e.g. yourproduct.ai', required: true },
      ],
      [
        { id: 'sells', name: 'sells', label: 'What does your product do?', type: 'text', placeholder: 'AI note-taker, sales copilot, dev tooling…', required: true },
        {
          id: 'budget',
          name: 'budget',
          label: 'Rough monthly budget',
          type: 'select',
          options: ['Just getting things moving', 'Under £2k', '£2k–£5k', '£5k–£15k', '£15k+'],
        },
      ],
      [
        { id: 'msg', name: 'msg', label: 'Anything else? (optional)', type: 'textarea', placeholder: "What you're hoping to get out of this." },
      ],
    ],
  },
  influencer: {
    formName: 'influencer',
    rows: [
      [
        { id: 'i-name', name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', required: true },
        { id: 'i-email', name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
      ],
      [
        { id: 'handle', name: 'handle', label: 'Your handle', type: 'text', placeholder: '@yourhandle', required: true },
      ],
      [
        { id: 'niche', name: 'niche', label: "What's your content about?", type: 'text', placeholder: 'AI tools, SaaS, startups, productivity…', required: true },
        {
          id: 'followers',
          name: 'followers',
          label: 'Follower count',
          type: 'select',
          options: ['Not sure yet', 'Under 5k', '5k–20k', '20k–100k', '100k+'],
        },
      ],
      [
        { id: 'rate', name: 'rate', label: 'Rate expectations', type: 'text', placeholder: 'e.g. £500/post, or “open to offers”' },
        { id: 'portfolio', name: 'portfolio', label: 'Media kit or portfolio (optional)', type: 'text', placeholder: "Link, if you've got one" },
      ],
      [
        { id: 'i-msg', name: 'msg', label: 'Anything else? (optional)', type: 'textarea', placeholder: "Platforms you post on, products you'd love to work with, anything." },
      ],
    ],
  },
};
