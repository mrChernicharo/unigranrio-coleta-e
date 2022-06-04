import { useEffect, useState } from 'react';

const useWindowSize = () => {
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		function handleResize() {
			// Set window width/height to state
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		// Add event listener
		window.addEventListener('resize', handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return size;
};

export default useWindowSize;
