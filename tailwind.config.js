const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  prefix: '',
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    
    extend: {
      screens:{
      },
      colors:{
        'gold-frequey':'#F0E68C'
      },
      height: {
        'tiny': '1px',
        'tiny2':'2px',
        'tiny3': '5px'
      }
     
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};