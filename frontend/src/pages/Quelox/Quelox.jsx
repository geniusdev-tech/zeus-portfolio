import { useState, useEffect } from 'react';
import TuiSimulator from '../../components/TuiSimulator/TuiSimulator';
import CheckoutModal from '../../components/CheckoutModal/CheckoutModal';
import './Quelox.css';

export default function Quelox() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCheckout = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="quelox-page">
            {/* 1. HERO SECTION */}
            <section className="hero-section">
                <div className="quelox-container">
                    <div className="hero-grid">
                        <div className="hero-content">
                            <div className="hero-badge">
                                <span className="badge-dot" />
                                <span className="badge-text">v1.0.0 – PROFESSIONALLY HARDENED</span>
                            </div>

                            <h1 className="hero-title">QELO-X</h1>
                            <h2 className="hero-subtitle">Professional Node Orchestration for Critical Infrastructure</h2>

                            <ul className="hero-bullets">
                                <li>Automatic High Availability (Auto-Failover)</li>
                                <li>Real-Time Monitoring & Telemetry</li>
                                <li>Hardened IPC & UNIX Socket Security</li>
                            </ul>

                            <div className="hero-pricing">
                                <span className="price-anchor">R$ 297,00</span>
                                <div className="price-main">
                                    R$ 199,90 <span className="price-label">Launch Offer</span>
                                </div>
                            </div>

                            <button className="btn-primary-cta" onClick={handleCheckout}>
                                <span>ACTIVATE QELO-X</span>
                                <span>→</span>
                            </button>

                            <div className="cta-trust">
                                <span>🔐 SECURE PAYMENT</span>
                                <span>🔑 INDIVIDUAL LICENSE</span>
                                <span>⚡ INSTANT ACTIVATION</span>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <TuiSimulator />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. PROBLEM SECTION */}
            <section className="section-problem">
                <div className="quelox-container">
                    <span className="section-label">// CORE CHALLENGES</span>
                    <h2 className="section-title">Why manual orchestration fails.</h2>

                    <div className="problem-grid">
                        <div className="problem-card">
                            <h3>Unstable Nodes</h3>
                            <p>Manual configurations often lead to memory leaks and silent crashes, causing massive downtime.</p>
                        </div>
                        <div className="problem-card">
                            <h3>Zero Visibility</h3>
                            <p>Without real-time metrics, you're flying blind until your provider sends a suspension notice.</p>
                        </div>
                        <div className="problem-card">
                            <h3>Security Risks</h3>
                            <p>Exposed RPC ports and weak IPC configurations make your node a target for exploitation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SOLUTION SECTION */}
            <section className="section-solution">
                <div className="quelox-container">
                    <div className="solution-grid">
                        <div className="solution-content">
                            <span className="section-label">// THE QELO-X SOLUTION</span>
                            <h2 className="section-title">Built for absolute reliability.</h2>

                            <div className="feature-list">
                                <div className="feature-item">
                                    <h4>Auto-Failover & Recovery</h4>
                                    <p>Inteligent monitoring that automatically restarts or re-allocates resources before a crash occurs.</p>
                                </div>
                                <div className="feature-item">
                                    <h4>Real-Time Telemetry</h4>
                                    <p>Live tracking of CPU, RAM, Latency, and Peer count via a robust Go-based daemon.</p>
                                </div>
                                <div className="feature-item">
                                    <h4>Hardened IPC Sockets</h4>
                                    <p>Secure communication via UNIX sockets, keeping your backend isolated and impenetrable.</p>
                                </div>
                            </div>
                        </div>
                        <div className="solution-visual">
                            <div className="diagram-placeholder" style={{
                                border: '1px solid var(--border-subtle)',
                                padding: '40px',
                                background: 'rgba(0, 255, 136, 0.02)',
                                fontFamily: 'var(--font-technical)',
                                fontSize: '0.8rem',
                                color: 'var(--neon-green)'
                            }}>
                                <div>[SYSTEMD] ---➔ QELOX-DAEMON</div>
                                <div style={{ marginLeft: '20px', marginTop: '10px' }}>├── [IPC] ➔ GO-QUAI</div>
                                <div style={{ marginLeft: '20px' }}>├── [RPC] ➔ METRICS</div>
                                <div style={{ marginLeft: '20px' }}>└── [LOG] ➔ PERSISTENCE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. TECHNICAL DEEP DIVE */}
            <section className="section-technical">
                <div className="quelox-container">
                    <span className="section-label">// ARCHITECTURE</span>
                    <h2 className="section-title">Enterprise-grade core.</h2>

                    <div className="tech-cards">
                        <div className="tech-card">
                            <h3>MODULAR GO ENGINE</h3>
                            <p>The entire orchestrator is written in Go 1.22+, ensuring minimal CPU overhead and blazing fast execution speeds in Linux environments.</p>
                        </div>
                        <div className="tech-card">
                            <h3>SYSTEMD INTEGRATION</h3>
                            <p>Native integration as a system service, providing automatic logging, lifecycle management, and resource isolation.</p>
                        </div>
                        <div className="tech-card">
                            <h3>DYNAMIC SCALING</h3>
                            <p>Automatically adjusts P2P connection parameters based on network density and hardware availability.</p>
                        </div>
                        <div className="tech-card">
                            <h3>LOW LATENCY IPC</h3>
                            <p>Sub-millisecond communication between the orchestrator and the node, essential for real-time synchronization.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. COMPARISON TABLE */}
            <section className="section-comparison">
                <div className="quelox-container">
                    <span className="section-label">// VS MANUAL</span>
                    <h2 className="section-title">The QELO-X Advantage.</h2>

                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>FEATURE</th>
                                <th>MANUAL SCRIPTS</th>
                                <th className="highlight-col">QELO-X DAEMON</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Automation</td>
                                <td>None / Manual</td>
                                <td className="highlight-col">Full Lifecycle</td>
                            </tr>
                            <tr>
                                <td>Security</td>
                                <td>Exposed Ports</td>
                                <td className="highlight-col">Hardened IPC</td>
                            </tr>
                            <tr>
                                <td>Stability</td>
                                <td>High Failure Rate</td>
                                <td className="highlight-col">99.9% Uptime</td>
                            </tr>
                            <tr>
                                <td>Monitoring</td>
                                <td>Reactive</td>
                                <td className="highlight-col">Proactive/Live</td>
                            </tr>
                            <tr>
                                <td>Support</td>
                                <td>Community Only</td>
                                <td className="highlight-col">Dedicated Dev</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 6. SECURITY SECTION */}
            <section className="section-technical" style={{ background: 'var(--bg-deep)' }}>
                <div className="quelox-container">
                    <span className="section-label">// COMPLIANCE & SAFETY</span>
                    <h2 className="section-title">Secure by Design.</h2>
                    <div className="feature-list" style={{ maxWidth: '700px' }}>
                        <p>Every QELO-X binary is tied to an individual hardware-validated license. Our backend performs real-time validation to prevent unauthorized redistribution while ensuring your node orchestration remains private and local.</p>
                    </div>
                </div>
            </section>

            {/* 7. SOCIAL PROOF */}
            <section className="section-solution" style={{ background: '#080d0b', textAlign: 'center' }}>
                <div className="quelox-container">
                    <p style={{ fontFamily: 'var(--font-technical)', color: 'var(--neon-green)', fontSize: '1.2rem' }}>
                        "Designed for Professional Node Operators & Built for High Availability"
                    </p>
                </div>
            </section>

            {/* 8. CTA FINAL */}
            <section className="section-cta-final">
                <div className="quelox-container">
                    <div className="cta-box">
                        <h2>Ready to Professionalize Your Infrastructure?</h2>
                        <button className="btn-primary-cta" style={{ margin: '0 auto' }} onClick={handleCheckout}>
                            <span>ACTIVATE QELO-X NOW</span>
                            <span style={{ opacity: 0.6 }}>R$ 199,90</span>
                        </button>
                        <p style={{ marginTop: '24px', opacity: 0.4, fontSize: '0.8rem' }}>Limited Launch Pricing — Price increases to R$ 297,00 soon.</p>
                    </div>
                </div>
            </section>

            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productName="QELO-X LICENSE"
                price="199.90"
            />
        </div>
    );
}
