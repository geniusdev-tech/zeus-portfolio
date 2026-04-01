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

            <div className="z-mobile-card-wrapper">
                <div className="z-divider-line" />
                <div className="z-mobile-card"><About /></div>

                <div className="z-divider-line" />
                <div className="z-mobile-card"><Projects /></div>

                <div className="z-divider-line" />
                <div className="z-mobile-card"><ITServices /></div>

                <div className="z-divider-line" />
                <div className="z-mobile-card"><Stack /></div>

                <div className="z-divider-line" />
                <div className="z-mobile-card"><Contact /></div>

                <div className="z-divider-line" />
                <div className="z-mobile-card"><FAQ /></div>

                <div className="z-divider-line" />
                <div className="z-mobile-card"><Philosophy /></div>
            </div>

            <Footer />
        </>
    );
}
