import { useEffect, useRef, useState } from 'react';
import { initialState } from '../lib/constants';

const { position, zoom } = initialState;

interface Props {
	height?: number;
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
	onZoom?: (zoom: number) => void;
}

export default function GoogleMap({
	height = 300,
	onClick,
	onIdle,
	onZoom,
}: Props) {
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

	useEffect(() => {
		if (map) {
			['click', 'zoom_changed', 'idle'].forEach(eventName =>
				google.maps.event.clearListeners(map, eventName)
			);

			if (onClick) {
				map.addListener('click', onClick);
			}

			if (onZoom) {
				map.addListener('zoom_changed', () => {
					onZoom(map.getZoom()!);
				});
			}
			if (onIdle) {
				map.addListener('idle', () => onIdle(map));
			}
		}
	}, [map, onClick, onIdle, onZoom]);

	return <div ref={mapRef} style={{ width: '100%', height }} />;
}
