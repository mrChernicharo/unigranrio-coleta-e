import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function FindByEmail(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const email = req.query.email as string;

	const foundUser = await prisma.user.findFirst({
		where: {
			email: {
				equals: email,
			},
		},
	});

	res.status(200).json({ ...foundUser });
}
