import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function create(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const user = req.body;

	const createdUser = await prisma.user.create({ data: user });

	res.status(200).json({ ...createdUser });
}
