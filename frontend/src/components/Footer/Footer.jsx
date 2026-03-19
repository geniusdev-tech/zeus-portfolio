import './Footer.css';

export default function Footer() {
  return (
    <footer className="z-footer">
      <div className="z-footer__left">
        © {new Date().getFullYear()} <span className="z-brand"><span className="z-brand__text">Zeus</span><span className="z-brand__cursor">_</span></span> — IT Professional. All rights reserved.
      </div>
      <div className="z-footer__right">
        <div className="z-footer__dot" />
        Systems operational
      </div>
    </footer>
  );
}
