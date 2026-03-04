import { useState, useEffect, useCallback, useRef } from 'react';
import './StatusDashboard.css';

const cleanUrl = (url) => {
  if (!url) return 'http://localhost:8080';
  const match = url.match(/https?:\/\/[^/\s]+/);
  return match ? match[0] : url;
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
  const cfg = {
    running: ['online', 'green'],
    stopped: ['offline', 'red'],
    maintenance: ['maintenance', 'yellow'],
    unknown: ['unknown', 'dim']
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
  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  const displayStatus = (isMaintenance && svc.name === 'qelox') ? 'maintenance' : svc.status;

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
          {new Date(svc.checked_at).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}


// ── Main ─────────────────────────────────────────────

export default function StatusDashboard() {
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
          <div className="z-sec-tag cyan">05 — System Status</div>
          <div className="z-sec-title cyan">
            Infrastructure<br /><em>At a Glance.</em>
          </div>
        </div>

        <div className="z-sd z-reveal">
          {/* Top bar */}
          <div className="z-sd__topbar">
            <div className="z-sd__topbar-left">
              <div className={`z-sd__pulse ${error ? 'error' : 'ok'}`} />
              <span className="z-sd__topbar-label">
                {error ? 'Backend unreachable'
                  : isLive ? 'Live · polling every 15s'
                    : 'Demo mode · polling every 15s'}
              </span>
              {!error && !isLive && <span className="z-sd__topbar-pill">sim</span>}
            </div>
            <div className="z-sd__topbar-right">
              {lastOk && (
                <span className="z-sd__updated">Updated {lastOk.toLocaleTimeString()}</span>
              )}
              <button
                className={`z-sd__refresh${refreshing ? ' spinning' : ''}`}
                onClick={handleRefresh}
                disabled={refreshing}
                title="Refresh"
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
                <div className="z-sd__error-title">Cannot reach backend</div>
                <div className="z-sd__error-msg">{error}</div>
                <div className="z-sd__error-hint">Deploy the Go backend — see <code>README.md</code>.</div>
              </div>
            </div>
          ) : (
            <div className="z-sd__body">
              <SectionLabel>Server Metrics</SectionLabel>
              <div className="z-sd__metrics-grid">
                <MetricCard label="CPU Usage"
                  value={srv.cpu_usage.toFixed(1)} unit="%"
                  gauge={srv.cpu_usage} warn={70} critical={90} />
                <MetricCard label="Memory"
                  value={`${srv.mem_used_mb} / ${srv.mem_total_mb}`} unit=" MB"
                  gauge={srv.mem_pct} warn={75} critical={90} cyan />
                <MetricCard label="Disk"
                  value={`${srv.disk_used_gb} / ${srv.disk_total_gb}`} unit=" GB"
                  gauge={srv.disk_pct} warn={70} critical={85} />
                <MetricCard label="Load Avg" value={srv.load_avg} cyan />
                <MetricCard label="Region" value={srv.region || 'cloud'} />
                <MetricCard label="Uptime" value={uptime?.raw ?? 'N/A'} cyan />
              </div>

              {/* Services row */}
              <div className="z-sd__services-row">
                {systemSvcs.length > 0 && (
                  <div className="z-sd__services-col">
                    <SectionLabel>System</SectionLabel>
                    <div className="z-sd__services">
                      {systemSvcs.map(svc => <ServiceRow key={svc.name} svc={svc} />)}
                    </div>
                  </div>
                )}
                {siteSvcs.length > 0 && (
                  <div className="z-sd__services-col">
                    <SectionLabel>Portfolio</SectionLabel>
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
