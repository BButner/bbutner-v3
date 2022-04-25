const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-title': '#2b2632',
        'dark-content': '#221d29'
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('supports-backdrop', '@supports (backdrop-filter: none)')
      addVariant('!supports-backdrop', '@supports not (backdrop-filter: none)')
    })
  ],
}
