module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
