import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const PrevalenceAndGaugeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const headerAnim = spring({frame, fps, config: {damping: 180}});
  const gaugeProgress = interpolate(frame, [45, 220], [0.15, 0.62], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arcCircumference = Math.PI * 190;
  const strokeDashoffset = arcCircumference * (1 - gaugeProgress);

  const caption =
    frame < 210
      ? 'About 1 in 10 adults worldwide live with prediabetes—often without noticeable symptoms.'
      : 'Prediabetes means blood sugar is higher than normal, in the HbA1c range of 5.7% to 6.4%.';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#EAF3F8',
        padding: '64px 80px',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          opacity: headerAnim,
          transform: `translateY(${interpolate(headerAnim, [0, 1], [24, 0])}px)`,
        }}
      >
        <div style={{fontSize: 22, fontWeight: 700, color: '#0D7377', letterSpacing: 1}}>
          OVERVIEW &amp; BLOOD SUGAR SPECTRUM
        </div>
        <h2 style={{margin: '8px 0 0', fontSize: 52, color: '#0F2C44'}}>
          What Is Prediabetes?
        </h2>
      </div>

      <div style={{display: 'flex', gap: 48, alignItems: 'stretch', marginBottom: 48}}>
        <div
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: 44,
            boxShadow: '0 14px 36px rgba(15, 44, 68, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{fontSize: 84, fontWeight: 800, color: '#0D7377', lineHeight: 1.05}}>
            1 in 10
          </div>
          <div style={{fontSize: 32, fontWeight: 700, color: '#0F2C44', marginTop: 14}}>
            Adults worldwide affected
          </div>
          <p style={{fontSize: 26, color: '#385873', lineHeight: 1.45, marginTop: 16}}>
            Blood glucose sits above the normal range, yet below the threshold for a diabetes
            diagnosis. Early lifestyle shifts can bring levels back toward normal.
          </p>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: 44,
            boxShadow: '0 14px 36px rgba(15, 44, 68, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width={440} height={240} viewBox="0 0 440 240">
            <path
              d="M 30 210 A 190 190 0 0 1 410 210"
              fill="none"
              stroke="#DCE9F0"
              strokeWidth={28}
              strokeLinecap="round"
            />
            <path
              d="M 30 210 A 190 190 0 0 1 410 210"
              fill="none"
              stroke="#E69A28"
              strokeWidth={28}
              strokeLinecap="round"
              strokeDasharray={arcCircumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div style={{fontSize: 30, fontWeight: 700, color: '#0F2C44', marginTop: -12}}>
            Prediabetes HbA1c: 5.7% – 6.4%
          </div>
          <div style={{fontSize: 23, color: '#4B6982', marginTop: 8}}>
            Normal &lt; 5.7% • Prediabetes 5.7%–6.4% • Diabetes ≥ 6.5%
          </div>
        </div>
      </div>

      <div
        style={{
          alignSelf: 'center',
          backgroundColor: 'rgba(15, 44, 68, 0.90)',
          color: '#FFFFFF',
          padding: '16px 34px',
          borderRadius: 999,
          fontSize: 25,
          textAlign: 'center',
        }}
      >
        {caption}
      </div>
    </AbsoluteFill>
  );
};