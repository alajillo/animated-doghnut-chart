/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
	safelist: [
		'fill-red-500',
		'fill-green-500',
		'fill-blue-500',
		'fill-yellow-500',
		'fill-violet-500'
	]
}

