/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: '1.5rem',
              marginTop: theme('spacing.20'),
              marginBottom: theme('spacing.10'),
              [`@media (min-width: ${theme('screens.lg')})`]: {
                fontSize: '1.75rem',
              },
            },
            h2: {
              fontSize: '1.3rem',
              marginTop: theme('spacing.10'),
              marginBottom: theme('spacing.5'),
              [`@media (min-width: ${theme('screens.lg')})`]: {
                fontSize: '1.5rem',
              },
            },
            h3: {
              fontSize: '1.2rem',
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.5'),
              [`@media (min-width: ${theme('screens.lg')})`]: {
                fontSize: '1.35rem',
              },
            },
            'h4, h5, h6': {
              fontSize: '1.125rem',
              [`@media (min-width: ${theme('screens.lg')})`]: {
                fontSize: '1.125rem',
              },
            },
            code: {
              '&::before': {
                content: '"" !important',
              },
              '&::after': {
                content: '"" !important',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
