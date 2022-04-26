import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function findById(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const authorId = Number(req.query.authorId);
	console.log(authorId);

	const author = await prisma.user.findFirst({
		where: {
			id: {
				equals: authorId,
			},
		},
	});

	res.status(200).json({ ...author });
}
