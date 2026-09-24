import type { FormEvent } from 'react';
import { EMAIL } from '../../config.ts';
import { CONTACT_FORM } from '../../content.ts';
import FormField from './FormField.tsx';
import type { ContactFormConfig } from './formFields.ts';

interface ContactFormProps {
  config: ContactFormConfig;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error: boolean;
}

export default function ContactForm({ config, onSubmit, error }: ContactFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value={config.formName} />
      {/* Netlify honeypot — hidden from real users */}
      <p hidden><label>{CONTACT_FORM.honeypotLabel} <input name="bot-field" /></label></p>

      {config.rows.map((row) =>
        row.length > 1 ? (
          <div className="two" key={row.map((field) => field.id).join('-')}>
            {row.map((field) => <FormField key={field.id} {...field} />)}
          </div>
        ) : (
          <FormField key={row[0].id} {...row[0]} />
        )
      )}

      <button type="submit" className="btn btn-primary btn-lg btn-form-submit">{CONTACT_FORM.submitLabel}</button>
      <p className="form-note">{CONTACT_FORM.note}</p>
      {error && (
        <p className="form-note form-error">
          {CONTACT_FORM.errorPrefix} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      )}
    </form>
  );
}
