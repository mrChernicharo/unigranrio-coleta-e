module.exports = {
	mode: 'jit',
	content: ['src/pages/**/*.tsx', 'src/components/**/*.tsx'],
	theme: {
		extend: {},
		screens: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
