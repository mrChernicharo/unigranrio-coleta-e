import { NextApiRequest, NextApiResponse } from 'next';

export default async function getLatLngByAddress(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { address } = req.body;
		const encodedAddress = encodeURIComponent(address);
		const result = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`,
			{
				method: 'POST',
				body: JSON.stringify({}),
				headers: {},
			}
		);

		const data = await result.json();

		// console.log({ data });

		res.status(201).json(data);
	} catch (err) {}
}
