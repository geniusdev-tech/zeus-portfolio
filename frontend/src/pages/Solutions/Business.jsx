import { Link } from 'react-router-dom';

export default function Business() {
  return (
    <div className="z-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="z-sec-tag cyan">Em construção</div>
        <h1 className="z-sec-title cyan" style={{ margin: '1rem 0' }}>Business</h1>
        <p style={{ color: 'var(--z-text)', margin: '0 0 2rem 0', maxWidth: '500px' }}>
          Esta página está refletida no sitemap e documentada, mas seu conteúdo final ainda está em desenvolvimento.
        </p>
        <Link to="/" className="z-btn z-btn-o" style={{ display: 'inline-block' }}>Voltar para a Home</Link>
      </div>
    </div>
  );
}
