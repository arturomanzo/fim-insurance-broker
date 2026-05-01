import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from 'remotion';
import { BRAND } from '../lib/brand';

// ─── Helpers ────────────────────────────────────────────────────────────────

const fadeIn = (frame: number, start: number, duration = 15) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const slideUp = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 80 } });

// ─── Scene 1: Hook (0–9s) ───────────────────────────────────────────────────

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = fadeIn(frame, 0, 20);
  const line1Y = interpolate(slideUp(frame, fps, 10), [0, 1], [60, 0]);
  const line1Op = fadeIn(frame, 10, 20);
  const line2Y = interpolate(slideUp(frame, fps, 25), [0, 1], [60, 0]);
  const line2Op = fadeIn(frame, 25, 20);
  const accentScale = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 100 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 60%, ${BRAND.primaryLight} 100%)`,
        opacity: bgOpacity,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 80,
      }}
    >
      {/* Cerchio decorativo accent */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${BRAND.accent}33 0%, transparent 70%)`,
          transform: `scale(${accentScale})`,
        }}
      />

      <div
        style={{
          opacity: line1Op,
          transform: `translateY(${line1Y}px)`,
          color: BRAND.accent,
          fontSize: 36,
          fontFamily: BRAND.fonts,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: 'uppercase',
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        RC AUTO
      </div>

      <div
        style={{
          opacity: line1Op,
          transform: `translateY(${line1Y}px)`,
          color: BRAND.white,
          fontSize: 72,
          fontWeight: 800,
          lineHeight: 1.1,
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        Stai pagando
        <br />
        <span style={{ color: BRAND.accent }}>troppo?</span>
      </div>

      <div
        style={{
          opacity: line2Op,
          transform: `translateY(${line2Y}px)`,
          color: `${BRAND.white}cc`,
          fontSize: 34,
          fontWeight: 400,
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        Il mercato assicurativo
        <br />
        cambia ogni anno.
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Soluzione (9–18s) ─────────────────────────────────────────────

const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = fadeIn(frame, 5, 20);
  const titleY = interpolate(slideUp(frame, fps, 5), [0, 1], [50, 0]);

  const counterValue = Math.round(
    interpolate(frame, [20, 80], [0, 30], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    })
  );

  const subtitleOp = fadeIn(frame, 90, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.white,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 80,
      }}
    >
      <div
        style={{
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          color: BRAND.primary,
          fontSize: 42,
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: 40,
          lineHeight: 1.3,
        }}
      >
        FIM confronta per te
      </div>

      {/* Counter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 160,
            fontWeight: 900,
            color: BRAND.accent,
            lineHeight: 1,
          }}
        >
          {counterValue}
        </span>
        <span
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: BRAND.accent,
            lineHeight: 1,
            paddingBottom: 16,
          }}
        >
          +
        </span>
      </div>

      <div
        style={{
          color: BRAND.primary,
          fontSize: 40,
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        compagnie assicurative
      </div>

      <div
        style={{
          opacity: subtitleOp,
          color: `${BRAND.primary}99`,
          fontSize: 30,
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        Generali · AXA · Allianz · Zurich · UnipolSai
        <br />
        e molte altre ancora
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: Vantaggi (18–26s) ─────────────────────────────────────────────

const benefits = [
  { icon: '🛡️', text: 'Broker indipendente', sub: 'Lavoriamo solo per te' },
  { icon: '💶', text: 'Nessun costo aggiuntivo', sub: 'Il servizio è gratuito' },
  { icon: '⚡', text: 'Preventivo in 5 minuti', sub: 'Online o al telefono' },
];

const BenefitsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${BRAND.primary} 0%, ${BRAND.primaryLight} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 80,
        gap: 32,
      }}
    >
      {benefits.map((b, i) => {
        const delay = i * 12;
        const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 80 } });
        const y = interpolate(s, [0, 1], [40, 0]);
        const op = interpolate(s, [0, 1], [0, 1]);

        return (
          <div
            key={i}
            style={{
              opacity: op,
              transform: `translateY(${y}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              backgroundColor: `${BRAND.white}15`,
              borderRadius: 24,
              padding: '28px 40px',
              width: '100%',
              borderLeft: `6px solid ${BRAND.accent}`,
            }}
          >
            <span style={{ fontSize: 52 }}>{b.icon}</span>
            <div>
              <div style={{ color: BRAND.white, fontSize: 38, fontWeight: 700 }}>{b.text}</div>
              <div style={{ color: `${BRAND.white}99`, fontSize: 26 }}>{b.sub}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── Scene 4: CTA (26–30s) ──────────────────────────────────────────────────

const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const scale = interpolate(s, [0, 1], [0.8, 1]);
  const op = interpolate(s, [0, 1], [0, 1]);

  const pulse = interpolate(
    Math.sin((frame / 6) * Math.PI),
    [-1, 1],
    [0.95, 1.05]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.accent,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 80,
        gap: 32,
      }}
    >
      <div
        style={{
          opacity: op,
          transform: `scale(${scale})`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: BRAND.primary,
            fontSize: 44,
            fontWeight: 900,
            letterSpacing: -1,
            marginBottom: 12,
          }}
        >
          FIM Insurance Broker
        </div>
        <div
          style={{
            color: BRAND.primaryDark,
            fontSize: 28,
            fontWeight: 500,
            marginBottom: 48,
          }}
        >
          Broker indipendente · RUI B000405449
        </div>

        <div
          style={{
            backgroundColor: BRAND.primary,
            borderRadius: 20,
            padding: '32px 60px',
            transform: `scale(${pulse})`,
          }}
        >
          <div style={{ color: BRAND.white, fontSize: 44, fontWeight: 800 }}>
            Preventivo GRATUITO
          </div>
          <div style={{ color: BRAND.accent, fontSize: 34, fontWeight: 600, marginTop: 8 }}>
            fimbroker.it
          </div>
        </div>

        <div
          style={{
            color: BRAND.primaryDark,
            fontSize: 28,
            marginTop: 32,
            fontWeight: 500,
          }}
        >
          📞 06 96883381
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Composizione principale ─────────────────────────────────────────────────

export const RCAutoSpot: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={fps * 9}>
        <HookScene />
      </Sequence>
      <Sequence from={fps * 9} durationInFrames={fps * 9}>
        <SolutionScene />
      </Sequence>
      <Sequence from={fps * 18} durationInFrames={fps * 8}>
        <BenefitsScene />
      </Sequence>
      <Sequence from={fps * 26} durationInFrames={fps * 4}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
