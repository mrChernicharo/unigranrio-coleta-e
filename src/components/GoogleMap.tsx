import { GoogleApiWrapper } from 'google-maps-react';
// interface GoogleApiWrapperProps {
// 	apiKey: string;
// }

export function GoogleMap(props) {
	console.log(props);
	return (
		<div>
			<h1>Mapa</h1>
		</div>
	);
}

export default GoogleApiWrapper({
	apiKey: '',
})(GoogleMap);
