import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderWidth: {
        '0': '0',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      colors : {
        'remotify-lb' : '#39D1CC',
        'remotify-db' : '#142C42',
        // 'remotify-luminance' : '#d3f5f4'
        'remotify-lum' : '#d8f0ef'
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '12': 'repeat(12, minmax(0, 1fr))',
        'layout': 'repeat(3, minmax(150px,1fr)) 400px repeat(2, minmax(0,1fr)) 400px 150px 150px'
      }
    },
  },
  plugins: [
    nextui(),
    require('@tailwindcss/typography'),
  ],
}
