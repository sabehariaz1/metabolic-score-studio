import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const ScoreHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardEntrance = spring({
    frame,
    fps,
    config: {damping: 180, stiffness: 120},
  });

  const badgePop = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: {damping: 140, stiffness: 180},
  });

  const pulse = 1 + 0.025 * Math.sin((frame / fps) * Math.PI * 3);

  const subtitleText =
    frame < 120
      ? 'If your score is 5 or higher, you are at high risk of developing prediabetes.'
      : 'An elevated risk score is an early warning—and a signal to take action early.';

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #E6F1F7 0%, #F7FBFE 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          width: 1520,
          backgroundColor: '#FFFFFF',
          borderRadius: 36,
          padding: '64px 72px',
          boxShadow: '0 24px 60px rgba(15, 44, 68, 0.10)',
          border: '2px solid #D5E6F0',
          transform: `translateY(${interpolate(cardEntrance, [0, 1], [36, 0])}px) scale(${interpolate(cardEntrance, [0, 1], [0.97, 1])})`,
          opacity: cardEntrance,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 48,
        }}
      >
        <div style={{maxWidth: 920}}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#FDECEC',
              color: '#B83227',
              fontWeight: 700,
              fontSize: 24,
              padding: '10px 22px',
              borderRadius: 999,
              marginBottom: 24,
              letterSpacing: 0.4,
            }}
          >
            RISK SCORE CHECK
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 62,
              lineHeight: 1.18,
              color: '#0F2C44',
              fontWeight: 700,
            }}
          >
            If your score is{' '}
            <span style={{color: '#D9483B', textDecoration: 'underline'}}>5 or higher</span>, you are
            at high risk of developing prediabetes.
          </h1>

          <p
            style={{
              marginTop: 24,
              marginBottom: 0,
              fontSize: 30,
              lineHeight: 1.45,
              color: '#385873',
            }}
          >
            Catching elevated risk early gives you a clear window to protect your metabolic health.
          </p>
        </div>

        <div
          style={{
            minWidth: 360,
            padding: '44px 36px',
            borderRadius: 28,
            backgroundColor: '#FFF7F5',
            border: '3px solid #E56B5C',
            textAlign: 'center',
            transform: `scale(${badgePop * pulse})`,
            opacity: badgePop,
          }}
        >
          <div style={{fontSize: 22, fontWeight: 700, color: '#B83227', marginBottom: 8}}>
            HIGH RISK THRESHOLD
          </div>
          <div style={{fontSize: 108, fontWeight: 800, color: '#D9483B', lineHeight: 1}}>
            5+
          </div>
          <div style={{fontSize: 24, color: '#27445C', marginTop: 14, fontWeight: 600}}>
            Score ≥ 5 Points
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 42,
          backgroundColor: 'rgba(15, 44, 68, 0.90)',
          color: '#FFFFFF',
          padding: '16px 34px',
          borderRadius: 999,
          fontSize: 26,
          maxWidth: 1580,
          textAlign: 'center',
        }}
      >
        {subtitleText}
      </div>
    </AbsoluteFill>
  );
};