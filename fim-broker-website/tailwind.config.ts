import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B1F3A',
          light: '#132d52',
          dark: '#060f1d',
          50: '#e8edf4',
          100: '#c5d0e0',
          700: '#132d52',
          800: '#0B1F3A',
          900: '#060f1d',
        },
        accent: {
          // Verde del marchio FIM. Resta questo ovunque faccia da colore:
          // bordi, icone, sfondi decorativi, testo grande. È lo stesso della
          // brochure in tipografia e non va cambiato per ragioni tecniche.
          DEFAULT: '#2FA36B',
          dark: '#258755',
          light: '#4aba83',
          gradient: '#38c77e',
          // Varianti per le SUPERFICI CLICCABILI con testo bianco piccolo.
          // Bianco su #2FA36B dà 3,20 e non passa il WCAG AA, che chiede 4,5
          // sotto i 18,66px in grassetto (audit 13/08/2026). Queste due sì:
          // 5,30 a riposo e 7,95 sull'hover. Stessa tinta, solo più scure.
          cta: '#237A4E',
          'cta-hover': '#1B5C3B',
        },
        gold: {
          DEFAULT: '#C8A96A',
          dark: '#b0914e',
          light: '#d9c08a',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'Times New Roman', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
