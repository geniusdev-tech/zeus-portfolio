import './Maintenance.css';

const Maintenance = () => {
    return (
        <div className="maintenance-container">
            <div className="maintenance-content">
                <div className="maintenance-header">
                    <div className="status-dot" />
                    <span className="status-text">[ STATUS: MAINTENANCE ]</span>
                </div>

                <div className="maintenance-kicker">ZEUS // QELO-X ACCESS PAUSED</div>
                <h1 className="maintenance-title">System Maintenance</h1>

                <p className="maintenance-message">
                    Scheduled upgrades are running. QELO-X access is paused while the environment
                    is stabilized, hardened and prepared for the next release cycle.
                </p>

                <div className="maintenance-highlights">
                    <span className="maintenance-chip">Hardening</span>
                    <span className="maintenance-chip">Runtime tuning</span>
                    <span className="maintenance-chip">Release prep</span>
                </div>

                <div className="maintenance-footer">
                    <div className="tech-stack">
                        <span>CORE_ENGINE: GO_1.22</span>
                        <span>UI_LAYER: REACT_VITE</span>
                        <span>STATUS: STABILIZING</span>
                    </div>
                </div>
            </div>

            <div className="grid-overlay" />
        </div>
    );
};

export default Maintenance;
