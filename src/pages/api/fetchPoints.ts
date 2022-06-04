import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function fetchPoints(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let response = await prisma.collectionPoint.findMany({
		include: {
			author: true,
		},
	});
	res.status(200).json(response);
}
