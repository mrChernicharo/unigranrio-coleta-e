import { Status, Wrapper } from '@googlemaps/react-wrapper';
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
import { CollectionPointWithAuthor } from '../../lib/interfaces';
import { prisma } from '../../lib/prisma';
import { useUserContext } from '../../lib/UserContext';

interface Props {
	initialPoints: CollectionPointWithAuthor[];
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
	// prettier-ignore
	const [selectedPoint, setSelectedPoint] = useState<CollectionPointWithAuthor | null>(null);
	const [isCreatePointModalOpen, setIsCreatePointModalOpen] = useState(false);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

	const handleCreatePointModalOpen = e => {
		console.log(e);
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
	const handleMarkerClick = (point: CollectionPointWithAuthor) => {
		setSelectedPoint(point);
		setIsDetailsModalOpen(true);
	};

	useEffect(() => {
		if (status && session && session.user && !user) {
			handleUserInit(session.user).then(u => setUser(u));
		}
	}, [status, session, user, setUser]);

	useEffect(() => {
		console.log(user);
	}, [user]);

	useEffect(() => {
		console.log(isCreatePointModalOpen);
	}, [isCreatePointModalOpen]);

	return (
		<Wrapper apiKey={googleApiKey} render={render}>
			<div className="h-screen">
				<Profile />

				{/* <pre>
				{JSON.stringify(
					collectionPoints.map(p => p),
					null,
					2
				)}
			</pre> */}

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

				<div className="bg-gray-100 py-5 text-right">
					<button
						className="rounded-full p-6 border border-gray-300 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={handleCreatePointModalOpen}
					>
						<FaPlus size={32} color={'white'} />
					</button>
				</div>

				{isCreatePointModalOpen && (
					<CreatePointModal
						handleModalClose={handleCreatePointModalClose}
						onPointCreated={point =>
							setCollectionPoints([...collectionPoints, point])
						}
					/>
				)}

				{isDetailsModalOpen && selectedPoint && (
					<DetailsModal
						handleModalClose={handleDetailsModalClose}
						point={selectedPoint}
					/>
				)}

				<Footer />
			</div>
		</Wrapper>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const googleApiKey = process.env.GOOGLE_API_KEY;

	// include: => point + author
	const response: CollectionPointWithAuthor[] =
		await prisma.collectionPoint.findMany({
			include: {
				author: true,
			},
		});

	const initialPoints = response.map(item => ({
		...item,
		createdAt: item.createdAt.toISOString(),
	}));

	console.log('getServerSideProps just ran!');

	return {
		props: { initialPoints, googleApiKey },
	};
};
