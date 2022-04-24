import { NextApiRequest, NextApiResponse } from 'next';

export default async function Proxy(req: NextApiRequest, res: NextApiResponse) {
	const url = decodeURIComponent(req.query.url as string);
	const result = await fetch(url);
	const body = await result.body!;
	body.pipe(res);
}
