import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CreatePointModal from '../../components/CreatePointModal';
import DetailsModal from '../../components/DetailsModal';
import Footer from '../../components/Footer';
import GoogleMap from '../../components/GoogleMap';
import Marker from '../../components/Marker';
import Profile from '../../components/Profile';
import { useCollectionPointsContext } from '../../contexts/PointsContext';
import { useUserContext } from '../../contexts/UserContext';
import { getClickLatLng, handleUserInit } from '../../lib/functions';
import { CollectionPointWithAuthor } from '../../lib/interfaces';

interface Props {
	googleApiKey: string;
}
const googleIconURL = 'flag.png';

const render = (status: Status): ReactElement => {
	if (status === Status.FAILURE) return <h1>Error</h1>;
	return <h1>{status}</h1>;
};

export default function App({ googleApiKey }: Props) {
	const router = useRouter();
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/');
		},
	});
	const { user, setUser } = useUserContext();
	const { collectionPoints, setCollectionPoints } =
		useCollectionPointsContext();

	// prettier-ignore
	const [selectedPoint, setSelectedPoint] = useState<CollectionPointWithAuthor | null>(null);
	const [isCreatePointModalOpen, setIsCreatePointModalOpen] = useState(false);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

	const fetchInitialPoints = useCallback(async () => {
		const response = await fetch('/api/fetchPoints');
		const data = await response.json();

		setCollectionPoints(data);
	}, [setCollectionPoints]);

	const handleCreatePointModalOpen = e => {
		setIsCreatePointModalOpen(true);
	};
	const handleCreatePointModalClose = () => {
		setIsCreatePointModalOpen(false);
	};
	const handleDetailsModalClose = () => {
		setIsDetailsModalOpen(false);
	};
	const handleMapIdle = map => {
		// console.log('map Idle ', map);
	};
	const handleMapZoom = e => {
		// console.log('map Zoom ', e);
	};
	const handleMapClick = (e: google.maps.MapMouseEvent) => {
		const { lat, lng } = getClickLatLng(e);
		console.log('map Click ', { lat, lng });
	};
	const handleMarkerClick = (point: CollectionPointWithAuthor) => {
		setSelectedPoint(point);
		setIsDetailsModalOpen(true);
	};

	const handlePointCreated = point => {
		setCollectionPoints([...collectionPoints, point]);
	};

	const handlePointDeleted = point => {
		setCollectionPoints(
			collectionPoints.filter(item => item.id !== point.id)
		);
	};

	const handlePointUpdated = point => {
		setCollectionPoints([
			...collectionPoints.filter(item => item.id !== point.id),
			point,
		]);
	};

	useEffect(() => {
		console.log({ status, session, user, setUser });
		if (status && session && session.user && !user) {
			console.log('handleUserInit', { status, session, user });
			handleUserInit({ userData: session.user }).then(u => setUser(u));
		}
	}, [status, session, user, setUser]);

	useEffect(() => {
		fetchInitialPoints();
	}, [fetchInitialPoints]);

	return (
		<Wrapper apiKey={googleApiKey} render={render}>
			<div className="pt-[74px] flex flex-col justify-center bg-white">
				<Profile />

				<div className="ml-6">
					<h1 className="mt-4 mb-2 text-4xl font-bold">Coleta App</h1>
					<h2 className="mb-4 text-md">
						Encontre pontos de coleta de lixo eletrônico pelo mundo
					</h2>
				</div>

				{/* <pre>
					{JSON.stringify(
						// collectionPoints.map(p => [p.name, p.address]),
						collectionPoints.map(p => p.name),
						null,
						2
					)}
				</pre> */}

				<GoogleMap
					// height={width < 580 ? 300 : 500}
					// height={width < 580 ? 300 : 500}
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
								icon={googleIconURL}
								title={name}
								clickable
							/>
						);
					})}
				</GoogleMap>

				<div className="bg-white px-6 pt-10 pb-16 flex justify-end">
					<button
						className="w-full sm:w-auto flex items-center justify-center rounded-lg p-4 border border-gray-300 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={handleCreatePointModalOpen}
					>
						<FaPlus color={'white'} />
						<span className=" text-white ml-6">
							Novo Ponto de Coleta
						</span>
					</button>
				</div>

				{isCreatePointModalOpen && (
					<CreatePointModal
						handleModalClose={handleCreatePointModalClose}
						onPointCreated={handlePointCreated}
					/>
				)}

				{isDetailsModalOpen && selectedPoint && (
					<DetailsModal
						handleModalClose={handleDetailsModalClose}
						point={selectedPoint}
						onPointDeleted={handlePointDeleted}
						onPointUpdated={handlePointUpdated}
					/>
				)}

				<Footer />
			</div>
		</Wrapper>
	);
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	const session = await getSession(ctx);

	console.log({ session });

	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
			props: {},
		};
	}

	const googleApiKey = process.env.GOOGLE_API_KEY;

	return {
		props: { googleApiKey },
	};
};
