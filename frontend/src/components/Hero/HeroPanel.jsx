import { useState, useEffect, useRef } from 'react';

const SCENARIOS = [
  {
    cmd: 'whoami',
    output: ['zeus (uid: 1000) - full-stack infrastructure engineer'],
    color: 'dim'
  },
  {
    cmd: 'docker ps --format "table {{.Names}}\t{{.Status}}"',
    output: [
      'NAMES             STATUS',
      'zeus-backend      Up 14 days (healthy)',
      'portfolio-fe      Up 4 hours',
      'redis-stack       Up 14 days'
    ],
    color: 'green'
  },
  {
    cmd: 'curl -I https://api.zeus.dev/health',
    output: [
      'HTTP/2 200 OK',
      'content-type: application/json',
      'x-server-region: iad-1 (Vercel)',
      'x-backend-runtime: go1.22.5'
    ],
    color: 'cyan'
  },
  {
    cmd: 'ls -F projects/infrastructure/',
    output: [
      'ansible/  cloud-init.yaml  docker-compose.yml  terraform/',
      '0 files, 4 directories'
    ],
    color: 'yellow'
  },
  {
    cmd: 'nmap -v -p 80,8080,5432 localhost',
    output: [
      'PORT     STATE SERVICE',
      '80/tcp   open  http (Vite)',
      '8080/tcp open  http-alt (Go)',
      '5432/tcp open  postgresql'
    ],
    color: 'cyan'
  },
  {
    cmd: 'tail -n 3 /var/log/syslog',
    output: [
      '[14:20:41] kernel: [zeus] firewall: allowed in: tcp/80',
      '[14:20:42] backend: user_id=128 session_init: ok',
      '[14:20:45] systemd: monitoring services: operational'
    ],
    color: 'dim'
  }
];

export default function HeroPanel() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const scenario = SCENARIOS[scenarioIdx];
  const timerRef = useRef(null);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(t);
  }, []);

  // Main animation engine
  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      // 1. Wait a bit at the start
      await new Promise(r => setTimeout(r, 1000));
      if (!isMounted) return;

      // 2. Type the command
      for (let i = 0; i <= scenario.cmd.length; i++) {
        await new Promise(r => setTimeout(r, 40 + Math.random() * 50));
        if (!isMounted) return;
        setTyped(scenario.cmd.substring(0, i));
      }

      // 3. Wait before showing output (execution delay)
      await new Promise(r => setTimeout(r, 600));
      if (!isMounted) return;
      setShowOutput(true);

      // 4. Wait as result is shown
      await new Promise(r => setTimeout(r, 4000));
      if (!isMounted) return;

      // 5. Reset for next
      setShowOutput(false);
      setTyped('');
      setScenarioIdx((prev) => (prev + 1) % SCENARIOS.length);
    };

    runSequence();

    return () => { isMounted = false; };
  }, [scenarioIdx]);

  return (
    <div className="z-panel">
      <div className="z-panel__topline" />
      <div className="z-panel__bar">
        <div className="z-panel__dots">
          <span /><span /><span />
        </div>
        <div className="z-panel__title">zeus@host ~ console</div>
      </div>

      <div className="z-panel__body">
        {/* Static Header Info */}
        <div className="z-panel__line">
          <span className="z-panel__key">os</span>
          <span className="z-panel__val">Linux / zeus-os v2.4</span>
        </div>
        <div className="z-panel__line">
          <span className="z-panel__key">host</span>
          <span className="z-panel__val z-panel__val--cyan">zeus-infra-prod</span>
        </div>

        <div className="z-panel__divider" />

        {/* Dynamic Command Line */}
        <div className="z-panel__line">
          <span className="z-panel__prompt">$ </span>
          <span className="z-panel__cmd">{typed}</span>
          {(!showOutput || typed.length < scenario.cmd.length) && (
            <span className="z-panel__cursor" style={{ opacity: cursorVisible ? 1 : 0 }} />
          )}
        </div>

        {/* Dynamic Output */}
        {showOutput && (
          <div className="z-panel__output-group">
            {scenario.output.map((line, i) => (
              <div key={i} className={`z-panel__out z-panel__out--${scenario.color || 'default'}`}>
                {line.startsWith('[') || line.startsWith('↳') ? line : `↳ ${line}`}
              </div>
            ))}
            <div className="z-panel__line" style={{ marginTop: '8px' }}>
              <span className="z-panel__prompt">$ </span>
              <span className="z-panel__cursor" style={{ opacity: cursorVisible ? 1 : 0 }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
