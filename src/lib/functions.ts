import axios from 'axios';

export const fetchAddressLatLng = async (address: string) => {
	const encodedAddress = encodeURIComponent(address);

	axios.get(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_API_KEY}`
	);
};
