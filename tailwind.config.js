/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eefbf3',
          100: '#d7f5e2',
          500: '#2f9e62',
          600: '#247d4d',
          700: '#1b5f3a'
        },
        accent: {
          100: '#fff4d6',
          500: '#f59f00',
          600: '#d48806'
        },
        ink: {
          500: '#1f2937',
          600: '#111827'
        }
      }
    },
  },
  plugins: [],
}
