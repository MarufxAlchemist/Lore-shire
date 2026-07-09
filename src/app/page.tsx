'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import lorshireLogo from '../../public/loreshire-logo.png';

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
    const flies: Firefly[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 37.3 + 11) % 100}%`,
      top: `${(i * 53.7 + 7) % 100}%`,
      duration: `${2.5 + (i % 5) * 0.8}s`,
      delay: `${(i % 7) * 0.5}s`,
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

        @keyframes bgShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.6); }
          50%       { opacity: 1;   transform: scale(1.4); }
        }

        @keyframes floatY {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-12px); }
        }

        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 18px rgba(201,162,39,0.35)) drop-shadow(0 0 40px rgba(50,120,50,0.2)); }
          50%       { filter: drop-shadow(0 0 36px rgba(201,162,39,0.75)) drop-shadow(0 0 70px rgba(50,150,60,0.35)); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        @keyframes shimmerBtn {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        @keyframes particleDrift {
          0%   { transform: translate(0, 0) scale(1);    opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
        }

        .ls-root {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg,
            #060f06 0%,
            #091a0c 20%,
            #07151a 40%,
            #0c1a08 60%,
            #06100a 80%,
            #091508 100%
          );
          background-size: 400% 400%;
          animation: bgShift 12s ease infinite;
          font-family: 'Crimson Text', serif;
          gap: 0;
        }

        /* ── Atmospheric layers ── */
        .ls-fog {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 20% 80%, rgba(30,80,30,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(20,60,80,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 100% 60% at 50% 100%, rgba(10,40,10,0.35) 0%, transparent 55%);
          pointer-events: none;
        }

        .ls-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.78) 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* ── Fireflies ── */
        .ls-firefly {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #f0e060 0%, #a0d040 40%, transparent 70%);
          animation: twinkle var(--dur) ease-in-out infinite var(--del);
          z-index: 2;
          pointer-events: none;
        }

        /* ── Logo ── */
        .ls-logo-wrap {
          position: relative;
          z-index: 3;
          animation: fadeInUp 0.9s ease forwards, floatY 6s ease-in-out 1s infinite;
          opacity: 0;
        }

        .ls-logo {
          max-height: 32vh;
          max-width: min(260px, 42vw);
          width: auto;
          height: auto;
          display: block;
          animation: logoGlow 4s ease-in-out infinite;
        }

        /* ── Card ── */
        .ls-card {
          position: relative;
          z-index: 3;
          margin-top: clamp(14px, 2.5vh, 28px);
          padding: clamp(16px, 2.5vh, 28px) clamp(24px, 5vw, 56px) clamp(20px, 3vh, 36px);
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(16px) saturate(1.4);
          -webkit-backdrop-filter: blur(16px) saturate(1.4);
          border: 1px solid rgba(201,162,39,0.18);
          border-radius: 16px;
          text-align: center;
          animation: fadeInUp 0.9s ease 0.35s forwards;
          opacity: 0;
          box-shadow:
            0 0 60px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.06);
          min-width: clamp(280px, 40vw, 480px);
        }

        .ls-ornament {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: clamp(10px, 1.5vh, 18px);
          opacity: 0.55;
        }
        .ls-ornament-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,162,39,0.7), transparent);
        }
        .ls-ornament-gem {
          width: 7px; height: 7px;
          background: rgba(201,162,39,0.8);
          transform: rotate(45deg);
          box-shadow: 0 0 6px rgba(201,162,39,0.6);
        }

        .ls-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.2rem, 2.8vw, 1.85rem);
          font-weight: 700;
          color: #f0d882;
          text-shadow: 0 0 30px rgba(201,162,39,0.45), 0 2px 4px rgba(0,0,0,0.6);
          margin-bottom: clamp(6px, 1vh, 12px);
          letter-spacing: 0.04em;
          line-height: 1.2;
        }

        .ls-subtitle {
          font-family: 'Crimson Text', serif;
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          font-style: italic;
          color: rgba(220,200,160,0.72);
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
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .ls-btn:hover::after {
          opacity: 1;
          animation: shimmerBtn 0.6s ease forwards;
        }

        .ls-btn-login {
          background: linear-gradient(135deg, #162b18, #1f4024);
          border: 1px solid rgba(201,162,39,0.45);
          color: #f0d882;
          box-shadow: 0 2px 12px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .ls-btn-login:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 24px rgba(0,0,0,0.5), 0 0 18px rgba(201,162,39,0.28);
          border-color: rgba(201,162,39,0.8);
          filter: brightness(1.15);
        }

        .ls-btn-signup {
          background: linear-gradient(135deg, #c9a227, #e8be3a, #c9a227);
          background-size: 200% 100%;
          border: none;
          color: #0d1b0f;
          font-weight: 700;
          box-shadow: 0 2px 16px rgba(201,162,39,0.35), 0 2px 8px rgba(0,0,0,0.4);
        }
        .ls-btn-signup:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(201,162,39,0.5), 0 4px 12px rgba(0,0,0,0.4);
          filter: brightness(1.1) saturate(1.2);
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
          color: rgba(201,162,39,0.3);
          z-index: 3;
          text-transform: uppercase;
          animation: fadeInUp 1s ease 0.7s forwards;
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
            <a href="/signin" className="ls-btn ls-btn-login">Login</a>
            <a href="/signup" className="ls-btn ls-btn-signup">Sign Up</a>
          </div>
        </div>

        {/* Footer */}
        <div className="ls-footer">Where every story finds a new home</div>
      </div>
    </>
  );
}
