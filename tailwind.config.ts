import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      colors: {
        teal: {
          50: '#e6f9f5',
          100: '#b3e8dc',
          200: '#8ddcc9',
          300: '#66d0b6',
          400: '#4dc9ab',
          500: '#14B8A6',
          600: '#00d4aa',
          700: '#0d9488',
          800: '#0f766e',
          900: '#1a3a2e',
          950: '#134e4a',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
