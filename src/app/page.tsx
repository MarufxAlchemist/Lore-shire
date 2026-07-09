'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import lorshireLogo from '../../public/loreshire-logo.png';
import cozyForestBg from '../../public/cozy_forest_bg.png';

interface Firefly {
  id: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
  size: string;
}

export default function LandingPage() {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Reduced number of fireflies to make it less busy
    const flies: Firefly[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 37.3 + 11) % 100}%`,
      top: `${(i * 53.7 + 7) % 100}%`,
      duration: `${4 + (i % 5) * 1.5}s`, // Slower animation
      delay: `${(i % 7) * 0.8}s`,
      size: `${3 + (i % 3)}px`,
    }));
    setFireflies(flies);
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow: hidden; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.05; transform: scale(0.8); }
          50%       { opacity: 0.5;   transform: scale(1.1); }
        }

        @keyframes floatY {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-8px); }
        }

        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(201,162,39,0.15)) drop-shadow(0 0 20px rgba(50,120,50,0.1)); }
          50%       { filter: drop-shadow(0 0 25px rgba(201,162,39,0.4)) drop-shadow(0 0 45px rgba(50,150,60,0.2)); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        @keyframes shimmerBtn {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .ls-root {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          font-family: 'Crimson Text', serif;
          gap: 0;
          transition: background-image 0.4s ease, background-color 0.4s ease;
        }

        html[data-joy-color-scheme="dark"] .ls-root,
        html:not([data-joy-color-scheme]) .ls-root {
          background-color: #060a07;
          background-image: url('/cozy_forest_bg.png');
        }

        html[data-joy-color-scheme="light"] .ls-root {
          background-color: #e8dfc8;
          background-image: url('/light_forest_bg.png');
        }

        /* ── Atmospheric layers ── */
        .ls-fog {
          position: absolute;
          inset: 0;
          /* Softer, more subtle fog */
          background:
            radial-gradient(ellipse 80% 50% at 20% 80%, rgba(30,60,30,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(20,50,70,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .ls-vignette {
          position: absolute;
          inset: 0;
          /* Softer vignette to draw focus gently without harsh edges */
          background: radial-gradient(ellipse at center, transparent 20%, rgba(4,8,5,0.75) 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* ── Fireflies ── */
        .ls-firefly {
          position: absolute;
          border-radius: 50%;
          /* Warmer, softer color */
          background: radial-gradient(circle, #fceb9c 0%, #c4db79 30%, transparent 70%);
          animation: twinkle var(--dur) ease-in-out infinite var(--del);
          z-index: 2;
          pointer-events: none;
        }

        /* ── Logo ── */
        .ls-logo-wrap {
          position: relative;
          z-index: 3;
          /* Slower floating animation */
          animation: fadeInUp 1.2s ease forwards, floatY 8s ease-in-out 1s infinite;
          opacity: 0;
        }

        .ls-logo {
          max-height: 28vh;
          max-width: min(240px, 40vw);
          width: auto;
          height: auto;
          display: block;
          /* Slower, softer glow */
          animation: logoGlow 6s ease-in-out infinite;
        }

        /* ── Card ── */
        .ls-card {
          position: relative;
          z-index: 3;
          margin-top: clamp(14px, 2.5vh, 28px);
          padding: clamp(16px, 2.5vh, 28px) clamp(24px, 5vw, 56px) clamp(20px, 3vh, 36px);
          background: rgba(20, 24, 20, 0.4);
          /* Reduced saturation to be easier on the eyes */
          backdrop-filter: blur(12px) saturate(1.05);
          -webkit-backdrop-filter: blur(12px) saturate(1.05);
          border: 1px solid rgba(201,162,39,0.12);
          border-radius: 16px;
          text-align: center;
          animation: fadeInUp 1.2s ease 0.4s forwards;
          opacity: 0;
          box-shadow:
            0 0 40px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.04);
          min-width: clamp(280px, 40vw, 480px);
        }

        .ls-ornament {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: clamp(10px, 1.5vh, 18px);
          opacity: 0.4;
        }
        .ls-ornament-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,162,39,0.5), transparent);
        }
        .ls-ornament-gem {
          width: 6px; height: 6px;
          background: rgba(201,162,39,0.6);
          transform: rotate(45deg);
          box-shadow: 0 0 4px rgba(201,162,39,0.4);
        }

        .ls-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.2rem, 2.8vw, 1.85rem);
          font-weight: 700;
          color: #ebd588;
          text-shadow: 0 0 20px rgba(201,162,39,0.25), 0 2px 4px rgba(0,0,0,0.6);
          margin-bottom: clamp(6px, 1vh, 12px);
          letter-spacing: 0.04em;
          line-height: 1.2;
        }

        .ls-subtitle {
          font-family: 'Crimson Text', serif;
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          font-style: italic;
          color: rgba(220,210,180,0.75);
          margin-bottom: clamp(16px, 2.5vh, 28px);
          letter-spacing: 0.02em;
        }

        /* ── Buttons ── */
        .ls-btns {
          display: flex;
          gap: clamp(10px, 2vw, 20px);
          justify-content: center;
        }

        .ls-btn {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.72rem, 1.2vw, 0.85rem);
          letter-spacing: 0.12em;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: clamp(110px, 14vw, 160px);
          padding: clamp(10px, 1.4vh, 14px) clamp(20px, 3vw, 32px);
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .ls-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .ls-btn:hover::after {
          opacity: 1;
          animation: shimmerBtn 0.8s ease forwards;
        }

        .ls-btn-login {
          background: linear-gradient(135deg, #122114, #1a301d);
          border: 1px solid rgba(201,162,39,0.3);
          color: #ebd588;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .ls-btn-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.45), 0 0 12px rgba(201,162,39,0.2);
          border-color: rgba(201,162,39,0.6);
          filter: brightness(1.1);
        }

        .ls-btn-signup {
          background: linear-gradient(135deg, #b89220, #d4ab2a, #b89220);
          background-size: 200% 100%;
          border: none;
          color: #08120a;
          font-weight: 700;
          box-shadow: 0 2px 12px rgba(180,140,30,0.25), 0 2px 6px rgba(0,0,0,0.3);
        }
        .ls-btn-signup:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(180,140,30,0.4), 0 4px 10px rgba(0,0,0,0.3);
          filter: brightness(1.05) saturate(1.1);
        }

        /* ── Footer tagline ── */
        .ls-footer {
          position: absolute;
          bottom: clamp(12px, 2vh, 24px);
          left: 0; right: 0;
          text-align: center;
          font-family: 'Cinzel', serif;
          font-size: clamp(0.6rem, 1vw, 0.72rem);
          letter-spacing: 0.25em;
          color: rgba(220,200,160,0.25);
          z-index: 3;
          text-transform: uppercase;
          animation: fadeInUp 1.2s ease 0.8s forwards;
          opacity: 0;
        }
      `}</style>

      <div className="ls-root">
        {/* Atmospheric fog */}
        <div className="ls-fog" />

        {/* Vignette */}
        <div className="ls-vignette" />

        {/* Fireflies */}
        {mounted && fireflies.map((f) => (
          <div
            key={f.id}
            className="ls-firefly"
            style={{
              left: f.left,
              top: f.top,
              width: f.size,
              height: f.size,
              '--dur': f.duration,
              '--del': f.delay,
            } as React.CSSProperties}
          />
        ))}

        {/* Logo */}
        <div className="ls-logo-wrap">
          <img
            src={lorshireLogo.src}
            alt="Loreshire Logo"
            className="ls-logo"
          />
        </div>

        {/* Content card */}
        <div className="ls-card">
          <div className="ls-ornament">
            <div className="ls-ornament-line" />
            <div className="ls-ornament-gem" />
            <div className="ls-ornament-line" />
          </div>

          <h1 className="ls-title">Let&apos;s circulate books!</h1>
          <p className="ls-subtitle">A Peer-to-Peer Book Exchange Platform for anyone and everyone.</p>

          <div className="ls-btns">
            <Link href="/signin" className="ls-btn ls-btn-login">Login</Link>
            <Link href="/signup" className="ls-btn ls-btn-signup">Sign Up</Link>
          </div>
        </div>

        {/* Footer */}
        <div className="ls-footer">Where every story finds a new home</div>
      </div>
    </>
  );
}
