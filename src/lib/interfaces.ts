export interface UF {
	id: number;
	nome: string;
	sigla: string;
	regiao: {
		id: number;
		nome: string;
		sigla: string;
	};
}

export interface City {
	id: string;
	microrregiao: {};
	nome: string;
	'regiao-imediata': {};
}

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
