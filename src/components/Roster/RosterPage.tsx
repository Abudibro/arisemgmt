import { EMAIL } from '../../config.ts';
import { listUnfilled } from '../../roster/merge.ts';
import type { RosterContent, RosterData } from '../../roster/types.ts';
import Nav from '../Nav/Nav.tsx';
import WaffleGrid from '../WaffleGrid/WaffleGrid.tsx';
import Footer from '../Footer/Footer.tsx';
import RosterHero from './RosterHero.tsx';
import SponsorStrip from './SponsorStrip.tsx';
import WhyChannels from './WhyChannels.tsx';
import RosterCards from './RosterCards.tsx';
import StudioAudience from './StudioAudience.tsx';
import Proof from './Proof.tsx';
import WhatYouGet from './WhatYouGet.tsx';
import HowItWorks from './HowItWorks.tsx';
import Terms from './Terms.tsx';
import NextStep from './NextStep.tsx';
import DevTodoBanner from './DevTodoBanner.tsx';
import { useReveal } from './useReveal.ts';
import './Roster.css';

interface RosterPageProps {
  data: RosterData;
  content: RosterContent;
  /** True while the fake sample export is in place (dev banner only). */
  isSample?: boolean;
}

/** The unlisted /roster page: creators and what a brand gets. Prices are given privately, not on the page. */
export default function RosterPage({ data, content, isSample = false }: RosterPageProps) {
  const { copy } = content;
  useReveal();

  return (
    <>
      <Nav cta={{ label: copy.nav.cta, href: `mailto:${EMAIL}` }} showHowLink={false} />
      <main id="top" className="roster-page">
        <div className="waffle-host">
          <WaffleGrid />
          <RosterHero data={data} copy={copy.hero} />
          <SponsorStrip brands={data.brands} copy={copy.sponsors} />
        </div>
        <WhyChannels copy={copy.why} />
        <RosterCards creators={data.creators} copy={copy.roster} />
        <StudioAudience data={data} copy={copy.studio} platformLabel={copy.roster.platformLabel} />
        <Proof data={data} copy={copy.proof} />
        <WhatYouGet formats={content.formats} copy={copy.whatYouGet} />
        <HowItWorks steps={content.steps} copy={copy.howItWorks} />
        <Terms faq={content.faq} copy={copy.terms} />
        <NextStep copy={copy.nextStep} founder={content.founder} />
      </main>
      <Footer />
      {import.meta.env.DEV && <DevTodoBanner items={listUnfilled(data)} isSample={isSample} />}
    </>
  );
}
