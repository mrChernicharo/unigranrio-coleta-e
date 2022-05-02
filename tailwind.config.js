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
		extend: {
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' },
				},
				fade_in: {
					'0%': { opacity: 0.4 },
					'100%': { opacity: 1 },
				},
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out infinite',
				fade_in: 'fade_in 0.2s ease-in',
			},
		},
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
