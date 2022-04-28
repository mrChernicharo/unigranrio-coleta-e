import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { GetServerSideProps } from 'next';
import { ReactElement, ReactNode, useEffect, useState } from 'react';

interface Props {
	children: ReactNode;
	googleApiKey: string;
}

const render = (status: Status): ReactElement => {
	console.log(status);
	if (status === Status.FAILURE) return <h1>Error</h1>;
	return <h1>{status}</h1>;
};

export default function GoogleMapsWrapper({ googleApiKey, children }: Props) {
	const [apiKey, setApiKey] = useState('');

	useEffect(() => {
		setApiKey(googleApiKey);
	}, [googleApiKey]);

	if (!apiKey) return <h1>Loading Env...</h1>;

	return (
		<Wrapper apiKey={apiKey} render={render}>
			{children}
		</Wrapper>
	);
}
export const getServerSideProps: GetServerSideProps = async () => {
	// const p = new Promise((resolve, reject) => {
	// 	setTimeout(() => resolve(process.env.GOOGLE_API_KEY));
	// });
	const googleApiKey = 'AIzaSyCW1DUhbvjus2msDb4iHMHy0p8kw9S6PYs';

	return {
		props: {
			googleApiKey,
		},
	};
};
