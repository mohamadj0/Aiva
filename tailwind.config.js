/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4500', // Royal Orange
          50: '#FFF0E5',
          100: '#FFD6C2',
          200: '#FFAD85',
          300: '#FF8547',
          400: '#FF5C0A',
          500: '#FF4500',
          600: '#CC3700',
          700: '#992900',
          800: '#661C00',
          900: '#330E00',
        },
        secondary: {
          DEFAULT: '#000080', // Navy Blue
          50: '#E6E6F2',
          100: '#C0C0E0',
          200: '#9999CC',
          300: '#7373B8',
          400: '#4D4DA3',
          500: '#26268F',
          600: '#000080',
          700: '#000066',
          800: '#00004D',
          900: '#000033',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
