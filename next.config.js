/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'avatars.githubusercontent.com',
			'lh3.googleusercontent.com',
			'img.itinari.com',
			'*',
		],
	},
};

module.exports = nextConfig;
