import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
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

// ─── Scene 1: Logo intro (0–7s) ─────────────────────────────────────────────

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame: frame - 10, fps, config: { damping: 10, stiffness: 60 } });
  const logoOp = fadeIn(frame, 10, 20);
  const lineOp = fadeIn(frame, 35, 20);
  const lineW = interpolate(frame, [35, 70], [0, 300], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* Sfondo decorativo */}
      <div
        style={{
          position: 'absolute',
          bottom: -200,
          left: -200,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${BRAND.accent}22 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          opacity: logoOp,
          transform: `scale(${interpolate(logoScale, [0, 1], [0.5, 1])})`,
          textAlign: 'center',
        }}
      >
        {/* Logo testuale FIM */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: BRAND.white,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          FIM
        </div>
        <div
          style={{
            opacity: lineOp,
            width: lineW,
            height: 4,
            backgroundColor: BRAND.accent,
            borderRadius: 2,
            margin: '16px auto',
          }}
        />
        <div
          style={{
            opacity: lineOp,
            color: BRAND.accent,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          Insurance Broker
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Chi siamo (7–15s) ─────────────────────────────────────────────

const ChiSiamoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s1 = slideUp(frame, fps, 5);
  const s2 = slideUp(frame, fps, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.white,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 80,
        gap: 32,
      }}
    >
      <div
        style={{
          opacity: interpolate(s1, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(s1, [0, 1], [40, 0])}px)`,
          color: BRAND.accent,
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: 'uppercase',
        }}
      >
        Dal 2010 · Cisterna di Latina
      </div>

      <div
        style={{
          opacity: interpolate(s1, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(s1, [0, 1], [40, 0])}px)`,
          color: BRAND.primary,
          fontSize: 62,
          fontWeight: 800,
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        Broker assicurativo{' '}
        <span style={{ color: BRAND.accent }}>indipendente</span>
      </div>

      <div
        style={{
          opacity: interpolate(s2, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(s2, [0, 1], [30, 0])}px)`,
          color: `${BRAND.primary}99`,
          fontSize: 34,
          textAlign: 'center',
          lineHeight: 1.5,
          maxWidth: 800,
        }}
      >
        Non rappresentiamo compagnie.
        <br />
        <strong style={{ color: BRAND.primary }}>Rappresentiamo solo te.</strong>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: I nostri valori (15–23s) ──────────────────────────────────────

const values = [
  {
    icon: '⚖️',
    title: 'Indipendenza',
    desc: '30+ compagnie partner, scegliamo la migliore per te',
  },
  {
    icon: '🤝',
    title: 'Relazione',
    desc: 'Un consulente dedicato, sempre disponibile',
  },
  {
    icon: '🛡️',
    title: 'Tutela',
    desc: 'Ti assistiamo dalla polizza al sinistro',
  },
];

const ValoriScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${BRAND.primary} 0%, ${BRAND.primaryLight} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 72,
        gap: 28,
      }}
    >
      <div
        style={{
          color: BRAND.white,
          fontSize: 44,
          fontWeight: 800,
          marginBottom: 12,
          opacity: fadeIn(frame, 5, 20),
        }}
      >
        I nostri valori
      </div>

      {values.map((v, i) => {
        const s = spring({ frame: frame - (i * 14 + 15), fps, config: { damping: 14, stiffness: 80 } });
        return (
          <div
            key={i}
            style={{
              opacity: interpolate(s, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(s, [0, 1], [-60, 0])}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              backgroundColor: `${BRAND.white}18`,
              borderRadius: 20,
              padding: '24px 36px',
              width: '100%',
            }}
          >
            <span style={{ fontSize: 50 }}>{v.icon}</span>
            <div>
              <div style={{ color: BRAND.accent, fontSize: 34, fontWeight: 700 }}>{v.title}</div>
              <div style={{ color: `${BRAND.white}cc`, fontSize: 26 }}>{v.desc}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── Scene 4: Contatti (23–30s) ─────────────────────────────────────────────

const ContattiScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const scale = interpolate(s, [0, 1], [0.85, 1]);
  const op = interpolate(s, [0, 1], [0, 1]);

  const pulse = interpolate(
    Math.sin((frame / 6) * Math.PI),
    [-1, 1],
    [0.97, 1.03]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.accent,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 80,
        gap: 24,
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
            fontSize: 96,
            fontWeight: 900,
            color: BRAND.primary,
            letterSpacing: -3,
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          FIM
        </div>
        <div
          style={{
            color: BRAND.primaryDark,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginBottom: 48,
          }}
        >
          Insurance Broker
        </div>

        <div
          style={{
            backgroundColor: BRAND.primary,
            borderRadius: 20,
            padding: '28px 56px',
            marginBottom: 28,
            transform: `scale(${pulse})`,
          }}
        >
          <div style={{ color: BRAND.white, fontSize: 38, fontWeight: 700 }}>
            Consulenza gratuita
          </div>
          <div style={{ color: BRAND.accent, fontSize: 34, fontWeight: 700, marginTop: 8 }}>
            fimbroker.it
          </div>
        </div>

        <div style={{ color: BRAND.primaryDark, fontSize: 28, fontWeight: 500 }}>
          📍 Cisterna di Latina · 📞 06 96883381
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Composizione principale ─────────────────────────────────────────────────

export const ChiSiamo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={fps * 7}>
        <IntroScene />
      </Sequence>
      <Sequence from={fps * 7} durationInFrames={fps * 8}>
        <ChiSiamoScene />
      </Sequence>
      <Sequence from={fps * 15} durationInFrames={fps * 8}>
        <ValoriScene />
      </Sequence>
      <Sequence from={fps * 23} durationInFrames={fps * 7}>
        <ContattiScene />
      </Sequence>
    </AbsoluteFill>
  );
};
