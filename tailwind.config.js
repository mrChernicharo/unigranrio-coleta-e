// const defaultTheme = ;
module.exports = {
	mode: 'jit',
	// content: ['src/pages/*.tsx', 'src/components/*.tsx', 'src/styles/*.ts'],
	content: [
		// './src/pages/**/*.{js,ts,jsx,tsx}',
		// './src/components/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}',
		// 'src/**/*.tsx',
		// 'src/pages/*.tsx',
		// 'src/pages/**/*.ts',
		// 'src/components/*.tsx',
		// 'src/styles/*.ts',
	],
	theme: {
		extend: {},
		screens: {
			xs: '460px',
			...require('tailwindcss/defaultTheme').screens,
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('tailwindcss/defaultTheme'),
	],
};
