import { useState, useEffect } from 'react';

// ── ZSH prompt segments ───────────────────────────────
const ZSH_PROMPT = { user: 'zeus', host: 'infra-prod', branch: 'main' };

// ── Scenarios: DevSecOps + Blockchain ────────────────
const SCENARIOS = [
  {
    cmd: 'trivy image zeus-backend:latest --severity HIGH,CRITICAL',
    exitCode: 0,
    output: [
      { text: 'INFO  Scanning image: zeus-backend:latest', color: 'dim' },
      { text: 'INFO  [vuln] ✓  0 HIGH, 0 CRITICAL found', color: 'green' },
      { text: '─────────────────────────────────────────', color: 'dim' },
      { text: 'Total: 0 (HIGH: 0, CRITICAL: 0)', color: 'green' },
      { text: 'Image hardened.  PASS ✓', color: 'green' },
    ]
  },
  {
    cmd: 'docker build -t zeus/backend:v2.1 . && docker push zeus/backend:v2.1',
    exitCode: 0,
    output: [
      { text: '[1/4] FROM golang:1.22-alpine   ✓', color: 'dim' },
      { text: '[2/4] COPY . /app               ✓', color: 'dim' },
      { text: '[3/4] RUN go build -o /bin/api  ✓', color: 'cyan' },
      { text: '[4/4] EXPOSE 8080               ✓', color: 'cyan' },
      { text: 'Successfully pushed zeus/backend:v2.1', color: 'green' },
    ]
  },
  {
    cmd: 'terraform plan -out=tfplan && terraform apply tfplan',
    exitCode: 0,
    output: [
      { text: 'Terraform will perform the following actions:', color: 'dim' },
      { text: '  + aws_ecs_service.api_service  (create)', color: 'green' },
      { text: '  + aws_lb_target_group.api      (create)', color: 'green' },
      { text: '  ~ aws_security_group.backend   (update)', color: 'yellow' },
      { text: 'Plan: 2 to add, 1 to change, 0 to destroy', color: 'cyan' },
    ]
  },
  {
    cmd: 'npx hardhat run scripts/deploy.js --network quai_mainnet',
    exitCode: 0,
    output: [
      { text: 'Compiling 3 Solidity files…        ✓', color: 'dim' },
      { text: 'Deploying ZeusVault.sol to quai_mainnet…', color: 'cyan' },
      { text: 'Contract deployed to:', color: 'text' },
      { text: '  0xDEAD…b33f  (quai://zone-0-0)', color: 'green' },
      { text: 'Gas used: 284,210   Block: #4,820,114', color: 'yellow' },
    ]
  },
  {
    cmd: 'go-quai attach --exec "quai.blockNumber, quai.syncing"',
    exitCode: 0,
    output: [
      { text: 'Attaching to /tmp/quai.ipc…', color: 'dim' },
      { text: 'blockNumber: 4820115', color: 'green' },
      { text: 'syncing: false', color: 'cyan' },
      { text: 'peers: 18  txPool: 3 pending', color: 'yellow' },
      { text: 'Node healthy.  ↑ 14d 6h', color: 'green' },
    ]
  },
  {
    cmd: 'python3 wallet.py --chain ETH --addr 0xAb12…9f check',
    exitCode: 0,
    output: [
      { text: 'Chain:    Ethereum Mainnet', color: 'dim' },
      { text: 'Balance:  1.482 ETH  ($4,821.40)', color: 'green' },
      { text: 'Nonce:    47', color: 'cyan' },
      { text: 'Last tx:  0xa3b…2c1  2h ago', color: 'yellow' },
      { text: 'No blacklist flags found.  ✓', color: 'green' },
    ]
  },
];

// ── Helpers ───────────────────────────────────────────

function now() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ── Prompt Component ──────────────────────────────────

function ZshPrompt({ partial, done, cursorVisible, exitCode }) {
  const { user, host, branch } = ZSH_PROMPT;
  return (
    <div className="z-term__prompt-row">
      <span className="z-term__seg z-term__seg--time">{now()}</span>
      <span className="z-term__seg z-term__seg--user">{user}</span>
      <span className="z-term__seg z-term__seg--at">@</span>
      <span className="z-term__seg z-term__seg--host">{host}</span>
      <span className="z-term__seg z-term__seg--dir"> ~</span>
      <span className="z-term__seg z-term__seg--git"> ⎇ {branch}</span>
      {done && exitCode === 0 && <span className="z-term__seg z-term__seg--ok"> ✓</span>}
      <span className="z-term__seg z-term__seg--arrow"> ❯</span>
      <span className="z-term__cmd"> {partial}</span>
      {!done && (
        <span className="z-term__cursor" style={{ opacity: cursorVisible ? 1 : 0 }} />
      )}
    </div>
  );
}

