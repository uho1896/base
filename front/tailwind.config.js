const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  corePlugins: {
    preflight: false,
  },
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      width: {
        'fixed': '1300px',
      },
      maxWidth: {
        '1920': '1920px',
        '2xs': '16rem',
        '3xs': '12rem',
        '4xs': '8rem',
        '5xs': '6rem',
        '6xs': '3rem',
        '7xs': '1rem',
      },
      minWidth: {
        '1300': '1300px',
        '1920': '1920px',
      },
      maxHeight: {
        '64': '16rem',
      },
      margin: {
        'micro': '0.05rem',
      },
      padding: {
        '7': '1.75rem',
        '28': '7rem',
        '80': '20rem',
      },
      colors: {
        orange: {
          ...colors.orange,
          '101': '#ff5523',
          '102': '#fa831b',
          '103': '#ff9016',
        },
        gray: {
          ...colors.gray,
          '101': '#f8f9fa',
        },
      },
      fontSize: {
        '2xs': '0.5rem',
        '3xs': '0.25rem',
        '201': '2.5rem',
        '160': '2rem',
        '101': '1.35rem',
      },
      lineHeight: {
        '12': '3rem',
        '16': '5rem',
      },
    },
  }
}
