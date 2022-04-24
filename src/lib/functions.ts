import { CollectionPoint } from '@prisma/client';

export const fetchAddressLatLng = async (address: string) => {
	const response = await fetch(
		'http://localhost:3000/api/geolocation/getLatLngByAddress',
		{
			method: 'POST',
			body: JSON.stringify({ address }),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	const data = await response.json();
	console.log(data);
	// return data;
};

export const postCreatePoint = async (point: Partial<CollectionPoint>) => {
	const response = await fetch('http://localhost:3000/api/point/create', {
		method: 'POST',
		body: JSON.stringify(point),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const newPoint: CollectionPoint = await response.json();

	return newPoint;
};

export const getClickLatLng = (e: google.maps.MapMouseEvent) => {
	let latLng = { lat: 0, lng: 0 };
	if (e.latLng) {
		const [lat, lng] = [e.latLng.lat(), e.latLng.lng()];
		latLng = { lat, lng };
	}

	return latLng;
};