function EmptyPrompt({ cursorVisible }) {
  const { user, host, branch } = ZSH_PROMPT;
  return (
    <div className="z-term__prompt-row">
      <span className="z-term__seg z-term__seg--time">{now()}</span>
      <span className="z-term__seg z-term__seg--user">{user}</span>
      <span className="z-term__seg z-term__seg--at">@</span>
      <span className="z-term__seg z-term__seg--host">{host}</span>
      <span className="z-term__seg z-term__seg--dir"> ~</span>
      <span className="z-term__seg z-term__seg--git"> ⎇ {branch}</span>
      <span className="z-term__seg z-term__seg--arrow"> ❯</span>
      <span className="z-term__cursor" style={{ opacity: cursorVisible ? 1 : 0 }} />
    </div>
  );
}

function OutputLine({ line }) {
  return (
    <div className={`z-term__out z-term__out--${line.color || 'text'}`}>
      {line.icon && <span className="z-term__out-icon">{line.icon} </span>}
      {line.text}
    </div>
  );
}

function HistoryEntry({ scenario }) {
  const { user, host, branch } = ZSH_PROMPT;
  return (
    <div className="z-term__history">
      <div className="z-term__prompt-row">
        <span className="z-term__seg z-term__seg--time z-term__seg--muted">{now()}</span>
        <span className="z-term__seg z-term__seg--user z-term__seg--muted">{user}</span>
        <span className="z-term__seg z-term__seg--at z-term__seg--muted">@</span>
        <span className="z-term__seg z-term__seg--host z-term__seg--muted">{host}</span>
        <span className="z-term__seg z-term__seg--dir z-term__seg--muted"> ~</span>
        <span className="z-term__seg z-term__seg--git z-term__seg--muted"> ⎇ {branch}</span>
        <span className="z-term__seg z-term__seg--ok z-term__seg--muted"> ✓</span>
        <span className="z-term__seg z-term__seg--arrow z-term__seg--muted"> ❯</span>
        <span className="z-term__cmd z-term__cmd--dim"> {scenario.cmd}</span>
      </div>
      {scenario.output.slice(0, 2).map((line, i) => (
        <OutputLine key={i} line={{ ...line, color: 'dim' }} />
      ))}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────

export default function HeroPanel() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [history, setHistory] = useState([]);

  const scenario = SCENARIOS[scenarioIdx];

  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      setTyped('');
      setShowOutput(false);

      await delay(900);
      if (!alive) return;

      for (let i = 0; i <= scenario.cmd.length; i++) {
        await delay(28 + Math.random() * 45);
        if (!alive) return;
        setTyped(scenario.cmd.substring(0, i));
      }

      await delay(500);
      if (!alive) return;
      setShowOutput(true);

      await delay(3800);
      if (!alive) return;

      setHistory(prev => [scenario, ...prev].slice(0, 1));
      setScenarioIdx(i => (i + 1) % SCENARIOS.length);
    };

    run();
    return () => { alive = false; };
  }, [scenarioIdx]);

  return (
    <div className="z-panel">
      <div className="z-panel__topline" />

      <div className="z-panel__bar">
        <div className="z-panel__dots">
          <span className="z-panel__dot dot-red" />
          <span className="z-panel__dot dot-yellow" />
          <span className="z-panel__dot dot-green" />
        </div>
        <div className="z-panel__title">
          zsh — {ZSH_PROMPT.user}@{ZSH_PROMPT.host}
        </div>
        <div className="z-panel__winctrl">
          <span className="z-panel__winbtn">⊟</span>
        </div>
      </div>

      <div className="z-panel__body">
        {history.map((s, i) => (
          <HistoryEntry key={i} scenario={s} />
        ))}

        <ZshPrompt
          partial={typed}
          done={showOutput}
          cursorVisible={cursorVisible}
          exitCode={scenario.exitCode}
        />

        {showOutput && (
          <div className="z-panel__output-group">
            {scenario.output.map((line, i) => (
              <OutputLine key={i} line={line} />
            ))}
            <EmptyPrompt cursorVisible={cursorVisible} />
          </div>
        )}
      </div>
    </div>
  );
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
