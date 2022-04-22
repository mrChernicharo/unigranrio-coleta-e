import { useState, ReactElement, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { CollectionPoint } from '@prisma/client';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { FaPlus } from 'react-icons/fa';

import { prisma } from '../../lib/prisma';
import CreatePointModal from '../../components/CreatePointModal';
import GoogleMap from '../../components/GoogleMap';
import Profile from '../../components/Profile';

interface Props {
	collectionPoints: CollectionPoint[];
	googleApiKey: string;
	center: any,
	zoom: any
}

const render = (status: Status): ReactElement => {
	if (status === Status.FAILURE) return <h1>Error</h1>;
	return <h1>Loading...</h1>;
};

export default function App({ collectionPoints, googleApiKey }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [map, setMap] = useState<google.maps.Map>();

	const mapRef = useRef<HTMLDivElement>(null);


	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		if (mapRef.current && !map) {
			setMap(new window.google.maps.Map(mapRef.current, {}));
		}
	}, [mapRef, map]);

	return (
		<Wrapper apiKey={googleApiKey} render={render}>

			<Profile />

			<pre>
				{JSON.stringify(
					collectionPoints.map(p => p.name),
					null,
					2
				)}
			</pre>

			<button onClick={handleModalOpen}>
				<FaPlus size={40} />
			</button>

			{isModalOpen && (
				<CreatePointModal handleModalClose={handleModalClose} />
			)}

			<GoogleMap />

			<div ref={mapRef} className="w-full h-[400px]" />

		</Wrapper>

	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const googleApiKey = process.env.GOOGLE_API_KEY;
	const response = await prisma.collectionPoint.findMany();

	const collectionPoints = response.map(item => ({
		...item,
		createdAt: item.createdAt.toISOString(),
	}));

	console.log('getServerSideProps just ran!');

	return {
		props: { collectionPoints, googleApiKey },
	};
};
