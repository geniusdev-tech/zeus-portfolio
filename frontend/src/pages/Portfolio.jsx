import { useCursor, useReveal } from '../hooks';

import Hero from '../components/Hero';
import About from '../components/About';
import Expertise from '../components/Expertise';
import Projects from '../components/Projects';
import Stack from '../components/Stack';
import Philosophy from '../components/Philosophy';
import StatusDashboard from '../components/StatusDashboard';
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
            <Expertise />

            <div className="z-divider-line" />
            <Projects />

            <div className="z-divider-line" />
            <Stack />

            <div className="z-divider-line" />
            <Philosophy />

            <div className="z-divider-line" />
            <StatusDashboard />

            <div className="z-divider-line" />
            <Contact />

            <Footer />
        </>
    );
}
