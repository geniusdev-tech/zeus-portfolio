import { useEffect } from 'react';
import TuiSimulator from '../../components/TuiSimulator/TuiSimulator';
import './Quelox.css';

export default function Quelox() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="quelox-page">
            <section className="quelox-hero">
                <div className="quelox-container">
                    <div className="quelox-hero-content">
                        <div className="quelox-badge">DAEMON v1.0.0</div>
                        <h1 className="quelox-title">QELO-X</h1>
                        <p className="quelox-desc">
                            Orquestrador profissional para o node go-quai.
                            Projetado para máxima performance, segurança e estabilidade.
                        </p>

                        <div className="quelox-actions">
                            <button
                                className="btn-buy"
                                onClick={() => alert('Integração PixGo em breve! Por favor, entre em contato via e-mail.')}
                            >
                                COMPRAR AGORA — R$ 199.90
                            </button>
                            <button className="btn-secondary">VER DOCUMENTAÇÃO</button>
                        </div>

                        <div className="quelox-pixgo-tag">
                            🔒 Pagamento seguro via PixGO
                        </div>
                    </div>

                    <div className="quelox-hero-visual">
                        <TuiSimulator />
                    </div>
                </div>
            </section>

            <div className="z-divider-line" />

            <section className="quelox-features">
                <div className="quelox-container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>MODULAR GO</h3>
                            <p>Arquitetura limpa e extensível escrita 100% em Go.</p>
                        </div>
                        <div className="feature-card">
                            <h3>SYSTEMD READY</h3>
                            <p>Nativo para ambientes de produção Linux profissionais.</p>
                        </div>
                        <div className="feature-card">
                            <h3>SOCKET IPC</h3>
                            <p>Comunicação ultra-rápida via UNIX sockets (0600 privs).</p>
                        </div>
                        <div className="feature-card">
                            <h3>REAL-TIME</h3>
                            <p>Monitoramento e telemetria instantânea de todos os processos.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="quelox-bottom">
                <div className="quelox-container">
                    <div className="final-box">
                        <h2>Pronto para escalar sua infra?</h2>
                        <button className="btn-buy large">GERAR QR CODE PIX →</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
