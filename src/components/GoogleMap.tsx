import { useEffect, useRef, useState } from 'react';
import { initialState } from '../lib/constants';

// onClick?: (e: google.maps.MapMouseEvent) => void;
// onIdle?: (map: google.maps.Map) => void;
const { position, zoom } = initialState;

export default function GoogleMap() {
	const [map, setMap] = useState<google.maps.Map>();
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (mapRef.current && !map) {
			setMap(
				new window.google.maps.Map(mapRef.current, {
					center: position,
					zoom,
				})
			);
		}
		console.log({ map, mapRef });
	}, [mapRef, map]);

	return <div ref={mapRef} style={{ width: '100%', height: '420px' }} />;
}
