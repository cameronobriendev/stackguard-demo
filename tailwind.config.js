/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors (CSS variables)
        'sg-bg': 'var(--sg-bg)',
        'sg-card': 'var(--sg-card)',
        'sg-border': 'var(--sg-border)',
        'sg-text': 'var(--sg-text)',
        'sg-muted': 'var(--sg-muted)',

        // Status colors (consistent across themes)
        'sg-healthy': '#10b981',
        'sg-warning': '#f59e0b',
        'sg-critical': '#ef4444',

        // Accent
        'sg-primary': '#3b82f6',
      },
    },
  },
  plugins: [],
}
