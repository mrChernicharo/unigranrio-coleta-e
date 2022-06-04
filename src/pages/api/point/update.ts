import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function updatePoint(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id, ...pointData } = req.body;
	const updatedPoint = await prisma.collectionPoint.update({
		data: { ...pointData },
		where: {
			id,
		},
	});

	res.status(201).json(updatedPoint);
}
