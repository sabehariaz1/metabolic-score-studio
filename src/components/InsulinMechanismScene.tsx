import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const InsulinMechanismScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const leftCard = spring({frame, fps, config: {damping: 170}});
  const rightCard = spring({frame: Math.max(0, frame - 18), fps, config: {damping: 170}});

  const glucoseFlow = interpolate(frame, [20, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const caption =
    frame < 240
      ? 'Normally, insulin helps unlock cells so glucose moves from the bloodstream into tissue.'
      : 'With insulin resistance, cells respond less efficiently, allowing glucose to build up.';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F3F8FB',
        padding: '64px 80px',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{fontSize: 22, fontWeight: 700, color: '#0D7377', letterSpacing: 1}}>
          CELLULAR MECHANISM
        </div>
        <h2 style={{margin: '8px 0 0', fontSize: 52, color: '#0F2C44'}}>
          How Insulin Resistance Develops
        </h2>
      </div>

      <div style={{display: 'flex', gap: 48, marginBottom: 48}}>
        <div
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: 40,
            borderTop: '8px solid #0D7377',
            opacity: leftCard,
            transform: `translateY(${interpolate(leftCard, [0, 1], [28, 0])}px)`,
          }}
        >
          <div style={{fontSize: 32, fontWeight: 700, color: '#0D7377', marginBottom: 16}}>
            Healthy Insulin Response
          </div>
          <p style={{fontSize: 26, color: '#27445C', lineHeight: 1.5, margin: 0}}>
            Pancreatic insulin signals muscle, fat, and liver cells to absorb glucose efficiently,
            keeping blood sugar steady.
          </p>
          <div
            style={{
              marginTop: 28,
              padding: '16px 22px',
              borderRadius: 16,
              backgroundColor: '#E6F5F4',
              color: '#09595C',
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Glucose uptake active ({Math.round(glucoseFlow * 100)}% cycle sync)
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: 40,
            borderTop: '8px solid #D9483B',
            opacity: rightCard,
            transform: `translateY(${interpolate(rightCard, [0, 1], [28, 0])}px)`,
          }}
        >
          <div style={{fontSize: 32, fontWeight: 700, color: '#D9483B', marginBottom: 16}}>
            Insulin Resistance
          </div>
          <p style={{fontSize: 26, color: '#27445C', lineHeight: 1.5, margin: 0}}>
            Target cells resist insulin&apos;s signal, so the body produces more insulin while
            circulating glucose trends upward.
          </p>
          <div
            style={{
              marginTop: 28,
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                padding: '12px 18px',
                borderRadius: 14,
                backgroundColor: '#FDECEC',
                color: '#B83227',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Higher Insulin Demand
            </span>
            <span
              style={{
                padding: '12px 18px',
                borderRadius: 14,
                backgroundColor: '#FFF5E4',
                color: '#9A6209',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Elevated Blood Sugar
            </span>
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
