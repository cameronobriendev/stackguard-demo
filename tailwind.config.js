/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base
        'sg-bg': '#0f172a',
        'sg-card': '#1e293b',
        'sg-border': '#334155',
        // Status
        'sg-healthy': '#10b981',
        'sg-warning': '#f59e0b',
        'sg-critical': '#ef4444',
        // Accents
        'sg-primary': '#3b82f6',
        'sg-muted': '#94a3b8',
      },
    },
  },
  plugins: [],
}
