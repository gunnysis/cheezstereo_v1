/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#ef4444',
          primaryLight: '#fef2f2',
          primaryDark: '#b91c1c',
        },
        surface: {
          DEFAULT: '#ffffff',
          elevated: '#f9fafb',
          muted: '#f3f4f6',
        },
      },
      spacing: {
        'touch': '44px',
        '4.5': '18px',
      },
      borderRadius: {
        '2.5xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
