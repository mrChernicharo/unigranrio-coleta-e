import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { PointsContextProvider } from '../contexts/PointsContext';
import { UserContextProvider } from '../contexts/UserContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	// console.log({ session, pageProps });
	return (
		<SessionProvider session={session}>
			<UserContextProvider>
				<PointsContextProvider>
					<Head>
						<link rel="shortcut icon" href="flag.png" />
					</Head>
					<Component {...pageProps} />
				</PointsContextProvider>
			</UserContextProvider>
		</SessionProvider>
	);
}

export default MyApp;
