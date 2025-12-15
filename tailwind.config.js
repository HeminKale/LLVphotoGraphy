/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fefdfb',
          100: '#fef9f3',
          200: '#fdf3e7',
          300: '#fae8d3',
          400: '#f7d9b8',
          500: '#f3c89d',
          600: '#e9b07a',
          700: '#d89456',
          800: '#b97540',
          900: '#935d33',
        },
        rose: {
          50: '#fef5f5',
          100: '#fde8e8',
          200: '#fbd5d5',
          300: '#f7b5b5',
          400: '#f28b8b',
          500: '#e96161',
          600: '#d94343',
          700: '#b73333',
          800: '#972f2f',
          900: '#7d2c2c',
        },
        sand: {
          50: '#fafaf9',
          100: '#f5f4f1',
          200: '#e8e6e1',
          300: '#d7d3cb',
          400: '#bfb9ad',
          500: '#a69d8e',
          600: '#8a8070',
          700: '#6f675a',
          800: '#5c564b',
          900: '#4d4840',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        elegant: ['Cormorant Garamond', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
