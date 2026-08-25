import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// ── Brand colors ──────────────────────────────────────────────────────────────
const colors = {
  primary: '#947f64',
  gold: '#d0a937',
  bg: '#ffffff',
};

// ── Base outline style (shared across all SVG paths) ─────────────────────────
const outline = {
  fill: 'none',
  stroke: colors.primary,
  strokeWidth: '2.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeDasharray: '1000',
  strokeDashoffset: '1000',
  animation: 'drawPlastid 4s ease-in-out infinite',
};

const accentOutline = { stroke: colors.gold };

// ── Keyframe CSS injected once ────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes drawPlastid {
    0%   { stroke-dashoffset: 1000; opacity: 0; }
    10%  { opacity: 1; }
    50%  { stroke-dashoffset: 0; }
    80%  { stroke-dashoffset: 0; opacity: 1; }
    100% { stroke-dashoffset: -1000; opacity: 0; }
  }
  @keyframes fadeInSlow {
    0%, 100% { opacity: 0; }
    40%, 70%  { opacity: 1; }
  }
`;

// ── The exact SVG + text block from the user's design ─────────────────────────
function PIALoaderContent() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '500px',
        backgroundColor: colors.bg,
      }}
    >
      <style>{KEYFRAMES}</style>

      <svg
        viewBox="0 0 400 450"
        style={{
          width: '200px',
          height: 'auto',
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.05))',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === The Structure === */}
        {/* Floor Line */}
        <path d="M 20,420 H 380" style={{ ...outline, animationDelay: '0s' }} />

        {/* Main House Frame (Left wall, beam, roof) */}
        <path
          d="M 60,420 V 180 H 235 M 15,215 L 190,40 L 320,170"
          style={{ ...outline, animationDelay: '0.1s' }}
        />

        {/* === The Gold Accents === */}
        {/* The Window (4 panes) */}
        <g style={{ ...outline, ...accentOutline, strokeWidth: '2', animationDelay: '0.5s' }}>
          <path d="M 160,130 H 200 V 170 H 160 Z" />
          <path d="M 180,130 V 170 M 160,150 H 200" />
        </g>

        {/* The Pendant Light — hanging wire and triangular shade */}
        <path
          d="M 180,180 V 250 L 168,275 H 192 L 180,250"
          style={{ ...outline, animationDelay: '0.6s' }}
        />
        {/* The bulb (Gold accent) */}
        <path
          d="M 180,275 V 280 M 175,285 Q 180,295 185,285"
          style={{ ...outline, ...accentOutline, fill: 'none', animationDelay: '0.7s' }}
        />

        {/* === The Furniture === */}
        {/* Table top arc */}
        <path
          d="M 70,365 Q 180,355 290,365"
          style={{ ...outline, animationDelay: '0.8s' }}
        />
        {/* Table legs */}
        <path
          d="M 100,365 L 85,420 M 180,365 V 420 M 260,365 L 275,420"
          style={{ ...outline, animationDelay: '0.9s' }}
        />

        {/* Chair (Right side) */}
        <path
          d="M 305,355 L 300,400 H 275 M 280,400 V 420 M 300,400 V 420"
          style={{ ...outline, animationDelay: '1.1s' }}
        />

        {/* === The Plant === */}
        {/* Pot */}
        <path
          d="M 335,420 L 330,385 H 360 L 355,420 Z"
          style={{ ...outline, animationDelay: '1.3s' }}
        />
        {/* Plant Stems & Flower spike */}
        <path
          d="M 345,385 Q 340,350 325,340 M 345,385 Q 355,350 365,335 M 345,385 V 320 M 345,310 L 345,325 M 340,315 L 350,315 M 341,311 L 349,319 M 341,319 L 349,311"
          style={{ ...outline, strokeWidth: '1.5', animationDelay: '1.5s' }}
        />
      </svg>

      {/* Text Block */}
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '36px',
            color: colors.gold,
            letterSpacing: '2px',
            marginBottom: '5px',
            animation: 'fadeInSlow 4s ease-in-out infinite',
          }}
        >
          PLASTID
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: colors.primary,
            letterSpacing: '3px',
            fontWeight: 'bold',
            opacity: 0.7,
            animation: 'fadeInSlow 4s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        >
          INTERIOR ARCHITECTURE LANDSCAPE
        </div>
      </div>
    </div>
  );
}

// ── Full-screen overlay wrapper with GSAP fade-out exit ───────────────────────
export default function PIALoader() {
  const wrapRef = useRef(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    document.body.classList.add('loading-active');

    let dismissed = false;

    const dismissLoader = () => {
      if (dismissed) return;
      dismissed = true;

      requestAnimationFrame(() => {
        if (wrapRef.current) {
          gsap.to(wrapRef.current, {
            opacity: 0,
            scale: 1.03,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
              document.body.classList.remove('loading-active');
              window.dispatchEvent(new Event('loadingStateChange'));
              setMounted(false);
            },
          });
        } else {
          document.body.classList.remove('loading-active');
          setMounted(false);
        }
      });
    };

    if (document.readyState === 'complete') {
      dismissLoader();
    } else {
      window.addEventListener('load', dismissLoader, { once: true });
      // Fallback max cap in case an external asset hangs
      const fallbackTimer = setTimeout(dismissLoader, 2000);
      return () => {
        window.removeEventListener('load', dismissLoader);
        clearTimeout(fallbackTimer);
      };
    }

    return () => {
      document.body.classList.remove('loading-active');
      window.dispatchEvent(new Event('loadingStateChange'));
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={wrapRef}
      className="pia-loader-wrapper"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: colors.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PIALoaderContent />
    </div>
  );
}
