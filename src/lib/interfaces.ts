import { CollectionPoint, User } from '@prisma/client';

export interface AddressComponent {
	long_name: string;
	short_name: string;
	types: string[];
}

export interface Location {
	lat: number;
	lng: number;
}

export interface Geocode {
	address_components: AddressComponent[];
	formatted_address: string;
	geometry: {
		location: Location;
		location_type: string;
		viewport: {
			northeast: Location;
			southwest: Location;
		};
		bounds?: {
			northeast: Location;
			southwest: Location;
		};
	};
	place_id: string;
	plus_code?: {
		compound_code: string;
		global_code: string;
	};
	types: string[];
}

export interface CollectionPointWithAuthor extends CollectionPoint {
	author: User;
}

export interface PointFormValues {
	name: string;
	lat: number;
	lng: number;
	address: string;
	phone: string;
	email: string;
	image: string;
	typesOfWaste: {
		small: boolean;
		large: boolean;
		info: boolean;
		battery: boolean;
	};
}
