import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RosterPage from './components/Roster/RosterPage.tsx';
import { rosterContent } from './roster/content.ts';
import { isSampleExport, rosterData } from './roster/data.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RosterPage data={rosterData} content={rosterContent} isSample={isSampleExport} />
  </StrictMode>,
);
