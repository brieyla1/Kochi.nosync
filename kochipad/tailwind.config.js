const defaultTheme = require('tailwindcss/defaultTheme')
const windmill = require('@windmill/react-ui/config')

module.exports = windmill({
  mode: 'jit',
  purge: ['src/**/*.js'],
  theme: {
    colors: {
      'k-orange': '#FF6708',
    },
    extend: {
      fontFamily: {
        sans: ['Jura', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        bottom: '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      },
    },
  },
})
