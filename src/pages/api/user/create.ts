import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function create(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { newUser } = req.body;
	const { name, email, image } = newUser;
	console.log({ body: req.body, newUser, name, email, image });

	const createdUser = await prisma.user.upsert({
		where: { email },
		update: {
			email,
			name,
			image,
		},
		create: {
			email,
			name,
			image,
		},
	});

	res.status(200).json({ ...createdUser });
}
