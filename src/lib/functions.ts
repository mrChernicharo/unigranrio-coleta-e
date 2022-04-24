import { CollectionPoint, User } from '@prisma/client';
import { imgURLS } from './constants';

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

export const handleUserInit = async userData => {
	const { name, email, image } = userData;
	console.log({ userData });
	const userQueryResponse = await fetch(
		`http://localhost:3000/api/user/findByEmail?email=${email}`
	);

	const foundUser = await userQueryResponse.json();

	if ('name' in foundUser || 'email' in foundUser) {
		console.log('email is already in use');
		return;
	}

	console.log('heeey user not found, keep going', foundUser);

	const newUser: Omit<User, 'id'> = {
		name,
		email,
		image: image ?? imgURLS.defaultAvatarImg,
	};

	const user = await apiPost('http://localhost:3000/api/user/create', {
		...newUser,
	});

	return user;
};

export const apiPost = async (url: string, body: any) => {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();

	return data;
};
