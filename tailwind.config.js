module.exports = {
	mode: 'jit',
	content: ['src/pages/**/*.tsx', 'src/components/**/*.tsx'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
