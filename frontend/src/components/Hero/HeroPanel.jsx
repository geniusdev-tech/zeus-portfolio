import { useState, useEffect } from 'react';

const PANEL_ROWS = [
  { key: 'name',  value: 'Zeus',              variant: 'green' },
  { key: 'role',  value: 'IT Professional',   variant: ''      },
  { key: 'focus', value: 'Infrastructure',    variant: 'cyan'  },
  { key: 'env',   value: 'Linux / Production',variant: ''      },
  { key: 'lang',  value: 'Go · Shell · Python',variant: ''     },
];

const SERVICES = [
  { name: 'infra.daemon',  status: 'running', green: true  },
  { name: 'net.monitor',   status: 'running', green: true  },
  { name: 'sys.analysis',  status: 'active',  green: true  },
  { name: 'dev.backend',   status: 'ready',   green: false },
];

export default function HeroPanel() {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 550);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="z-panel">
      {/* Top gradient line */}
      <div className="z-panel__topline" />

      {/* Window bar */}
      <div className="z-panel__bar">
        <div className="z-panel__dots">
          <span /><span /><span />
        </div>
        <div className="z-panel__title">zeus@host ~ profile</div>
      </div>

      {/* Body */}
      <div className="z-panel__body">
        {PANEL_ROWS.map(({ key, value, variant }) => (
          <div className="z-panel__line" key={key}>
            <span className="z-panel__key">{key}</span>
            <span className={`z-panel__val z-panel__val--${variant || 'default'}`}>
              {value}
            </span>
          </div>
        ))}

        <div className="z-panel__divider" />

        <div className="z-panel__line">
          <span className="z-panel__prompt">$ </span>
          <span className="z-panel__cmd">uptime --services</span>
        </div>

        {SERVICES.map(({ name, status, green }) => (
          <div className="z-panel__out" key={name}>
            ↳ {name}:{' '}
            <span style={{ color: green ? 'var(--green)' : 'var(--cyan)' }}>
              {status}
            </span>
          </div>
        ))}

        <div className="z-panel__divider" />

        <div className="z-panel__line">
          <span className="z-panel__prompt">$ </span>
          <span className="z-panel__cmd">status --all</span>
        </div>
        <div className="z-panel__out z-panel__out--green">
          All systems operational.
        </div>
        <div className="z-panel__line" style={{ marginTop: '4px' }}>
          <span className="z-panel__prompt">$ </span>
          <span
            className="z-panel__cursor"
            style={{ opacity: cursorVisible ? 1 : 0 }}
          />
        </div>
      </div>
    </div>
  );
}
