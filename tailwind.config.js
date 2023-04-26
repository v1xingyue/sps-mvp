/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              TextDecoration: 'none',
              color: theme('colors.blue.500'),
              fontWeight: '600',
              '&:hover': {
                TextDecoration: 'underline',
              }
            }
          }
        }
      })
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography')
  ],
  daisyui: {
    themes: ["light"],
  }
}
