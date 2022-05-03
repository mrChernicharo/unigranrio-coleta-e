import { memo, useEffect, useState } from 'react';
import { CollectionPointWithAuthor } from '../lib/interfaces';

interface Props extends google.maps.MarkerOptions {
	point?: CollectionPointWithAuthor;
	onClick?: (point: CollectionPointWithAuthor) => void;
}

const Marker = ({ onClick, point, ...options }: Props) => {
	const [marker, setMarker] = useState<google.maps.Marker>();

	useEffect(() => {
		if (!marker) {
			console.log('set marker');

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
			google.maps.event.clearInstanceListeners(marker);

			if (onClick && point) {
				marker.addListener('click', e => onClick(point));
			}
		}
	}, [marker, point, onClick]);

	return null;
};

export default memo(Marker);
