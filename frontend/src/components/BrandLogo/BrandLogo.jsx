import { useId } from 'react';
import './BrandLogo.css';

function ZeusIcon({ gradientId, glowId }) {
  return (
    <svg
      className="z-logo__icon"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="28" y1="24" x2="148" y2="154" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00ff8c" />
          <stop offset="100%" stopColor="#00e5ff" />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#${glowId})`}>
        <circle
          cx="90"
          cy="90"
          r="60"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="14 9"
        />

        <circle cx="90" cy="90" r="71" fill="none" stroke="rgba(0, 255, 140, 0.12)" strokeWidth="1.4" />

        <path
          d="M90 28C109 31 126 41 137 57"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M146 87C146 71 141 58 133 47"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M44 121C53 134 67 144 83 148"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M32 87C32 73 37 60 46 49"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        <path
          d="M91 26L52 94H84L73 154L131 73H99L91 26Z"
          fill={`url(#${gradientId})`}
        />

        <circle cx="32" cy="88" r="3.1" fill="#00ff8c" />
        <circle cx="46" cy="47" r="3.1" fill="#00ff8c" />
        <circle cx="136" cy="45" r="3.1" fill="#00ff8c" />
        <circle cx="148" cy="87" r="3.1" fill="#00ff8c" />
        <circle cx="132" cy="136" r="3.1" fill="#00ff8c" />
        <circle cx="78" cy="154" r="3.1" fill="#00ff8c" />

        <path
          d="M62 74H49"
          stroke="rgba(0, 255, 140, 0.6)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M121 105H138"
          stroke="rgba(0, 255, 140, 0.6)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default function BrandLogo({
  variant = 'inline',
  size = 'md',
  className = '',
  label = 'ZeusProtocol.cloud',
}) {
  const uid = useId().replace(/:/g, '');
  const gradientId = `zeus-logo-gradient-${uid}`;
  const glowId = `zeus-logo-glow-${uid}`;
  const isMarkOnly = variant === 'mark';

  return (
    <span
      className={`z-logo z-logo--${variant} z-logo--${size}${className ? ` ${className}` : ''}`}
      {...(isMarkOnly ? { role: 'img', 'aria-label': label } : {})}
    >
      <ZeusIcon gradientId={gradientId} glowId={glowId} />

      {!isMarkOnly ? (
        <span className="z-logo__wordmark" aria-hidden="true">
          <span className="z-logo__name">ZeusProtocol</span>
          <span className="z-logo__dot">.</span>
          <span className="z-logo__tld">cloud</span>
        </span>
      ) : (
        <span className="z-logo__sr-only">{label}</span>
      )}
    </span>
  );
}
