import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { BRAND, FONTS } from '../lib/brand';
import { FimLogo } from '../components/FimLogo';

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
  const logoOp = fadeIn(frame, 10, 25);
  const taglineOp = fadeIn(frame, 45, 20);
  const taglineY = interpolate(slideUp(frame, fps, 45), [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: -200,
          left: -200,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${BRAND.accent}18 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          opacity: logoOp,
          transform: `scale(${interpolate(logoScale, [0, 1], [0.6, 1])})`,
          textAlign: 'center',
        }}
      >
        <FimLogo width={480} variant="light" />
      </div>

      <div
        style={{
          opacity: taglineOp,
          transform: `translateY(${taglineY}px)`,
          color: `${BRAND.white}bb`,
          fontSize: 28,
          fontFamily: FONTS.heading,
          letterSpacing: 3,
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        La tua sicurezza. Le nostre soluzioni.
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
          fontSize: 28,
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
  { icon: '⚖️', title: 'Indipendenza', desc: '30+ compagnie partner, scegliamo la migliore per te' },
  { icon: '🤝', title: 'Relazione', desc: 'Un consulente dedicato, sempre disponibile' },
  { icon: '🛡️', title: 'Tutela', desc: 'Ti assistiamo dalla polizza al sinistro' },
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
              borderLeft: `6px solid ${BRAND.accent}`,
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
  const pulse = interpolate(Math.sin((frame / 6) * Math.PI), [-1, 1], [0.97, 1.03]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.white,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 80,
        gap: 24,
      }}
    >
      <div style={{ opacity: op, transform: `scale(${scale})`, textAlign: 'center' }}>
        <div style={{ marginBottom: 40 }}>
          <FimLogo width={420} variant="dark" />
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

        <div style={{ color: BRAND.primary, fontSize: 28, fontWeight: 500 }}>
          📍 Cisterna di Latina · 📞 06 96883381
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Composizione principale ─────────────────────────────────────────────────

export const ChiSiamo: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();

  const musicVolume = (frame: number) =>
    interpolate(
      frame,
      [0, 20, durationInFrames - 40, durationInFrames],
      [0, 0.3, 0.3, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

  return (
    <AbsoluteFill>
      {/* Musica di sottofondo — metti music.mp3 in ~/my-video/public/ */}
      <Audio
        src={staticFile('music.mp3')}
        volume={(f) => musicVolume(f)}
        startFrom={0}
      />

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
