const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        coiny: ['Coiny', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'brand-purple': '#053640',
        'brand-pink': '#00ffa2',
        'brand-yellow': '#00ffa2',
        'brand-blue': 'var(--clr-blue)',
        'brand-green': 'var(--clr-green)',
        'brand-light': 'var(--clr-light)',
        'brand-background': 'var(--clr-background)',
        'brand-bg': '#021e2b'
      },
      backgroundImage: {
        'main-card': "url('/public/images/logobg.jpg)"
      },
      animation: {
        'pulse-slow': 'pulse 10s linear infinite'
      }
    }
  },
  plugins: []
}
