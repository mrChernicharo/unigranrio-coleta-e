import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function DeletePoint(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { pointId: id } = req.body;

	const createdPoint = await prisma.collectionPoint.delete({
		where: {
			id,
		},
	});

	return res.status(201).json(createdPoint);
}
