import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { CollectionPoint } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CreatePointModal from '../../components/CreatePointModal';
import GoogleMap from '../../components/GoogleMap';
import Marker from '../../components/Marker';
import Profile from '../../components/Profile';
import { parseLatLng } from '../../lib/functions';
import { prisma } from '../../lib/prisma';

interface Props {
	initialPoints: CollectionPoint[];
	googleApiKey: string;
}

const render = (status: Status): ReactElement => {
	console.log(status);
	if (status === Status.FAILURE) return <h1>Error</h1>;
	return <h1>{status}</h1>;
};

export default function App({ initialPoints, googleApiKey }: Props) {
	const [collectionPoints, setCollectionPoints] = useState(initialPoints);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleMapIdle = map => {
		console.log('map Idle ', map);
	};
	const handleMapClick = (e: google.maps.MapMouseEvent) => {
		const { lat, lng } = parseLatLng(e);
		console.log('map Click ', { lat, lng });
	};
	const handleMapZoom = e => {
		console.log('map Zoom ', e);
	};

	// useEffect(() => console.log(collectionPoints), [])

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

			<GoogleMap
				height={500}
				onClick={handleMapClick}
				onZoom={handleMapZoom}
				onIdle={handleMapIdle}
				collectionPoints={collectionPoints}
			>
				{collectionPoints.map(({ id, name, lat, lng }) => (
					<Marker
						key={id}
						position={{ lat, lng }}
						title={name}
						clickable
					/>
				))}
			</GoogleMap>

			{isModalOpen && (
				<CreatePointModal
					handleModalClose={handleModalClose}
					onPointCreated={point =>
						setCollectionPoints([...collectionPoints, point])
					}
				/>
			)}
		</Wrapper>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const googleApiKey = process.env.GOOGLE_API_KEY;
	const response = await prisma.collectionPoint.findMany();

	const initialPoints = response.map(item => ({
		...item,
		createdAt: item.createdAt.toISOString(),
	}));

	console.log('getServerSideProps just ran!');

	return {
		props: { initialPoints, googleApiKey },
	};
};
