import { useState, useEffect } from 'react';
import { useI18n } from '../../i18n';
import './TuiSimulator.css';

export default function TuiSimulator() {
    const { locale, content } = useI18n();
    const { tui } = content.quelox;
    const [metrics, setMetrics] = useState({
        status: tui.running,
        synced: '100%',
        peers: 14,
        height: 1284052,
        uptime: '14d 05h',
        cpu: 18.4,
        ram: 256
    });

    useEffect(() => {
        setMetrics((prev) => ({
            ...prev,
            status: tui.running,
        }));
    }, [locale, tui.running]);

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
                <span className="tui-title">{tui.title}</span>
            </div>
            <div className="tui-content">
                <div className="tui-row">
                    <span className="tui-label">{tui.statusLabel}</span>
                    <span className="tui-value status-running">{metrics.status}</span>
                </div>
                <div className="tui-row">
                    <span className="tui-label">{tui.syncLabel}</span>
                    <span className="tui-value cyan">{metrics.synced}</span>
                </div>
                <div className="tui-row">
                    <span className="tui-label">{tui.peerLabel}</span>
                    <span className="tui-value">{metrics.peers}</span>
                </div>
                <div className="tui-row">
                    <span className="tui-label">{tui.heightLabel}</span>
                    <span className="tui-value yellow">{metrics.height.toLocaleString()}</span>
                </div>
                <div className="tui-row">
                    <span className="tui-label">{tui.uptimeLabel}</span>
                    <span className="tui-value">{metrics.uptime}</span>
                </div>

                <div className="tui-separator">────────────────────────</div>

                <div className="tui-metrics-grid">
                    <div className="tui-metric">
                        <span className="tui-label">{tui.cpuLabel}</span>
                        <div className="tui-bar-bg">
                            <div className="tui-bar-fill" style={{ width: `${metrics.cpu}%` }} />
                        </div>
                        <span className="tui-value small">{metrics.cpu}%</span>
                    </div>
                    <div className="tui-metric">
                        <span className="tui-label">{tui.ramLabel}</span>
                        <div className="tui-bar-bg">
                            <div className="tui-bar-fill" style={{ width: `${(metrics.ram / 1024) * 100}%` }} />
                        </div>
                        <span className="tui-value small">{metrics.ram}MB</span>
                    </div>
                </div>

                <div className="tui-footer">
                    <span className="tui-cursor">_</span>
                    <span className="tui-path">{tui.footer}</span>
                </div>
            </div>
        </div>
    );
}
