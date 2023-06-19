/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        bgc: '#1c1f2a',
        primary: '#f6f6f9',
        secondary: '#32394b',
        accent: '#7269e3',
        textPrimary: '#efefef',
        textSecondary: '#8f9bbd',
        highlightFirst: '#b3acfc',
        highlightSecond: '#f7bff0',
      },
    },
  },
  plugins: [],
}
