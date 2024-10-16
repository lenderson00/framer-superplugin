import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class', '[data-framer-theme="dark"]'],
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				default: ['var(--framer-font-family)']
			},
			boxShadow: {
				thumb: '0px 0px 0px 3px white inset, 0px 0px 0px 4px rgba(0,0,0,0.1) inset, 0px 0px 0px 1px rgba(0,0,0,0.1)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'var(--framer-color-bg)',
				foreground: 'var(--framer-color-text)',
				elevation: 'hsl(var(--elevation))',
				card: {
					DEFAULT: 'var(--framer-color-bg-secondary)',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'var(--framer-color-bg-tertiary)',
					foreground: 'var(--framer-color-text)'
				},
				primary: {
					DEFAULT: 'var(--framer-color-tint)',
					foreground: 'var(--framer-color-text)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'var(--framer-color-divider)',
				input: 'var(--framer-color-bg-tertiary)',
				ring: 'var(--framer-color-tint)',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require('tailwindcss-motion'),
		plugin(function ({ addComponents, theme }) {
			addComponents({
				".animated": {
					transition: "all 0.1s ease-in-out",
				}
			});
		}),
	],
}

