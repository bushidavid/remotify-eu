import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
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
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			'profile-fade': "bg-gradient-to-tr from-amber-50 via-gray-100 to-teal-100",
  		},
		maskImage: {
			'fade-bottom': 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
		},
  		borderWidth: {
  			'0': '0',
  			'1': '1px',
  			'2': '2px',
  			'3': '3px',
  			'4': '4px',
  			'6': '6px',
  			'8': '8px'
  		},
  		colors: {
  			'remotify-lb': '#39D1CC',
  			'remotify-db': '#142C42',
  			complementary: '#422A14',
  			'remotify-lum': '#d8f0ef',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		gridTemplateRows: {
  			'12': 'repeat(12, minmax(0, 1fr))',
  			layout: 'repeat(5, minmax(100px,1fr)) 600px 100px 100px 100px 600px 100px 100px'
  		},
  		maxWidth: {
  			'2/6': '33.333333%'
  		},
  		fontFamily: {
  			poppins: ['Poppins']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		typography: {
  			alignSuper: {
  				verticalAlign: 'super',
  				fontSize: '0.75em'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    nextui(),
    require('@tailwindcss/typography'),
    require("tailwindcss-animate"),
  ],
}
