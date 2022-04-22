import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { CollectionPoint } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CreatePointModal from '../../components/CreatePointModal';
import GoogleMap from '../../components/GoogleMap';
import Profile from '../../components/Profile';
import { prisma } from '../../lib/prisma';

interface Props {
	collectionPoints: CollectionPoint[];
	googleApiKey: string;
}

const render = (status: Status): ReactElement => {
	console.log(status);
	if (status === Status.FAILURE) return <h1>Error</h1>;
	return <h1>{status}</h1>;
};

export default function App({ collectionPoints, googleApiKey }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

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

			<GoogleMap />

			{isModalOpen && (
				<CreatePointModal handleModalClose={handleModalClose} />
			)}
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
