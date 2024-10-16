import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'thumb': '0px 0px 0px 3px white inset, 0px 0px 0px 4px rgba(0,0,0,0.1) inset, 0px 0px 0px 1px rgba(0,0,0,0.1)',
      },
      backgroundImage: {
        'transparent-grid': "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='none' fill-rule='evenodd' opacity='.1'%3E%3Cpath fill='%23000' d='M0 0h4v4H0z'/%3E%3Cpath fill='%23FFF' d='M4 0h4v4H4z'/%3E%3Cpath fill='%23000' d='M4 4h4v4H4z'/%3E%3Cpath fill='%23FFF' d='M0 4h4v4H0z'/%3E%3C/g%3E%3C/svg%3E')"
      }
     
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const newUtilities = {
        '.bg-transparent-grid': {
          'background-image': theme('backgroundImage.transparent-grid'),
          'background-size': 'auto',
          'background-repeat': 'repeat',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    })
  ],
}

