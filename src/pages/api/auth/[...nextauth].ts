/*
  This file must be named [nextauth].ts not [nextAuth].ts
  git is changing the case settings leading you to errors 
  BEWARE!
*/

import NextAuth from 'next-auth';
// import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
	// @ts-ignore
	site: process.env.NEXTAUTH_URL,
	providers: [
		// EmailProvider({
		// 	server: process.env.EMAIL_SERVER,
		// 	from: process.env.EMAIL_FROM,
		// }),
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
	// debug: true,
});
