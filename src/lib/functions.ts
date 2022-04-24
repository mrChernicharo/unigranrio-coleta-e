import { CollectionPoint } from '@prisma/client';
import axios from 'axios';
import { City, UF } from './interfaces';

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

export const fetchUFs = async () => {
	const response = await axios.get<UF[]>(
		'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
	);
	const { data } = response;

	console.log(data);
	return data;
};

export const fetchCities = async (UF: string) => {
	const response = await axios.get<City[]>(
		`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios?orderBy=nome`
	);
	const { data } = response;

	console.log(data);
	return data;
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

export const parseLatLng = (e: google.maps.MapMouseEvent) => {
	let latLng = { lat: 0, lng: 0 };
	if (e.latLng) {
		const [lat, lng] = [e.latLng.lat(), e.latLng.lng()];
		latLng = { lat, lng };
	}

	return latLng;
};
