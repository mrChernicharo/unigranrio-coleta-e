import { CollectionPoint, User } from '@prisma/client';
import { imgURLS } from './constants';
import { TypesOfWaste, TypesOfWasteStr } from './interfaces';

export const fetchAddressLatLng = async (address: string) => {
	return apiPost(`${getMainUrl()}/api/geolocation/getLatLngByAddress`, {
		address,
	});
};

export const fetchAuthor = async (authorId: number) => {
	const response = await fetch(
		`${getMainUrl()}/api/user/findById?authorId=${authorId}`
	);

	const data = await response.json();
	return data;
};

export const postCreatePoint = async (
	data: Omit<CollectionPoint, 'id' | 'createdAt'>
) => {
	const {
		name,
		address,
		email,
		phone,
		image,
		lat,
		lng,
		authorId,
		typesOfWaste,
	} = data;

	const point = {
		name,
		address,
		email,
		phone,
		image,
		lat,
		lng,
		authorId,
		typesOfWaste,
	};

	const response = await fetch(`${getMainUrl()}/api/point/create`, {
		method: 'POST',
		body: JSON.stringify(point),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const newPoint: CollectionPoint = await response.json();

	return newPoint;
};

export const postUpdatePoint = async (userData: CollectionPoint) => {
	const response = await fetch(`${getMainUrl()}/api/point/update`, {
		method: 'PUT',
		body: JSON.stringify(userData),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const newPoint: CollectionPoint = await response.json();

	return newPoint;
};

export const postDeletePoint = async (pointId: string) => {
	const response = await fetch(`${getMainUrl()}/api/point/delete`, {
		method: 'POST',
		body: JSON.stringify({ pointId }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const newPoint: CollectionPoint = await response.json();

	return newPoint;
};

export const handleUserInit = async ({ userData }) => {
	const url = getMainUrl();

	const { name, email, image } = userData;

	const userQueryResponse = await fetch(
		`${url}/api/user/findByNameAndEmail?email=${email}&name=${name}`
	);

	const foundUser = await userQueryResponse.json();

	if ('name' in foundUser || 'email' in foundUser) {
		console.log('email is already in use, user exists');
		console.log({ url, userData, name, email, image, foundUser });
		return foundUser;
	}

	const newUser: Partial<User> = {
		name: name ?? email.split('@')[0],
		email,
		emailVerified: new Date(),
		image: image ?? imgURLS.defaultAvatarImg,
	};

	const user = await apiPost(`${url}/api/user/create`, {
		newUser,
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

export const getMainUrl = () => {
	return location.href.replace('/Main', '');
};

export const parseTypesOfWaste = (wasteTypes: (0 | 1)[]) => {
	const slibStr = 'SLIB';
	return wasteTypes
		.map((item, i) => (item === 1 ? slibStr[i] : '_'))
		.join('');
};

export const convertTypesOfWaste = (
	wasteTypesStr: TypesOfWasteStr
): TypesOfWaste => {
	const types = {
		small: wasteTypesStr[0] !== '_',
		large: wasteTypesStr[1] !== '_',
		info: wasteTypesStr[2] !== '_',
		battery: wasteTypesStr[3] !== '_',
	};

	return types as TypesOfWaste;
};

export const getClickLatLng = (e: google.maps.MapMouseEvent) => {
	let latLng = { lat: 0, lng: 0 };
	if (e.latLng) {
		const [lat, lng] = [e.latLng.lat(), e.latLng.lng()];
		latLng = { lat, lng };
	}

	return latLng;
};
