import { useEffect, useRef, useState } from 'react';
// center: {
// 	lat: 40.854885;
// 	lng: -88.081807;
// };
// zoom: 11;
// style: { [key: string]: string };
// onClick?: (e: google.maps.MapMouseEvent) => void;
// onIdle?: (map: google.maps.Map) => void;
// , zoom, center, style, onClick
export default function GoogleMap() {
	const [map, setMap] = useState<google.maps.Map>();
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (mapRef.current && !map) {
			setMap(
				new window.google.maps.Map(mapRef.current, {
					center: { lat: 40.854885, lng: -88.081807 },
					zoom: 8,
				})
			);
		}
		console.log({ map, mapRef });
	}, [mapRef, map]);

	return <div ref={mapRef} style={{ width: '100%', height: '420px' }} />;
}
