import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_AUTH_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET!,
			client: {
				client_id: process.env.GOOGLE_AUTH_CLIENT_ID!,
				client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET!,
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
});
