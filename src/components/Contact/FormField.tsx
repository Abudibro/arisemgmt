import type { FieldConfig } from './formFields.ts';

export default function FormField(field: FieldConfig) {
  const { id, name, label, required, placeholder } = field;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {field.type === 'select' ? (
        <select id={id} name={name} required={required}>
          {field.options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea id={id} name={name} placeholder={placeholder} required={required} />
      ) : (
        <input id={id} name={name} type={field.type} placeholder={placeholder} autoComplete={field.autoComplete} required={required} />
      )}
    </div>
  );
}
