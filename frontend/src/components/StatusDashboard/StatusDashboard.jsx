import { useState, useEffect, useCallback, useRef } from 'react';
import { useI18n } from '../../i18n';
import './StatusDashboard.css';

const cleanUrl = (url) => {
  const fallback = import.meta.env.DEV
    ? 'http://localhost:8080'
    : 'https://zeus-backend-production-ee33.up.railway.app';
  if (!url) return fallback;
  const match = url.match(/https?:\/\/[^/\s]+/);
  return match ? match[0] : fallback;
};

const API_URL = cleanUrl(import.meta.env.VITE_API_URL);
const POLL_INTERVAL = 15_000;

// Service grouping config
const SYSTEM_SERVICES = ['qelox'];
const SITE_SERVICES = ['portfolio', 'backend'];

// ── Primitives ────────────────────────────────────────

function GaugeBar({ value, warn = 70, critical = 90 }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setWidth(Math.min(Math.max(value, 0), 100)), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const pct = Math.min(Math.max(value, 0), 100);
  const color = pct >= critical ? '#ff4d6a' : pct >= warn ? '#ffb830' : 'var(--green)';

  return (
    <div className="z-sd__gauge" ref={ref}>
      <div
        className="z-sd__gauge-fill"
        style={{ width: `${width}%`, background: color, boxShadow: `0 0 6px ${color}55` }}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const { content } = useI18n();
  const cfg = {
    running: [content.status.badgeLabels.running, 'green'],
    stopped: [content.status.badgeLabels.stopped, 'red'],
    maintenance: [content.status.badgeLabels.maintenance, 'yellow'],
    unknown: [content.status.badgeLabels.unknown, 'dim'],
  };
  const [label, cls] = cfg[status] || cfg.unknown;
  return <span className={`z-sd__badge z-sd__badge--${cls}`}>● {label}</span>;
}

function MetricCard({ label, value, unit, gauge, warn, critical, cyan }) {
  return (
    <div className={`z-sd__metric-card${cyan ? ' cyan' : ''}`}>
      <div className="z-sd__metric-label">{label}</div>
      <div className="z-sd__metric-value">
        {value}{unit && <span className="z-sd__metric-unit">{unit}</span>}
      </div>
      {gauge !== undefined && <GaugeBar value={gauge} warn={warn} critical={critical} />}
    </div>
  );
}

function SectionLabel({ children, style }) {
  return <div className="z-sd__section-label" style={style}>{children}</div>;
}

function Skeleton() {
  return (
    <div className="z-sd__skeleton-wrap">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="z-sd__skeleton" />
      ))}
    </div>
  );
}

// ── Service Row ───────────────────────────────────────

function ServiceRow({ svc }) {
  const { locale } = useI18n();
  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  const displayStatus = (isMaintenance && svc.name === 'qelox') ? 'maintenance' : svc.status;
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="z-sd__service">
      <div className="z-sd__service-left">
        <StatusBadge status={displayStatus} />
        <div className="z-sd__service-name">
          {svc.url ? (
            <a href={svc.url} target="_blank" rel="noopener noreferrer"
              className="z-sd__service-link">{svc.display_name}</a>
          ) : svc.display_name}
        </div>
      </div>
      <div className="z-sd__service-right">
        {svc.latency > 0 && (
          <span className="z-sd__service-meta">{svc.latency}ms</span>
        )}
        <span className="z-sd__service-time">
          {timeFormatter.format(new Date(svc.checked_at))}
        </span>
      </div>
    </div>
  );
}


// ── Main ─────────────────────────────────────────────

export default function StatusDashboard() {
  const { locale, content } = useI18n();
  const { status } = content;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastOk, setLastOk] = useState(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/status`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
      setLastOk(new Date());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    fetchStatus();
    const id = setInterval(fetchStatus, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [fetchStatus]);

  const srv = data?.server;
  const services = data?.services ?? [];
  const uptime = data?.uptime;
  const isLive = data?.mode === 'live';

  const systemSvcs = services.filter(s => SYSTEM_SERVICES.includes(s.name));
  const siteSvcs = services.filter(s => SITE_SERVICES.includes(s.name));

  return (
    <div className="z-full" id="status">
      <div className="z-section">
        {/* Section header */}
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag cyan">{status.sectionTag}</div>
          <div className="z-sec-title cyan">
            {status.titlePrefix}<br /><em>{status.titleEmphasis}</em>
          </div>
        </div>

        <div className="z-sd z-reveal">
          {/* Top bar */}
          <div className="z-sd__topbar">
          <div className="z-sd__topbar-left">
              <div className={`z-sd__pulse ${error ? 'error' : 'ok'}`} />
              <span className="z-sd__topbar-label">
                {error ? status.topbarUnavailable
                  : isLive ? status.topbarLive
                    : status.topbarSimulated}
              </span>
              {!error && !isLive && <span className="z-sd__topbar-pill">{status.simPill}</span>}
            </div>
            <div className="z-sd__topbar-right">
              {lastOk && (
                <span className="z-sd__updated">
                  {status.updated} {new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(lastOk)}
                </span>
              )}
              <button
                className={`z-sd__refresh${refreshing ? ' spinning' : ''}`}
                onClick={handleRefresh}
                disabled={refreshing}
                title={status.refresh}
              >↻</button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <Skeleton />
          ) : error ? (
            <div className="z-sd__error">
              <span className="z-sd__error-icon">⚠</span>
              <div>
                <div className="z-sd__error-title">{status.errorTitle}</div>
                <div className="z-sd__error-msg">{error}</div>
                <div className="z-sd__error-hint">
                  {status.errorHintBeforeCode} <code>README.md</code>{status.errorHintAfterCode}
                </div>
              </div>
            </div>
          ) : (
            <div className="z-sd__body">
              <SectionLabel>{status.hostMetrics}</SectionLabel>
              <div className="z-sd__metrics-grid">
                <MetricCard label={status.metricLabels.cpu}
                  value={srv.cpu_usage.toFixed(1)} unit="%"
                  gauge={srv.cpu_usage} warn={70} critical={90} />
                <MetricCard label={status.metricLabels.memory}
                  value={`${srv.mem_used_mb} / ${srv.mem_total_mb}`} unit=" MB"
                  gauge={srv.mem_pct} warn={75} critical={90} cyan />
                <MetricCard label={status.metricLabels.disk}
                  value={`${srv.disk_used_gb} / ${srv.disk_total_gb}`} unit=" GB"
                  gauge={srv.disk_pct} warn={70} critical={85} />
                <MetricCard label={status.metricLabels.load} value={srv.load_avg} cyan />
                <MetricCard label={status.metricLabels.region} value={srv.region || 'cloud'} />
                <MetricCard label={status.metricLabels.uptime} value={uptime?.raw ?? 'N/A'} cyan />
              </div>

              {/* Services row */}
              <div className="z-sd__services-row">
                {systemSvcs.length > 0 && (
                  <div className="z-sd__services-col">
                    <SectionLabel>{status.systemServices}</SectionLabel>
                    <div className="z-sd__services">
                      {systemSvcs.map(svc => <ServiceRow key={svc.name} svc={svc} />)}
                    </div>
                  </div>
                )}
                {siteSvcs.length > 0 && (
                  <div className="z-sd__services-col">
                    <SectionLabel>{status.siteServices}</SectionLabel>
                    <div className="z-sd__services">
                      {siteSvcs.map(svc => <ServiceRow key={svc.name} svc={svc} />)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
