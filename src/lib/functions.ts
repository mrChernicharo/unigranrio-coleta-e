import { CollectionPoint, User } from '@prisma/client';
import { imgURLS, /* devBaseURL */ prodBaseURL } from './constants';
export const fetchAddressLatLng = async (address: string) => {
	const response = await fetch(
		`${prodBaseURL}/api/geolocation/getLatLngByAddress`,
		{
			method: 'POST',
			body: JSON.stringify({ address }),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	const data = await response.json();

	return data;
};

export const fetchAuthor = async (authorId: number) => {
	const response = await fetch(
		`${prodBaseURL}/api/user/findById?authorId=${authorId}`
	);

	const data = await response.json();
	return data;
};

export const postCreatePoint = async (data: Partial<CollectionPoint>) => {
	const { name, address, email, phone, image, lat, lng, authorId } = data;
	const point = {
		name,
		address,
		phone,
		lat,
		lng,
		image,
		email,
		authorId,
	};

	const response = await fetch(`${prodBaseURL}/api/point/create`, {
		method: 'POST',
		body: JSON.stringify(point),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const newPoint: CollectionPoint = await response.json();

	return newPoint;
};

export const postDeletePoint = async (pointId: string) => {
	const response = await fetch(`${prodBaseURL}/api/point/delete`, {
		method: 'POST',
		body: JSON.stringify({ pointId }),
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
		`${prodBaseURL}/api/user/findByEmail?email=${email}`
	);

	const foundUser = await userQueryResponse.json();

	if ('name' in foundUser || 'email' in foundUser) {
		console.log('email is already in use, user exists');
		return foundUser;
	}

	const newUser: User = {
		id: foundUser.id,
		name,
		email,
		emailVerified: new Date(),
		image: image ?? imgURLS.defaultAvatarImg,
	};

	const user = await apiPost(`${prodBaseURL}/api/user/create`, {
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
