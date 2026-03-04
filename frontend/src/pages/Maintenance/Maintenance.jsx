import React from 'react';
import './Maintenance.css';

const Maintenance = () => {
    return (
        <div className="maintenance-container">
            <div className="maintenance-content">
                <div className="maintenance-header">
                    <div className="status-dot"></div>
                    <span className="status-text">SYSTEM STATUS: MAINTENANCE</span>
                </div>

                <h1 className="maintenance-title">Under Maintenance</h1>

                <p className="maintenance-message">
                    We're currently performing scheduled infrastructure upgrades to enhance your experience.
                    The Zeus Ecosystem (including QELO-X) will be back online shortly.
                </p>

                <div className="maintenance-footer">
                    <div className="tech-stack">
                        <span>CORE_ENGINE: GO_1.22</span>
                        <span>UI_LAYER: REACT_VITE</span>
                        <span>STATUS: OPTIMIZING</span>
                    </div>
                </div>
            </div>

            <div className="grid-overlay"></div>
        </div>
    );
};

export default Maintenance;
