'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// ── Brand colors ──────────────────────────────────────────────────────────────
const colors = {
  forest: '#000000',
  brass: '#C49B5D',
  alabaster: '#F5F3ED',
}

// ── Keyframe animation injected for loader ────────────────────────────────────
const KEYFRAMES = `
  @keyframes piaLogoPulse {
    0% {
      transform: scale(0.96);
      opacity: 0.85;
      filter: drop-shadow(0 0 10px rgba(196, 155, 93, 0.3));
    }
    50% {
      transform: scale(1.03);
      opacity: 1;
      filter: drop-shadow(0 0 25px rgba(196, 155, 93, 0.7));
    }
    100% {
      transform: scale(0.96);
      opacity: 0.85;
      filter: drop-shadow(0 0 10px rgba(196, 155, 93, 0.3));
    }
  }

  @keyframes piaShimmerBar {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`

function PIALoaderContent() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: colors.forest,
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <style>{KEYFRAMES}</style>

      {/* Brand Logo with Pulsing Glow */}
      <div
        style={{
          marginBottom: '28px',
          animation: 'piaLogoPulse 2.5s ease-in-out infinite',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/images/resources/logo.png"
          alt="Plastid Interior Logo"
          style={{
            maxWidth: '220px',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Shimmer Line Accent */}
      <div
        style={{
          width: '140px',
          height: '2px',
          background: 'rgba(196, 155, 93, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, #C49B5D, transparent)',
            animation: 'piaShimmerBar 2s ease-in-out infinite',
          }}
        />
      </div>

      {/* Brand Tagline */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: '600',
          color: colors.brass,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          opacity: 0.9,
          textAlign: 'center',
        }}
      >
        Plastid Interior & Architecture
      </div>
    </div>
  )
}

// ── Full-screen overlay wrapper with GSAP fade-out exit ───────────────────────
export default function PIALoader() {
  // Non-blocking: avoid opaque full-viewport overlays that delay LCP and
  // prevent search engine crawlers from seeing above-the-fold content.
  return null
}
