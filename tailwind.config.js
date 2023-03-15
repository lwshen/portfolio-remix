/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '1.5rem',
              marginBottom: '1.25rem',
            },
            h2: {
              fontSize: '1.25rem',
              marginTop: '1rem',
            },
            h3: {
              fontSize: '1.125rem',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
