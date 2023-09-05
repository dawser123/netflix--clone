/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			xsm: '600px',
			sm: '480px',
		},
		extend: {
			fontFamily: {
				sans: ['Open Sans'],
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
}
