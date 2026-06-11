/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F2338',
          700: '#16314F',
          600: '#1E3F63',
        },
        gold: {
          DEFAULT: '#FBA728',
          soft: '#FDF3E2',
          text: '#854F0B',
        },
        ink: '#152340',
        paper: '#FFFFFF',
        surface: {
          DEFAULT: '#F6F8FC',
          2: '#F1F5FB',
        },
        line: {
          DEFAULT: '#E6E9F0',
          soft: '#EEF1F6',
        },
        text: {
          DEFAULT: '#152340',
          muted: '#5A6B85',
          faint: '#94A3B8',
        },
        mint: {
          bg: '#E1F5EE',
          dot: '#1D9E75',
          text: '#0F6E56',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '14px',
        sm: '9px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 8px 24px rgba(15,35,56,0.08)',
      },
    },
  },
  plugins: [],
}
