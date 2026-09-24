import './PillToggle.css';

interface PillToggleProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  leftValue: T;
  rightValue: T;
  leftLabel: string;
  rightLabel: string;
  className?: string;
  ariaLabel?: string;
}

export default function PillToggle<T extends string>({
  value,
  onChange,
  leftValue,
  rightValue,
  leftLabel,
  rightLabel,
  className = '',
  ariaLabel = 'Choose your audience',
}: PillToggleProps<T>) {
  const isRight = value === rightValue;

  return (
    <div className={`pill-toggle ${className}`} role="group" aria-label={ariaLabel}>
      <span className={`pill-toggle-thumb${isRight ? ' right' : ''}`} aria-hidden="true"></span>
      <button
        type="button"
        className={`pill-toggle-btn${isRight ? '' : ' active'}`}
        aria-pressed={!isRight}
        onClick={() => onChange(leftValue)}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        className={`pill-toggle-btn${isRight ? ' active' : ''}`}
        aria-pressed={isRight}
        onClick={() => onChange(rightValue)}
      >
        {rightLabel}
      </button>
    </div>
  );
}
