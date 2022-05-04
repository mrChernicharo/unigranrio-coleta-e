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
	typesOfWaste: TypesOfWasteStr;
}

export interface TypesOfWaste {
	small: boolean;
	large: boolean;
	info: boolean;
	battery: boolean;
}

export type TypesOfWasteStr =
	| '____'
	| 'S___'
	| '_L__'
	| '__I_'
	| '___B'
	| 'SL__'
	| 'S_I_'
	| 'S__B'
	| '_LI_'
	| '_L_B'
	| '__IB'
	| 'SLI_'
	| 'SL_B'
	| 'S_IB'
	| '_LIB'
	| 'SLIB';

export interface PointFormValues {
	name: string;
	lat: number;
	lng: number;
	address: string;
	phone: string;
	email: string;
	image: string;
	typesOfWaste: TypesOfWaste;
}
