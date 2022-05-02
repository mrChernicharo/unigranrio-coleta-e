import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '../../../lib/prisma';

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
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
