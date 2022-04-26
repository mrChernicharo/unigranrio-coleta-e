import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../lib/UserContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	console.log({ session, pageProps });
	return (
		<SessionProvider session={session}>
			<UserContextProvider>
				<Component {...pageProps} />
			</UserContextProvider>
		</SessionProvider>
	);
}

export default MyApp;
