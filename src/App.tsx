import { useState } from 'react';
import Nav from './components/Nav/Nav.tsx';
import Hero from './components/Hero/Hero.tsx';
import WaffleGrid from './components/WaffleGrid/WaffleGrid.tsx';
import Creators from './components/Creators/Creators.tsx';
import HowWeWork from './components/HowWeWork/HowWeWork.tsx';
// import Founder from './components/Founder/Founder.tsx';
import FounderNote from './components/FounderNote/FounderNote.tsx';
import Contact from './components/Contact/Contact.tsx';
import Footer from './components/Footer/Footer.tsx';
import type { Audience } from './types.ts';

export default function App() {
  const [audience, setAudience] = useState<Audience>('brand');

  return (
    <>
      <Nav />
      <main id="top">
        <div className="waffle-host">
          <WaffleGrid />
          <Hero />
          <Creators />
          <FounderNote />
          <HowWeWork audience={audience} onAudienceChange={setAudience} />
        </div>
        {/* <Founder /> */}
        <Contact audience={audience} onAudienceChange={setAudience} />
      </main>
      <Footer />
    </>
  );
}
