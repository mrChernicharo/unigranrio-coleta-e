// const defaultTheme = ;
module.exports = {
	// mode: 'jit',
	content: ['src/pages/*.tsx', 'src/components/*.tsx', 'src/styles/*.ts'],
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
