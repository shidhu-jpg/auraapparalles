import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf8ee',
          100: '#faefd2',
          200: '#f4dba0',
          300: '#eec166',
          400: '#e8a535',
          500: '#d4891a',
          600: '#b86c12',
          700: '#924f11',
          800: '#783f14',
          900: '#663515',
        },
      },
      animation: {
        'fade-in':        'fadeIn 0.5s ease-out both',
        'fade-in-up':     'fadeInUp 0.6s ease-out both',
        'fade-in-down':   'fadeInDown 0.5s ease-out both',
        'slide-in-left':  'slideInLeft 0.5s ease-out both',
        'scale-in':       'scaleIn 0.4s ease-out both',
        'float':          'float 5s ease-in-out infinite',
        'shimmer':        'shimmer 1.6s linear infinite',
        'bounce-soft':    'bounceSoft 0.6s ease-out both',
        'marquee':        'marquee 30s linear infinite',
        'pulse-slow':     'pulse 3s ease-in-out infinite',
        'spin-slow':      'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-28px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400% 0' },
          '100%': { backgroundPosition: '400% 0' },
        },
        bounceSoft: {
          '0%':   { transform: 'scale(1)' },
          '40%':  { transform: 'scale(1.08)' },
          '70%':  { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
