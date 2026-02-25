import { useState, useEffect, useCallback } from 'react';
import './StatusDashboard.css';

const cleanUrl = (url) => {
  if (!url) return 'http://localhost:8080';
  const match = url.match(/https?:\/\/[^\s]+/);
  return match ? match[0] : url;
};

const API_URL = cleanUrl(import.meta.env.VITE_API_URL);
const POLL_INTERVAL = 15_000;

const GH_ICONS = {
  push: '↑', create: '+', pr: '⎇', issue: '◎',
  star: '★', fork: '⑂', delete: '×', release: '◈', activity: '○',
};

// ── Primitives ────────────────────────────────────────

function GaugeBar({ value, warn = 70, critical = 90 }) {
  const pct   = Math.min(Math.max(value, 0), 100);
  const color = pct >= critical ? '#ff4d6a' : pct >= warn ? '#ffb830' : 'var(--green)';
  return (
    <div className="z-sd__gauge">
      <div className="z-sd__gauge-fill"
        style={{ width: `${pct}%`, background: color, boxShadow: `0 0 6px ${color}55` }} />
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = { running: ['online','green'], stopped: ['offline','red'], unknown: ['unknown','dim'] };
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

function Skeleton({ rows = 3 }) {
  return (
    <div className="z-sd__skeleton-wrap">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="z-sd__skeleton" />
      ))}
    </div>
  );
}

// ── GitHub Feed ───────────────────────────────────────

function GitHubFeed() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res  = await fetch(`${API_URL}/api/github/activity`);
        if (!res.ok) throw new Error();
        setData(await res.json());
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  if (loading) return <Skeleton rows={6} />;

  if (error) return (
    <div className="z-sd__gh-error">
      Set <code>GITHUB_USERNAME</code> in the backend to see real activity.
    </div>
  );

  const events = data?.events?.slice(0, 10) ?? [];

  return (
    <div className="z-sd__gh-feed">
      {events.length === 0 && (
        <div className="z-sd__gh-empty">No recent public activity.</div>
      )}
      {events.map((ev) => (
        <div key={ev.id} className="z-sd__gh-event">
          <div className="z-sd__gh-icon">{GH_ICONS[ev.icon] || '○'}</div>
          <div className="z-sd__gh-body">
            <div className="z-sd__gh-desc">{ev.description}</div>
            <div className="z-sd__gh-meta">
              <a href={ev.repo_url} target="_blank" rel="noopener noreferrer"
                className="z-sd__gh-repo">
                {ev.repo.includes('/') ? ev.repo.split('/')[1] : ev.repo}
              </a>
              <span className="z-sd__gh-time">{ev.time_ago}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────

export default function StatusDashboard() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [lastOk,  setLastOk]  = useState(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res  = await fetch(`${API_URL}/api/status`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
      setLastOk(new Date());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const id = setInterval(fetchStatus, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [fetchStatus]);

  const srv      = data?.server;
  const services = data?.services ?? [];
  const uptime   = data?.uptime;
  const isLive   = data?.mode === 'live';

  return (
    <div className="z-full" id="status">
      <div className="z-section">
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag cyan">Live — System Status</div>
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
                  : 'Simulated metrics · polling every 15s'}
              </span>
              {!error && !isLive && (
                <span className="z-sd__topbar-pill">sim</span>
              )}
            </div>
            <div className="z-sd__topbar-right">
              {lastOk && (
                <span className="z-sd__updated">{lastOk.toLocaleTimeString()}</span>
              )}
              <button className="z-sd__refresh" onClick={fetchStatus} title="Refresh">↻</button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <Skeleton rows={6} />
          ) : error ? (
            <div className="z-sd__error">
              <span className="z-sd__error-icon">⚠</span>
              <div>
                <div className="z-sd__error-title">Cannot reach backend</div>
                <div className="z-sd__error-msg">{error}</div>
                <div className="z-sd__error-hint">
                  Deploy the Go backend on Railway or Render. See README for instructions.
                </div>
              </div>
            </div>
          ) : (
            <div className="z-sd__body">
              {/* Left — metrics + services */}
              <div className="z-sd__col-left">
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

                <SectionLabel style={{ marginTop: '32px' }}>Project Status</SectionLabel>
                <div className="z-sd__services">
                  {services.map((svc) => (
                    <div key={svc.name} className="z-sd__service">
                      <div className="z-sd__service-left">
                        <StatusBadge status={svc.status} />
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
                  ))}
                </div>
              </div>

              {/* Right — GitHub */}
              <div className="z-sd__col-right">
                <SectionLabel>GitHub Activity</SectionLabel>
                <GitHubFeed />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
