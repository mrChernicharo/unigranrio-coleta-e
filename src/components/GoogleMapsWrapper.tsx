import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface Props {
	children: ReactNode;
	googleApiKey: string;
}

const Render = (status: Status): ReactElement => {
	console.log(status);
	const router = useRouter();
	if (status === Status.FAILURE) {
		router.push('/Error');
	}
	return (
		<div className="h-screen flex justify-center items-center">
			<h1>{status}</h1>
			<LoadingSpinner />
		</div>
	);
};

export default function GoogleMapsWrapper({ googleApiKey, children }: Props) {
	const [apiKey, setApiKey] = useState('');

	useEffect(() => {
		setApiKey(googleApiKey);
	}, [googleApiKey]);

	if (!apiKey) return <h1>Loading Env...</h1>;

	return (
		<Wrapper apiKey={apiKey} render={Render}>
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
