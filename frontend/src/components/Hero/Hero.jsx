import HeroPanel from './HeroPanel';
import './Hero.css';

export default function Hero() {
  return (
    <section className="z-hero-section">
      <div className="z-hero">
        {/* Left — text */}
        <div className="z-hero__left">
          <div className="z-hero__tag">
            IT Professional — Full Stack Infrastructure
          </div>

          <div className="z-hero__name">Zeus</div>

          <h1 className="z-hero__h1">
            <span className="z-hero__h1-accent">Infrastructure.</span>
            Networks.
            <span className="z-hero__h1-dim">Automation.</span>
            Software.
          </h1>

          <p className="z-hero__sub">
            IT professional specialized in infrastructure management, networking,
            system analysis, automation and software development.
          </p>

          <div className="z-hero__cta">
            <a href="#projects" className="z-btn z-btn-g">View Projects →</a>
            <a href="#contact" className="z-btn z-btn-o">Contact</a>
          </div>
        </div>

        {/* Right — terminal panel */}
        <HeroPanel />
      </div>
    </section>
  );
}
