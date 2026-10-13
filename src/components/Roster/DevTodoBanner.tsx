interface DevTodoBannerProps {
  items: string[];
  isSample: boolean;
}

/** Dev-only checklist of unfilled fields. RosterPage only renders it when import.meta.env.DEV. */
export default function DevTodoBanner({ items, isSample }: DevTodoBannerProps) {
  if (items.length === 0 && !isSample) return null;

  return (
    <details className="dev-todo">
      <summary>Dev · {items.length} unfilled{isSample ? ' · sample data' : ''}</summary>
      {isSample && <p>Using the fake sample deck-export.public.json. Replace it with the real export.</p>}
      <p>Fill these in src/roster/content.ts (or the export). They're hidden in production until filled.</p>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </details>
  );
}
