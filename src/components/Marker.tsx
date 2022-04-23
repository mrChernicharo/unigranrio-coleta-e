import React from 'react'

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
	const [marker, setMarker] = React.useState<google.maps.Marker>();

	React.useEffect(() => {
		if (!marker) setMarker(new google.maps.Marker());

		return () => {
			if (marker) marker.setMap(null);
		};
	}, [marker]);

	React.useEffect(() => {
		if (marker) marker.setOptions(options);
		console.log(marker);
	}, [marker, options]);

	return null;
};

export default Marker