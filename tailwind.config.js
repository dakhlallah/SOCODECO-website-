/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101010',
        paper: '#FFFFFF',
        mist: '#F5F4F1',
        stone: '#E8E6E1',
        concrete: '#D8D5CF',
        navy: '#0B1B2B',
        navydeep: '#071320',
        gold: '#C9A961',
        golddeep: '#A98B45',
        /* dark-red text accents — rouge on dark surfaces, rougedeep on light */
        rouge: '#B22222',
        rougedeep: '#8B1A1A',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
    },
  },
  plugins: [],
};
