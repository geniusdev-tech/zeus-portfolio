import { useState, useEffect } from 'react';
import './TuiSimulator.css';

export default function TuiSimulator() {
    const [metrics, setMetrics] = useState({
        status: 'RUNNING',
        synced: '100%',
        peers: 14,
        height: 1284052,
        uptime: '14d 05h',
        cpu: 18.4,
        ram: 256
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                height: prev.height + 1,
                cpu: (15 + Math.random() * 10).toFixed(1),
                ram: prev.ram + (Math.random() > 0.5 ? 1 : -1)
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="tui-box">
            <div className="tui-header">
                <span className="tui-dot" />
                <span className="tui-title">QELO-X TERMINAL v1.0.0</span>
            </div>
            <div className="tui-content">
                <div className="tui-row">
                    <span className="tui-label">NODE STATUS:</span>
                    <span className="tui-value status-running">{metrics.status}</span>
                </div>
                <div className="tui-row">
                    <span className="tui-label">SYNC PROGRESS:</span>
                    <span className="tui-value cyan">{metrics.synced}</span>
                </div>
                <div className="tui-row">
                    <span className="tui-label">PEER COUNT:</span>
                    <span className="tui-value">{metrics.peers}</span>
                </div>
                <div className="tui-row">
                    <span className="tui-label">BLOCK HEIGHT:</span>
                    <span className="tui-value yellow">{metrics.height.toLocaleString()}</span>
                </div>
                <div className="tui-row">
                    <span className="tui-label">UPTIME:</span>
                    <span className="tui-value">{metrics.uptime}</span>
                </div>

                <div className="tui-separator">────────────────────────</div>

                <div className="tui-metrics-grid">
                    <div className="tui-metric">
                        <span className="tui-label">CPU</span>
                        <div className="tui-bar-bg">
                            <div className="tui-bar-fill" style={{ width: `${metrics.cpu}%` }} />
                        </div>
                        <span className="tui-value small">{metrics.cpu}%</span>
                    </div>
                    <div className="tui-metric">
                        <span className="tui-label">RAM</span>
                        <div className="tui-bar-bg">
                            <div className="tui-bar-fill" style={{ width: `${(metrics.ram / 1024) * 100}%` }} />
                        </div>
                        <span className="tui-value small">{metrics.ram}MB</span>
                    </div>
                </div>

                <div className="tui-footer">
                    <span className="tui-cursor">_</span>
                    <span className="tui-path">systemd: active (running)</span>
                </div>
            </div>
        </div>
    );
}
