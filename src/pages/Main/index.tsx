import { CollectionPoint } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CreatePointModal from '../../components/CreatePointModal';
import GoogleMap from '../../components/GoogleMap';
import Profile from '../../components/Profile';
import { prisma } from '../../lib/prisma';

interface Props {
	collectionPoints: CollectionPoint[];
	googleApiKey: string;
}

export default function App({ collectionPoints, googleApiKey }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	console.log(collectionPoints, googleApiKey);

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="">
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
		</div>
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
