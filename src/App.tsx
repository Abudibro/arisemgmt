import { useState } from 'react';
import Nav from './components/Nav/Nav.tsx';
import Hero from './components/Hero/Hero.tsx';
import HowWeWork from './components/HowWeWork/HowWeWork.tsx';
// import Founder from './components/Founder/Founder.tsx';
import Contact from './components/Contact/Contact.tsx';
import Footer from './components/Footer/Footer.tsx';
import type { Audience } from './types.ts';

export default function App() {
  const [audience, setAudience] = useState<Audience>('brand');

  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <HowWeWork audience={audience} onAudienceChange={setAudience} />
        {/* <Founder /> */}
        <Contact audience={audience} onAudienceChange={setAudience} />
      </main>
      <Footer />
    </>
  );
}
