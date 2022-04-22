import { SessionProvider } from 'next-auth/react';
// import { Wrapper } from '@googlemaps/react-wrapper'
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	console.log({ session, pageProps });
	return (
		<SessionProvider session={session}>
			{/* <Wrapper apiKey={apiKey}> */}

			<Component {...pageProps} />
			{/* </Wrapper> */}
		</SessionProvider>
	);
}

export default MyApp;
