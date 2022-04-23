import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function CreatePoint(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log();

	const response = await prisma.collectionPoint.create({ data: req.body });

	return res.status(201).json({});
}
