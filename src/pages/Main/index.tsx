import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { CollectionPoint } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { ReactElement, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CreatePointModal from '../../components/CreatePointModal';
import DetailsModal from '../../components/DetailsModal';
import Footer from '../../components/Footer';
import GoogleMap from '../../components/GoogleMap';
import Marker from '../../components/Marker';
import Profile from '../../components/Profile';
import { getClickLatLng, handleUserInit } from '../../lib/functions';
import { prisma } from '../../lib/prisma';
import { useUserContext } from '../../lib/UserContext';

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
	const { data: session, status } = useSession();
	const { user, setUser } = useUserContext();
	const [collectionPoints, setCollectionPoints] = useState(initialPoints);
	const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(
		null
	);
	const [isCreatePointModalOpen, setIsCreatePointModalOpen] = useState(false);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

	const handleCreatePointModalOpen = () => {
		setIsCreatePointModalOpen(true);
	};
	const handleCreatePointModalClose = () => {
		setIsCreatePointModalOpen(false);
	};
	const handleDetailsModalClose = () => {
		setIsDetailsModalOpen(false);
	};
	const handleMapIdle = map => {
		console.log('map Idle ', map);
	};
	const handleMapZoom = e => {
		console.log('map Zoom ', e);
	};
	const handleMapClick = (e: google.maps.MapMouseEvent) => {
		const { lat, lng } = getClickLatLng(e);
		console.log('map Click ', { lat, lng });
	};
	const handleMarkerClick = (point: CollectionPoint) => {
		setSelectedPoint(point);
		setIsDetailsModalOpen(true);
	};

	useEffect(() => {
		if (status && session && session.user && !user) {
			handleUserInit(session.user).then(u => setUser(u));
		}
	}, [status, session, user, setUser]);

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

			<GoogleMap
				height={500}
				onClick={handleMapClick}
				onZoom={handleMapZoom}
				onIdle={handleMapIdle}
			>
				{collectionPoints.map(point => {
					const { id, name, lat, lng } = point;
					return (
						<Marker
							point={point}
							onClick={handleMarkerClick}
							key={id}
							position={{ lat, lng }}
							title={name}
							clickable
						/>
					);
				})}
			</GoogleMap>

			<div className="pt-6 px-2 text-right">
				<button
					className="rounded-full p-6 border border-gray-300 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					onClick={handleCreatePointModalOpen}
				>
					<FaPlus size={32} color={'white'} />
				</button>
			</div>

			{isCreatePointModalOpen && user && (
				<CreatePointModal
					userId={Number(user.id)}
					handleModalClose={handleCreatePointModalClose}
					onPointCreated={point =>
						setCollectionPoints([...collectionPoints, point])
					}
				/>
			)}

			{isDetailsModalOpen && user && selectedPoint && (
				<DetailsModal
					userId={Number(user.id)}
					handleModalClose={handleDetailsModalClose}
					point={selectedPoint}
				/>
			)}

			<Footer />
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
