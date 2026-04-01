import { useReveal } from '../hooks';

import Hero from '../components/Hero';
import About from '../components/About';
import ITServices from '../components/ITServices';
import Projects from '../components/Projects';
import Philosophy from '../components/Philosophy';
import Stack from '../components/Stack';
import FAQ from '../components/FAQ/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Portfolio() {
    useReveal();

    return (
        <>
            <Hero />

            <div className="z-divider-line" />
            <About />

            <div className="z-divider-line" />
            <Projects />

            <div className="z-divider-line" />
            <ITServices />

            <div className="z-divider-line" />
            <Stack />

            <div className="z-divider-line" />
            <Contact />

            <div className="z-divider-line" />
            <FAQ />

            <div className="z-divider-line" />
            <Philosophy />

            <Footer />
        </>
    );
}
