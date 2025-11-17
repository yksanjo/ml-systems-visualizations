/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'data-flow': {
          light: '#3B82F6',
          dark: '#1E40AF',
        },
        'training': {
          light: '#10B981',
          dark: '#F59E0B',
        },
        'inference': {
          light: '#8B5CF6',
          dark: '#06B6D4',
        },
        'edge': {
          light: '#FBBF24',
          dark: '#F97316',
        },
      },
    },
  },
  plugins: [],
}

