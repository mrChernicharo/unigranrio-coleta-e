import { CollectionPoint } from '@prisma/client';
import { useEffect, useState } from 'react';

interface Props extends google.maps.MarkerOptions {
	point?: CollectionPoint;
	onClick?: (point: CollectionPoint) => void;
}

const Marker = ({ onClick, point, ...options }: Props) => {
	const [marker, setMarker] = useState<google.maps.Marker>();

	useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker());
		}

		return () => {
			if (marker) marker.setMap(null);
		};
	}, [marker, options]);

	useEffect(() => {
		if (marker) {
			marker.setOptions(options);
		}
	}, [marker, options]);

	useEffect(() => {
		if (marker) {
			console.log('heeey marker');

			google.maps.event.clearInstanceListeners(marker);

			if (onClick && point) {
				marker.addListener('click', e => onClick(point));
			}
		}
	}, [marker, point, onClick]);

	return null;
};

export default Marker;
