module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    fontFamily: {
      notoSans: ['Noto Sans JP'],
      merriweather: ['Merriweather'],
    },
    minWidth: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
    extend: {
      spacing: {
        17: '4.25rem',
        18: '4.5rem',
        68: '17rem',
        76: '19rem',
        160: '40rem',
        116: '29rem',
        104: '26rem',
        128: '32rem',
        192: '48rem',
        196: '49rem',
        200: '50rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      borderWidth: ['hover', 'focus'],
      fontWeight: ['hover', 'focus'],
      gradientColorStops: ['hover', 'focus'],
    },
  },
  plugins: [],
}
