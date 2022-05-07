import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
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
import { prisma } from '../../lib/prisma';

interface Props {
	initialPoints: CollectionPointWithAuthor[];
	googleApiKey: string;
}
const googleIconURL =
	'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

const render = (status: Status): ReactElement => {
	if (status === Status.FAILURE) return <h1>Error</h1>;
	return <h1>{status}</h1>;
};

export default function App({ initialPoints, googleApiKey }: Props) {
	const router = useRouter();
	// const { width } = useWindowSize();
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/');
		},
	});
	const { user, setUser } = useUserContext();
	const { collectionPoints, setCollectionPoints } =
		useCollectionPointsContext();

	// const [collectionPoints, setCollectionPoints] = useState(initialPoints);
	// prettier-ignore
	const [selectedPoint, setSelectedPoint] = useState<CollectionPointWithAuthor | null>(null);
	const [isCreatePointModalOpen, setIsCreatePointModalOpen] = useState(false);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

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

	const handlePointCreated = point => {
		setCollectionPoints([...collectionPoints, point]);
	};

	const handlePointDeleted = point => {
		console.log('handlePointDeleted', point);
		setCollectionPoints(
			collectionPoints.filter(item => item.id !== point.id)
		);
	};

	const handlePointUpdated = point => {
		console.log('handlePointUpdated', point);
		setCollectionPoints([
			...collectionPoints.filter(item => item.id !== point.id),
			point,
		]);
	};

	useEffect(() => {
		if (status && session && session.user && !user) {
			handleUserInit({ userData: session.user }).then(u => setUser(u));
		}
	}, [status, session, user, setUser]);

	useEffect(() => {
		setCollectionPoints(initialPoints);
	}, [initialPoints, setCollectionPoints]);

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

	// include: => point + author
	// @ts-ignore
	let response: CollectionPointWithAuthor[] | null =
		await prisma.collectionPoint.findMany({
			include: {
				author: true,
			},
		});

	if (!response) response = [];

	const initialPoints = response.map(item => ({
		...item,
		createdAt: item.createdAt.toISOString(),
		author: {
			...item.author,
			emailVerified: item?.author?.emailVerified?.toISOString() || null,
		},
	}));

	return {
		props: { initialPoints, googleApiKey },
	};
};
