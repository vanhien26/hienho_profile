/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: { DEFAULT: '#AE2070', light: '#F5E0EC' },
        ink: { DEFAULT: '#18120E', 2: '#4A3F38', 3: '#8C7D74' },
        surface: '#FFFFFF',
        bg: '#F6F3EF',
        border: '#E4DDD6',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
