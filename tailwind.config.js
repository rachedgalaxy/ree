/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kufi: ['"Noto Kufi Arabic"', 'sans-serif'],
        naskh: ['"Noto Naskh Arabic"', 'serif'],
      },
      colors: {
        primary: '#1d1d1f', // Premium dark
        accent: '#2997ff', // Apple link blue
        background: '#f5f5f7', // Apple standard light bg
        surface: '#ffffff',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.3333%)' },
        },
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
      },
    },
  },
  plugins: [],
}
