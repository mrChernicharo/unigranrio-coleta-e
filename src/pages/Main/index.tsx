import { CollectionPoint } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Profile from '../../components/Profile';
import { prisma } from '../../lib/prisma';

interface Props {
	collectionPoints: CollectionPoint[];
}

export default function App({ collectionPoints }: Props) {
	console.log(collectionPoints);
	return (
		<div className="">
			<Profile />
			<h1>Hello world</h1>

			<pre>{JSON.stringify(collectionPoints, null, 2)}</pre>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await prisma.collectionPoint.findMany();

	const collectionPoints = response.map(item => ({
		...item,
		createdAt: item.createdAt.toISOString(),
	}));

	return {
		props: { collectionPoints },
	};
};
