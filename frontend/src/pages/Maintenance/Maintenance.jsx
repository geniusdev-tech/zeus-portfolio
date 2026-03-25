import { useI18n } from '../../i18n';
import './Maintenance.css';

const Maintenance = () => {
    const { content } = useI18n();
    const { maintenance } = content;

    return (
        <div className="maintenance-container">
            <div className="maintenance-content">
                <div className="maintenance-header">
                    <div className="status-dot" />
                    <span className="status-text">{maintenance.status}</span>
                </div>

                <div className="maintenance-kicker">{maintenance.kicker}</div>
                <h1 className="maintenance-title">{maintenance.title}</h1>

                <p className="maintenance-message">
                    {maintenance.message}
                </p>

                <div className="maintenance-highlights">
                    {maintenance.highlights.map((item) => (
                        <span className="maintenance-chip" key={item}>{item}</span>
                    ))}
                </div>

                <div className="maintenance-footer">
                    <div className="tech-stack">
                        {maintenance.footer.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid-overlay" />
        </div>
    );
};

export default Maintenance;
